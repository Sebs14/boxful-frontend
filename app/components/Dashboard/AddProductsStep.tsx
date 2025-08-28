'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { IoAdd, IoTrash, IoChevronBack } from 'react-icons/io5';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface Product {
  id: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  content: string;
}

interface AddProductsStepProps {
  onNext: (products: Product[]) => void;
  onBack: () => void;
}

export default function AddProductsStep({
  onNext,
  onBack,
}: AddProductsStepProps) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      length: '',
      width: '',
      height: '',
      weight: '',
      content: '',
    },
  ]);

  const [addedProducts, setAddedProducts] = useState<Product[]>([]);

  const addProduct = () => {
    // Obtener los valores del formulario actual
    const currentProduct = products[0]; // Solo trabajamos con una card

    // Validar que todos los campos estén llenos
    if (
      !currentProduct.length ||
      !currentProduct.width ||
      !currentProduct.height ||
      !currentProduct.weight ||
      !currentProduct.content
    ) {
      alert('Por favor completa todos los campos antes de agregar el producto');
      return;
    }

    // Agregar el producto a la lista de productos agregados
    const newProductForList = {
      id: Date.now().toString(),
      length: currentProduct.length,
      width: currentProduct.width,
      height: currentProduct.height,
      weight: currentProduct.weight,
      content: currentProduct.content,
    };

    // Agregar a la lista de productos agregados (para mostrar en la card amarilla)
    setAddedProducts([...addedProducts, newProductForList]);

    // Limpiar el formulario
    setProducts([
      {
        id: '1',
        length: '',
        width: '',
        height: '',
        weight: '',
        content: '',
      },
    ]);
  };

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const updateProduct = (id: string, field: keyof Product, value: string) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const handleNext = () => {
    onNext(addedProducts);
  };

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

      {/* Products Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className='bg-white rounded-xl border border-gray-200 p-6'
      >
        <div className='mb-6'>
          <h3 className='text-xl font-semibold text-gray-900 font-mona-sans mb-4'>
            Agrega tus productos
          </h3>
        </div>

        {/* Products List */}
        <div className='space-y-4'>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.1 }}
              className='grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-50 rounded-lg'
            >
              {/* Labels Row */}
              <div className='col-span-12 grid grid-cols-12 gap-4 -mb-2'>
                <div className='col-span-1'></div>
                <div className='col-span-3'>
                  <div className='flex text-xs font-semibold text-gray-600 font-mona-sans'>
                    <div className='flex-1 text-start'>Largo</div>
                    <div className='flex-1 text-start'>Alto</div>
                    <div className='flex-1 text-start'>Ancho</div>
                  </div>
                </div>
                <div className='col-span-2 text-xs font-semibold text-gray-600 font-mona-sans text-start'>
                  Peso en libras
                </div>
                <div className='col-span-4 text-xs font-semibold text-gray-600 font-mona-sans text-start'>
                  Contenido
                </div>
                <div className='col-span-2'></div>
              </div>

              {/* Package Icon */}
              <div className='col-span-1 flex items-center justify-center'>
                <div className='w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center'>
                  <img src='/Icono.svg' alt='Package' className='w-6 h-6' />
                </div>
              </div>

              {/* Dimensions - Completely united inputs */}
              <div className='col-span-3'>
                <div className='flex border border-[#EDEDED] shadow-sm rounded-lg overflow-hidden bg-white'>
                  <div className='flex-1 relative'>
                    <input
                      type='text'
                      placeholder='15'
                      value={product.length}
                      onChange={(e) =>
                        updateProduct(product.id, 'length', e.target.value)
                      }
                      className='w-full p-3 border-0 text-center font-mona-sans focus:outline-none focus:ring-0'
                    />
                    <span className='absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-mona-sans'>
                      cm
                    </span>
                  </div>

                  <div className='flex-1 relative border-l border-r border-[#EDEDED]'>
                    <input
                      type='text'
                      placeholder='15'
                      value={product.width}
                      onChange={(e) =>
                        updateProduct(product.id, 'width', e.target.value)
                      }
                      className='w-full p-3 border-0 text-center font-mona-sans focus:outline-none focus:ring-0'
                    />
                    <span className='absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-mona-sans'>
                      cm
                    </span>
                  </div>

                  <div className='flex-1 relative'>
                    <input
                      type='text'
                      placeholder='15'
                      value={product.height}
                      onChange={(e) =>
                        updateProduct(product.id, 'height', e.target.value)
                      }
                      className='w-full p-3 border-0 text-center font-mona-sans focus:outline-none focus:ring-0'
                    />
                    <span className='absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-mona-sans'>
                      cm
                    </span>
                  </div>
                </div>
              </div>

              {/* Weight with "libras" */}
              <div className='col-span-2'>
                <div className='relative'>
                  <Input
                    placeholder='3'
                    value={product.weight}
                    onChange={(e) =>
                      updateProduct(product.id, 'weight', e.target.value)
                    }
                    className='text-center pr-16'
                  />
                  <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 font-mona-sans'>
                    libras
                  </span>
                </div>
              </div>

              {/* Content - Wider input */}
              <div className='col-span-6'>
                <Input
                  placeholder='iPhone 14 pro Max'
                  value={product.content}
                  onChange={(e) =>
                    updateProduct(product.id, 'content', e.target.value)
                  }
                />
              </div>

              {/* Empty space for alignment */}
              <div className='col-span-2'></div>

              {/* Add Button Row */}
              <div className='col-span-12 flex justify-end mt-4'>
                <motion.button
                  onClick={addProduct}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex items-center gap-2 px-4 py-2 text-[#4E4C4C] bg-white hover:bg-blue-50 rounded-lg transition-colors font-mona-sans text-sm border border-[#EDEDED] shadow-sm'
                >
                  <span>Agregar</span>
                  <IoAdd className='w-4 h-4' />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Card */}
        {addedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='mt-6 p-4 border-2 border-[#73BD28] rounded-lg '
          >
            <h4 className='text-lg font-semibold text-gray-900 font-mona-sans mb-4'>
              Productos agregados ({addedProducts.length})
            </h4>

            <div className='space-y-1'>
              {addedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className='grid grid-cols-12 gap-4 p-4 rounded-lg'
                >
                  {/* Labels Row */}
                  <div className='col-span-12 grid grid-cols-12 gap-4 -mb-2'>
                    <div className='col-span-2 text-xs font-semibold text-gray-600 font-mona-sans text-start'>
                      Peso en libras
                    </div>
                    <div className='col-span-4 text-xs font-semibold text-gray-600 font-mona-sans text-start'>
                      Contenido
                    </div>
                    <div className='col-span-1'></div>
                    <div className='col-span-3'>
                      <div className='flex text-xs font-semibold text-gray-600 font-mona-sans'>
                        <div className='flex-1 text-start'>Largo</div>
                        <div className='flex-1 text-start'>Alto</div>
                        <div className='flex-1 text-start'>Ancho</div>
                      </div>
                    </div>
                    <div className='col-span-2'></div>
                  </div>

                  {/* Weight Display */}
                  <div className='col-span-2'>
                    <div className='p-3 bg-white border border-[#EDEDED] rounded-lg shadow-sm font-mona-sans flex items-center justify-center gap-1'>
                      <span className='font-medium'>{product.weight}</span>
                      <span className='text-sm text-gray-500'>libras</span>
                    </div>
                  </div>

                  {/* Content Display */}
                  <div className='col-span-4'>
                    <div className='p-3 bg-white border border-[#EDEDED] rounded-lg shadow-sm font-mona-sans'>
                      {product.content}
                    </div>
                  </div>

                  {/* Package Icon */}
                  <div className='col-span-1 flex items-center justify-center'>
                    <div className='w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center'>
                      <img src='/Icono.svg' alt='Package' className='w-6 h-6' />
                    </div>
                  </div>

                  {/* Dimensions Display - Same format as inputs */}
                  <div className='col-span-3'>
                    <div className='flex border border-[#EDEDED] shadow-sm rounded-lg overflow-hidden bg-white'>
                      <div className='flex-1 relative'>
                        <div className='p-3 text-center font-mona-sans'>
                          {product.length}
                        </div>
                        <span className='absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-mona-sans'>
                          cm
                        </span>
                      </div>

                      <div className='flex-1 relative border-l border-r border-[#EDEDED]'>
                        <div className='p-3 text-center font-mona-sans'>
                          {product.width}
                        </div>
                        <span className='absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-mona-sans'>
                          cm
                        </span>
                      </div>

                      <div className='flex-1 relative'>
                        <div className='p-3 text-center font-mona-sans'>
                          {product.height}
                        </div>
                        <span className='absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-mona-sans'>
                          cm
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className='col-span-2 flex items-center justify-center'>
                    <motion.button
                      onClick={() =>
                        setAddedProducts(
                          addedProducts.filter((p) => p.id !== product.id)
                        )
                      }
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                    >
                      <IoTrash className='w-5 h-5' />
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-4 pt-4 border-t border-[#73BD28]'>
              <div className='flex justify-between text-sm font-mona-sans'>
                <span className='text-gray-600'>Peso total:</span>
                <span className='font-semibold'>
                  {addedProducts.reduce(
                    (sum, p) => sum + (parseFloat(p.weight) || 0),
                    0
                  )}{' '}
                  libras
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='flex justify-between mt-8'
      >
        <Button
          onClick={onBack}
          variant='outline'
          className='flex items-center gap-2 px-6 py-3'
        >
          <IoChevronBack className='w-5 h-5' />
          Regresar
        </Button>

        <Button
          onClick={handleNext}
          className='px-8 py-3 bg-blue-600 hover:bg-blue-700'
        >
          Enviar →
        </Button>
      </motion.div>
    </motion.div>
  );
}
