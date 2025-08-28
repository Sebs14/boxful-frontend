'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferencesState {
  // UI Preferences
  isSidebarCollapsed: boolean;
  activeTab: string;
  
  // Actions
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setActiveTab: (tab: string) => void;
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      isSidebarCollapsed: false,
      activeTab: 'crear-orden',
      
      // Acciones
      setSidebarCollapsed: (collapsed) => 
        set({ isSidebarCollapsed: collapsed }),
      
      toggleSidebar: () => 
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      
      setActiveTab: (tab) => 
        set({ activeTab: tab }),
    }),
    {
      name: 'user-preferences-storage',
      partialize: (state) => ({
        isSidebarCollapsed: state.isSidebarCollapsed,
        activeTab: state.activeTab,
      }),
    }
  )
);
