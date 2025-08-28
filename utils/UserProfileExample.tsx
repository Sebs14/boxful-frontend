'use client';

import { useAuth } from '../utils/auth-context';

export default function UserProfile() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className='text-center p-8'>
        <p className='text-gray-600'>No has iniciado sesión</p>
      </div>
    );
  }

  return (
    <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-6'>
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>
        Perfil de Usuario
      </h2>

      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Nombre
          </label>
          <p className='mt-1 text-gray-900'>
            {user.name} {user.lastname}
          </p>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <p className='mt-1 text-gray-900'>{user.email}</p>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Género
          </label>
          <p className='mt-1 text-gray-900'>{user.gender}</p>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Fecha de Nacimiento
          </label>
          <p className='mt-1 text-gray-900'>
            {new Date(user.dateOfBirth).toLocaleDateString('es-ES')}
          </p>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Teléfono
          </label>
          <p className='mt-1 text-gray-900'>{user.phone}</p>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            ID de Usuario
          </label>
          <p className='mt-1 text-gray-900 text-sm font-mono'>{user._id}</p>
        </div>
      </div>

      <div className='mt-6'>
        <button
          onClick={logout}
          className='w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors'
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
