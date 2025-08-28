'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import CreateOrderContent from '../components/Dashboard/CreateOrderContent';
import HistorialContent from '../components/Dashboard/HistorialContent';
import { useUserPreferencesStore } from '../stores';

const DashboardPage = () => {
  const router = useRouter();
  
  // Usar el store de preferencias del usuario
  const { activeTab } = useUserPreferencesStore();

  const handleLogout = () => {
    // Aquí puedes agregar la lógica de logout que necesites
    // Por ejemplo: limpiar localStorage, cookies, etc.
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    
    // Redirigir a la página de login
    router.push('/');
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'crear-orden':
        return 'Crear orden';
      case 'historial':
        return 'Mis envíos';
      default:
        return 'Dashboard';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'crear-orden':
        return <CreateOrderContent />;
      case 'historial':
        return <HistorialContent />;
      default:
        return <CreateOrderContent />;
    }
  };

  return (
    <DashboardLayout
      title={getTitle()}
      onLogout={handleLogout}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default DashboardPage;
