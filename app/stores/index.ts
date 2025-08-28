import { useEffect } from 'react';
import { useAuthStore } from './authStore';

export const useAuthInitialization = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    // Inicializar la autenticación cuando se monta la aplicación
    initializeAuth();
  }, [initializeAuth]);
};

export { useUserPreferencesStore } from './userPreferencesStore';
export { useEnviosStore } from './enviosStore';
export { useAuthStore } from './authStore';
export type { Envio } from './enviosStore';
