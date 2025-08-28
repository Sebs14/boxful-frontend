'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '../../utils/types';
import { authAPI } from '../../utils/auth';

interface AuthState {
  // Estado de autenticación
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isRehydrating: boolean; // Nuevo estado para saber si se está rehidratando

  // Acciones
  setUser: (user: UserProfile | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<UserProfile>) => void;
  initializeAuth: () => Promise<void>;
  setRehydrating: (rehydrating: boolean) => void; // Nueva acción
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      isRehydrating: true, // Inicia en true para esperar la rehidratación

      // Acciones
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setToken: (token) =>
        set({
          token,
          isAuthenticated: !!token,
        }),

      setLoading: (loading) => set({ isLoading: loading }),

      setRehydrating: (isRehydrating) => set({ isRehydrating }),

      login: async (email: string, password: string) => {
        set({ isLoading: true, isRehydrating: false });
        try {
          const response = await authAPI.login({ email, password });
          const token = response.access_token;

          // Get user profile after successful login
          const user = await authAPI.getProfile(token);

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            isRehydrating: false,
          });
        } catch (error) {
          set({ isLoading: false, isRehydrating: false });
          throw error;
        }
      },

      register: async (userData: any) => {
        set({ isLoading: true });
        try {
          await authAPI.register(userData);
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          isRehydrating: false,
        }),

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      initializeAuth: async () => {
        const state = get();

        // Si ya hay un usuario cargado, no hacer nada
        if (state.user && state.token) {
          set({ isRehydrating: false });
          return;
        }

        // Si hay un token guardado, intentar obtener el perfil
        if (state.token) {
          try {
            set({ isLoading: true });
            const user = await authAPI.getProfile(state.token);

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              isRehydrating: false,
            });
          } catch (error) {
            // Token expirado o inválido, limpiar estado
            console.log('Token expirado, limpiando autenticación');
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              isRehydrating: false,
            });
          }
        } else {
          set({ isRehydrating: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isRehydrating: state.isRehydrating,
      }),
      onRehydrateStorage: () => (state) => {
        // Esta función se ejecuta después de que se restaura el estado desde localStorage
        if (state) {
          state.isRehydrating = false; // Marcar que terminó la rehidratación
          
          if (state.token && !state.user) {
            // Si hay token pero no hay usuario, intentar obtener el perfil
            authAPI.getProfile(state.token).then((user) => {
              state.user = user;
              state.isAuthenticated = true;
            }).catch(() => {
              // Token inválido, limpiar estado
              state.user = null;
              state.token = null;
              state.isAuthenticated = false;
            });
          }
        }
      },
    }
  )
);
