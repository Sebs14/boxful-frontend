'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  IoEyeOutline,
  IoDownloadOutline,
  IoSearchOutline,
} from 'react-icons/io5';
import Button from '../ui/Button';
import Input from '../ui/Input';
import DateRangePicker from '../ui/DateRangePicker';
import Checkbox from '../ui/Checkbox';
import { useEnviosStore } from '../../stores';

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'Entregado':
      return 'bg-green-100 text-green-800';
    case 'En tránsito':
      return 'bg-blue-100 text-blue-800';
    case 'Pendiente':
      return 'bg-yellow-100 text-yellow-800';
    case 'Sin recoger':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function HistorialContent() {
  // Zustand store
  const {
    enviosFiltrados,
    selectedItems,
    selectAll,
    filtros,
    filtrosTemp,
    loading,
    // Actions
    toggleSelectAll,
    toggleSelectItem,
    setFiltroTemp,
    aplicarFiltros,
    limpiarFiltros,
    downloadSelected,
    updateEnviosFiltrados,
  } = useEnviosStore();

  // Initialize filtered data on mount
  useEffect(() => {
    updateEnviosFiltrados();
  }, [updateEnviosFiltrados]);

  const handleDateRangeChange = (dates: [string, string] | null) => {
    setFiltroTemp('fechas', dates);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-7xl mx-auto p-6'
    >
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 font-mona-sans mb-2'>
          Mis envíos
        </h1>
        <p className='text-gray-600 font-mona-sans'>
          Consulta el historial completo de tus envíos y su estado actual
        </p>
      </div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className='bg-white rounded-xl border border-gray-200 p-6 mb-6'
      >
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 items-end'>
          {/* Search */}
          <div className='relative'>
            <Input
              placeholder='Buscar por número de orden, nombre o apellidos'
              value={filtrosTemp.busqueda}
              onChange={(e) =>
                setFiltroTemp('busqueda', e.target.value)
              }
              className='pl-10'
            />
            <IoSearchOutline className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
          </div>

          {/* Date Range Picker */}
          <DateRangePicker
            value={filtrosTemp.fechas}
            onChange={handleDateRangeChange}
            placeholder={['Desde mes/año', 'Hasta mes/año']}
          />

          {/* Search Button */}
          <Button
            onClick={aplicarFiltros}
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3'
          >
            Buscar
          </Button>

          <Button
            variant='outline'
            className={`flex items-center gap-2 px-4 py-2 transition-all ${
              selectedItems.length > 0
                ? 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100'
                : 'bg-gray-50 border-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={selectedItems.length === 0}
            onClick={downloadSelected}
          >
            <IoDownloadOutline className='w-4 h-4' />
            Descargar órdenes
            {selectedItems.length > 0 && (
              <span className='ml-1 bg-green-600 text-white text-xs px-2 py-1 rounded-full'>
                {selectedItems.length}
              </span>
            )}
          </Button>
        </div>

        <div className='flex justify-between items-center mt-4'>
          <div className='flex items-center gap-4'>
            <span className='text-sm text-gray-600 font-mona-sans'>
              {enviosFiltrados.length} envío(s) encontrado(s)
            </span>
            {selectedItems.length > 0 && (
              <span className='text-sm text-blue-600 font-mona-sans bg-blue-50 px-3 py-1 rounded-full'>
                {selectedItems.length} seleccionado(s)
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Applied Filters Section */}
      {(filtros.fechas || filtros.busqueda) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className='bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6'
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4 text-sm font-mona-sans'>
              {filtros.fechas && (
                <span className='text-blue-800'>
                  <span className='font-medium'>Período:</span>{' '}
                  {new Date(filtros.fechas[0]).toLocaleDateString('es-ES', {
                    month: 'short',
                    year: 'numeric',
                  })}{' '}
                  -{' '}
                  {new Date(filtros.fechas[1]).toLocaleDateString('es-ES', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              )}
              {filtros.busqueda && (
                <span className='text-blue-800'>
                  <span className='font-medium'>Búsqueda:</span> "
                  {filtros.busqueda}"
                </span>
              )}
            </div>

            <Button
              onClick={limpiarFiltros}
              variant='outline'
              size='sm'
              className='text-blue-600 border-blue-300 hover:bg-blue-100'
            >
              Limpiar filtros
            </Button>
          </div>
        </motion.div>
      )}

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='bg-white rounded-xl border border-gray-200 overflow-hidden'
      >
        {/* Table Header */}
        <div className='bg-gray-50 px-6 py-4 border-b border-gray-200'>
          <div className='grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700 font-mona-sans items-center'>
            <div className='col-span-1 flex items-center justify-center'>
              <Checkbox
                checked={selectAll}
                onChange={toggleSelectAll}
                size='md'
              />
            </div>
            <div className='col-span-2'>No. de orden</div>
            <div className='col-span-2'>Nombre</div>
            <div className='col-span-2'>Apellidos</div>
            <div className='col-span-2'>Departamento</div>
            <div className='col-span-2'>Municipio</div>
            <div className='col-span-1'>Paquetes en orden</div>
          </div>
        </div>

        {/* Table Body */}
        <div className='divide-y divide-gray-200'>
          {enviosFiltrados.length === 0 ? (
            <div className='px-6 py-12 text-center'>
              <p className='text-gray-500 font-mona-sans'>
                No se encontraron envíos que coincidan con los filtros
              </p>
            </div>
          ) : (
            enviosFiltrados.map((envio, index) => (
              <motion.div
                key={envio.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className='px-6 py-4 hover:bg-gray-50 transition-colors'
              >
                <div className='grid grid-cols-12 gap-4 items-center'>
                  <div className='col-span-1 flex items-center justify-center'>
                    <Checkbox
                      checked={selectedItems.includes(envio.id)}
                      onChange={() => toggleSelectItem(envio.id)}
                      size='md'
                    />
                  </div>

                  <div className='col-span-2'>
                    <span className='text-sm font-medium text-gray-900 font-mona-sans'>
                      {envio.numeroOrden}
                    </span>
                  </div>

                  <div className='col-span-2'>
                    <span className='text-sm text-gray-900 font-mona-sans'>
                      {envio.nombre}
                    </span>
                  </div>

                  <div className='col-span-2'>
                    <span className='text-sm text-gray-900 font-mona-sans'>
                      {envio.apellidos}
                    </span>
                  </div>

                  <div className='col-span-2'>
                    <span className='text-sm text-gray-900 font-mona-sans'>
                      {envio.departamento}
                    </span>
                  </div>

                  <div className='col-span-2'>
                    <span className='text-sm text-gray-900 font-mona-sans'>
                      {envio.municipio}
                    </span>
                  </div>

                  <div className='col-span-1 text-center'>
                    <span className='inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-[#73BD28] bg-[#EFFDF4] rounded font-mona-sans'>
                      {envio.paquetes}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        {enviosFiltrados.length > 0 && (
          <div className='bg-gray-50 px-6 py-4 border-t border-gray-200'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-700 font-mona-sans'>
                Mostrando 1 a {enviosFiltrados.length} de{' '}
                {enviosFiltrados.length} resultados
              </span>

              <div className='flex space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  disabled
                  className='px-3 py-1'
                >
                  Anterior
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  disabled
                  className='px-3 py-1'
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
