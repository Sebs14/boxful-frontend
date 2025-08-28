'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import CreateOrderContent from '../components/Dashboard/CreateOrderContent';
import HistorialContent from '../components/Dashboard/HistorialContent';
import ProtectedRoute from '../components/ProtectedRoute';
import { useUserPreferencesStore } from '../stores';
import { useAuthStore } from '../stores/authStore';

const DashboardPage = () => {
  const router = useRouter();

  // Usar el store de preferencias del usuario
  const { activeTab } = useUserPreferencesStore();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
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
    <ProtectedRoute>
      <DashboardLayout title={getTitle()} onLogout={handleLogout}>
        {renderContent()}
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DashboardPage;
