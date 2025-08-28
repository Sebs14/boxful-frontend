'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useUserPreferencesStore } from '../../stores';
import { useClientOnly } from '../../hooks/useClientOnly';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  onLogout?: () => void;
}

export default function DashboardLayout({
  children,
  title,
  onLogout,
}: DashboardLayoutProps) {
  const hasMounted = useClientOnly();
  
  // Usar el store de preferencias del usuario
  const {
    isSidebarCollapsed,
    activeTab,
    toggleSidebar,
    setActiveTab,
  } = useUserPreferencesStore();

  // Mostrar un fallback hasta que se monte en el cliente
  if (!hasMounted) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-gray-500'>Cargando...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <div className='fixed top-0 left-0 z-30'>
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={onLogout}
        />
      </div>

      {/* Main content area */}
      <div
        className='flex flex-col transition-all duration-300 ease-in-out'
        style={{
          marginLeft: isSidebarCollapsed ? '80px' : '280px',
        }}
      >
        {/* Header */}
        <div
          className='fixed top-0 right-0 z-20 bg-white'
          style={{
            left: isSidebarCollapsed ? '80px' : '280px',
            transition: 'left 0.3s ease-in-out',
          }}
        >
          <Header title={title} onToggleSidebar={toggleSidebar} />
        </div>

        {/* Content */}
        <main className='pt-20 min-h-screen overflow-auto'>
          <div className='p-6'>{children}</div>
        </main>
      </div>
    </div>
  );
}
