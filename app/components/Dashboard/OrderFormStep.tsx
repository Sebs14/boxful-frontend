'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import DatePicker from '../ui/DatePicker';
import PhoneInput from '../ui/PhoneInput';

interface OrderFormData {
  pickupAddress: string;
  scheduledDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  deliveryAddress: string;
  department: string;
  municipality: string;
  referencePoint: string;
  instructions: string;
}

interface OrderFormStepProps {
  onNext: (data: OrderFormData) => void;
}

export default function OrderFormStep({ onNext }: OrderFormStepProps) {
  const [countryCode, setCountryCode] = useState('+503');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<OrderFormData>({
    defaultValues: {
      countryCode: '+503',
    },
  });

  const onSubmit = async (data: OrderFormData) => {
    try {
      console.log('Order data:', data);
      // Simular procesamiento
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onNext(data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const departmentOptions = [
    { value: 'san-salvador', label: 'San Salvador' },
    { value: 'la-libertad', label: 'La Libertad' },
    { value: 'santa-ana', label: 'Santa Ana' },
    { value: 'san-miguel', label: 'San Miguel' },
    { value: 'usulutan', label: 'Usulután' },
  ];

  const municipalityOptions = [
    { value: 'san-salvador', label: 'San Salvador' },
    { value: 'santa-tecla', label: 'Santa Tecla' },
    { value: 'mejicanos', label: 'Mejicanos' },
    { value: 'soyapango', label: 'Soyapango' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-4xl mx-auto p-6'
    >
      {/* Header */}
      <div className='mb-8'>
        <h2 className='text-3xl font-bold text-gray-900 font-mona-sans mb-2'>
          Crea una orden
        </h2>
        <p className='text-gray-600 font-mona-sans'>
          Dale una ventaja competitiva a tu negocio con entregas{' '}
          <span className='font-semibold'>el mismo día</span> (Área
          Metropolitana) y{' '}
          <span className='font-semibold'>el día siguiente</span> a nivel
          nacional.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        {/* Datos principales */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className='bg-white rounded-xl border border-gray-200 p-6'
        >
          <h3 className='text-xl font-semibold text-gray-900 font-mona-sans mb-6'>
            Completa los datos
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Dirección de recolección */}
            <div className='md:col-span-2'>
              <Input
                label='Dirección de recolección'
                type='text'
                placeholder='Colonia Las Magnolias, calle militar 1, San Salvador'
                error={errors.pickupAddress?.message}
                {...register('pickupAddress', {
                  required: 'La dirección de recolección es requerida',
                })}
              />
            </div>

            {/* Fecha programada */}
            <DatePicker
              label='Fecha programada'
              placeholder='03/07/2025'
              error={errors.scheduledDate?.message}
              {...register('scheduledDate', {
                required: 'La fecha programada es requerida',
              })}
            />

            {/* Nombres */}
            <Input
              label='Nombres'
              type='text'
              placeholder='Gabriela Reneé'
              error={errors.firstName?.message}
              {...register('firstName', {
                required: 'El nombre es requerido',
              })}
            />

            {/* Apellidos */}
            <Input
              label='Apellidos'
              type='text'
              placeholder='Díaz López'
              error={errors.lastName?.message}
              {...register('lastName', {
                required: 'El apellido es requerido',
              })}
            />

            {/* Correo electrónico */}
            <Input
              label='Correo electrónico'
              type='email'
              placeholder='gabbydiaz@gmail.com'
              error={errors.email?.message}
              {...register('email', {
                required: 'El correo electrónico es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Ingresa un correo electrónico válido',
                },
              })}
            />

            {/* Teléfono */}
            <PhoneInput
              label='Teléfono'
              placeholder='7777 7777'
              countryCode={countryCode}
              onCountryCodeChange={(code) => {
                setCountryCode(code);
                setValue('countryCode', code);
              }}
              error={errors.phone?.message}
              {...register('phone', {
                required: 'El número de teléfono es requerido',
                pattern: {
                  value: /^[0-9]{7,15}$/,
                  message: 'Ingresa un número de teléfono válido',
                },
              })}
            />

            {/* Dirección del destinatario */}
            <div className='md:col-span-2'>
              <Input
                label='Dirección del destinatario'
                type='text'
                placeholder='Final 49 Av. Sur y Boulevard Los Próceres, Smartcenter, Bodega #8, San Salvador'
                error={errors.deliveryAddress?.message}
                {...register('deliveryAddress', {
                  required: 'La dirección del destinatario es requerida',
                })}
              />
            </div>

            {/* Departamento */}
            <Select
              label='Departamento'
              placeholder='San Salvador'
              options={departmentOptions}
              error={errors.department?.message}
              {...register('department', {
                required: 'El departamento es requerido',
              })}
            />

            {/* Municipio */}
            <Select
              label='Municipio'
              placeholder='San Salvador'
              options={municipalityOptions}
              error={errors.municipality?.message}
              {...register('municipality', {
                required: 'El municipio es requerido',
              })}
            />

            {/* Punto de referencia */}
            <Input
              label='Punto de referencia'
              type='text'
              placeholder='Cerca de redondel Árbol de la Paz'
              error={errors.referencePoint?.message}
              {...register('referencePoint')}
            />

            {/* Indicaciones */}
            <div className='md:col-span-3'>
              <label className='block text-sm font-semibold text-gray-900 font-mona-sans mb-2'>
                Indicaciones
              </label>
              <textarea
                placeholder='Llamar antes de entregar'
                rows={3}
                className='w-full p-3 border-2 border-gray-200 rounded-lg font-mona-sans resize-none focus:outline-none focus:border-blue-500 transition-colors'
                {...register('instructions')}
              />
            </div>
          </div>
        </motion.div>

        {/* Botón de envío */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='flex justify-end'
        >
          <Button
            type='submit'
            isLoading={isSubmitting}
            className='px-8 py-3 bg-blue-600 hover:bg-blue-700'
          >
            Siguiente →
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
