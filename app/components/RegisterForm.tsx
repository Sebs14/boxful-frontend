'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import Input from './ui/Input';
import Button from './ui/Button';
import Select from './ui/Select';
import DatePicker from './ui/DatePicker';
import PhoneInput from './ui/PhoneInput';
import { ChevronLeftIcon } from './ui/Icons';
import { useAuth } from '../../utils/auth-context';
import type { RegisterFormData } from '../../utils/types';
import { GENDER_OPTIONS } from '../../utils/types';

interface RegisterFormProps {
  onShowLogin: () => void;
}

export default function RegisterForm({ onShowLogin }: RegisterFormProps) {
  const [countryCode, setCountryCode] = useState('+503');
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string>('');
  const { register: registerUser, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    defaultValues: {
      countryCode: '+503',
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError('');
      console.log('Register data:', data);

      // Preparar los datos para la API
      const registerData = {
        email: data.email,
        name: data.name,
        lastname: data.lastname,
        gender: data.gender,
        dateOfBirth: data.birthDate,
        phone: `${data.countryCode}${data.phoneNumber}`,
        password: data.password,
      };

      await registerUser(registerData);

      console.log('Registro exitoso');

      // Mostrar el modal después de enviar el formulario
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error en registro:', error);
      setError(
        error instanceof Error ? error.message : 'Error al registrar usuario'
      );
    }
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
    // Aquí puedes agregar lógica para continuar al siguiente paso
    console.log('Aceptar confirmación de teléfono');
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  // Obtener los datos del formulario para mostrar en el modal
  const phoneNumber = watch('phoneNumber');
  const fullPhoneNumber = `${countryCode} ${phoneNumber || '7777 7777'}`;

  const handleGoBack = () => {
    onShowLogin();
  };

  if (!mounted) {
    return (
      <div className='flex flex-col justify-center items-start w-full p-8 h-screen gap-11'>
        <div className='flex flex-col items-center gap-3 justify-center sm:items-start'>
          <div className='flex items-center gap-3 w-full'>
            <div className='w-6 h-6 bg-gray-200 rounded animate-pulse' />
            <div className='h-8 bg-gray-200 rounded w-48 animate-pulse' />
          </div>
          <div className='h-4 bg-gray-200 rounded w-64 animate-pulse' />
        </div>
        <div className='flex flex-col w-full gap-6 pb-11'>
          {/* Placeholder skeleton */}
          <div className='flex gap-6 w-full'>
            <div className='w-full h-16 bg-gray-200 rounded animate-pulse' />
            <div className='w-full h-16 bg-gray-200 rounded animate-pulse' />
          </div>
          <div className='flex gap-6 w-full'>
            <div className='w-full h-16 bg-gray-200 rounded animate-pulse' />
            <div className='w-full h-16 bg-gray-200 rounded animate-pulse' />
          </div>
          <div className='flex gap-6 w-full'>
            <div className='w-full h-16 bg-gray-200 rounded animate-pulse' />
            <div className='w-full h-16 bg-gray-200 rounded animate-pulse' />
          </div>
          <div className='flex gap-6 w-full'>
            <div className='w-full h-16 bg-gray-200 rounded animate-pulse' />
            <div className='w-full h-16 bg-gray-200 rounded animate-pulse' />
          </div>
          <div className='w-full h-12 bg-gray-200 rounded animate-pulse' />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-start w-full p-8 h-screen gap-11'>
      <div className='flex flex-col items-center gap-3 justify-center sm:items-start'>
        <div className='flex items-center gap-3 w-full'>
          <ChevronLeftIcon
            size={24}
            className='text-[#4E4C4C] cursor-pointer hover:text-[#2E49CE] transition-colors'
            onClick={handleGoBack}
          />
          <h1 className='text-2xl font-bold font-mona-sans text-[#16163D]'>
            Cuéntanos de ti
          </h1>
        </div>
        <p className='text-[#4E4C4C] font-mona-sans'>
          Completa la información de registro
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col w-full gap-6'
      >
        {/* Campo oculto para el código de país */}
        <input type='hidden' {...register('countryCode')} value={countryCode} />
        <div className='flex gap-6 w-full'>
          <Input
            label='Nombre'
            type='text'
            placeholder='Digita tu nombre'
            error={errors.name?.message}
            {...register('name', {
              required: 'El nombre es requerido',
            })}
          />
          <Input
            label='Apellido'
            type='text'
            placeholder='Digita tu apellido'
            error={errors.lastname?.message}
            {...register('lastname', {
              required: 'El apellido es requerido',
            })}
          />
        </div>
        <div className='flex gap-6 w-full'>
          <Select
            label='Sexo'
            placeholder='Seleccionar'
            error={errors.gender?.message}
            options={GENDER_OPTIONS.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            {...register('gender', {
              required: 'El sexo es requerido',
            })}
          />
          <DatePicker
            label='Fecha de nacimiento'
            placeholder='DD/MM/AAAA'
            error={errors.birthDate?.message}
            {...register('birthDate', {
              required: 'La fecha de nacimiento es requerida',
              validate: (value) => {
                const today = new Date();
                const birthDate = new Date(value);
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();

                if (
                  monthDiff < 0 ||
                  (monthDiff === 0 && today.getDate() < birthDate.getDate())
                ) {
                  age--;
                }

                if (age < 18) {
                  return 'Debes ser mayor de 18 años';
                }
                if (age > 120) {
                  return 'Ingresa una fecha válida';
                }
                return true;
              },
            })}
          />
        </div>

        <div className='flex gap-6 w-full'>
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
          <PhoneInput
            label='Número de WhatsApp'
            placeholder='Digita tu número'
            countryCode={countryCode}
            onCountryCodeChange={(code) => {
              setCountryCode(code);
              setValue('countryCode', code);
            }}
            error={errors.phoneNumber?.message}
            {...register('phoneNumber', {
              required: 'El número de WhatsApp es requerido',
              pattern: {
                value: /^[0-9]{7,15}$/,
                message: 'Ingresa un número de teléfono válido (7-15 dígitos)',
              },
            })}
          />
        </div>

        <div className='flex gap-6 w-full'>
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
          <Input
            label='Repetir contraseña'
            type='password'
            placeholder='Confirma tu contraseña'
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Confirma tu contraseña',
              validate: (value, formValues) =>
                value === formValues.password || 'Las contraseñas no coinciden',
            })}
          />
        </div>

        <Button type='submit' isLoading={isSubmitting || isLoading} className='w-full'>
          Siguiente
        </Button>

        {error && (
          <div className='w-full p-3 bg-red-50 border border-red-200 rounded-md'>
            <p className='text-red-600 text-sm font-mona-sans'>{error}</p>
          </div>
        )}
      </form>

      {/* Modal de Ant Design */}
      <Modal
        title={null}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText='Aceptar'
        cancelText='Cancelar'
        centered
        width={400}
        closable={false}
        okButtonProps={{
          style: {
            backgroundColor: '#4F46E5',
            borderColor: '#4F46E5',
            borderRadius: '8px',
            height: '40px',
            fontWeight: '500',
          },
        }}
        cancelButtonProps={{
          style: {
            borderRadius: '8px',
            height: '40px',
            fontWeight: '500',
            color: '#6B7280',
            borderColor: '#D1D5DB',
          },
        }}
      >
        <div className='flex flex-col items-center text-center py-6'>
          {/* Ícono de advertencia */}
          <div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6'>
            <div className='w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center'>
              <span className='text-white font-bold text-lg'>!</span>
            </div>
          </div>

          {/* Título */}
          <h2 className='text-xl text-gray-900 mb-4 font-mona-sans'>
            Confirmar número <span className='font-bold'>de teléfono</span>
          </h2>

          {/* Mensaje */}
          <p className='text-gray-600 text-base mb-6 font-mona-sans'>
            Está seguro de que desea continuar con el número{' '}
            <span className='font-semibold text-gray-900'>
              {fullPhoneNumber}?
            </span>
          </p>
        </div>
      </Modal>
    </div>
  );
}
