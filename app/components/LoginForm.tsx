'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import { useAuth } from '../../utils/auth-context';
import type { LoginFormData } from '../../utils/types';

interface LoginFormProps {
  onShowRegister: () => void;
}

export default function LoginForm({ onShowRegister }: LoginFormProps) {
  const [error, setError] = useState<string>('');
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      console.log('Login data:', data);

      await login(data.email, data.password);

      console.log('Login exitoso');

      // Aquí puedes redirigir al usuario
      // router.push('/dashboard');

    } catch (error) {
      console.error('Error en login:', error);
      setError(error instanceof Error ? error.message : 'Error al iniciar sesión');
    }
  };

  return (
    <div className='flex flex-col justify-center items-start w-full p-8 h-screen gap-11'>
      <div className='flex flex-col items-center gap-3 justify-center sm:items-start'>
        <h1 className='text-2xl font-bold font-mona-sans text-[#16163D]'>
          Bienvenido
        </h1>
        <p className='text-[#4E4C4C] font-mona-sans'>
          Por favor ingresa tus credenciales
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col w-full gap-6 pb-11'
      >
        <Input
          label='Correo electrónico'
          type='email'
          placeholder='Digita tu correo'
          error={errors.email?.message}
          {...register('email', {
            required: 'El correo electrónico es requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Ingresa un correo electrónico válido',
            },
          })}
        />

        <Input
          label='Contraseña'
          type='password'
          placeholder='Digita tu contraseña'
          error={errors.password?.message}
          {...register('password', {
            required: 'La contraseña es requerida',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          })}
        />

        {error && (
          <div className='w-full p-3 bg-red-50 border border-red-200 rounded-md'>
            <p className='text-red-600 text-sm font-mona-sans'>{error}</p>
          </div>
        )}

        <Button type='submit' isLoading={isSubmitting || isLoading} className='w-full'>
          Iniciar sesión
        </Button>
      </form>

      <div className='flex items-center justify-center w-full'>
        <p className='font-mona-sans'>
          ¿Necesitas una cuenta?{' '}
          <button
            type='button'
            onClick={onShowRegister}
            className='font-mona-sans font-semibold text-[#4E4C4C] hover:text-[#2E49CE] transition-colors cursor-pointer'
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}
