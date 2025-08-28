'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  redirectTo = '/',
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, isRehydrating } = useAuthStore();

  useEffect(() => {
    // Solo redirigir si no está rehidratando, no está cargando y no está autenticado
    if (!isRehydrating && !isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, isRehydrating, router, redirectTo]);

  // Mostrar loading mientras se rehidrata o verifica la autenticación
  if (isRehydrating || isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#F8F9FA]'>
        <div className='flex flex-col items-center gap-4'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E49CE]'></div>
          <p className='text-[#4E4C4C] font-mona-sans'>
            {isRehydrating ? 'Restaurando sesión...' : 'Verificando autenticación...'}
          </p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (se redirigirá)
  if (!isAuthenticated) {
    return null;
  }

  // Si está autenticado, mostrar el contenido
  return <>{children}</>;
}
