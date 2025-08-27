'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OrderFormStep from './OrderFormStep';
import AddProductsStep from './AddProductsStep';

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

interface Product {
  id: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  content: string;
}

export default function CreateOrderContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState<OrderFormData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const handleOrderFormNext = (data: OrderFormData) => {
    setOrderData(data);
    setCurrentStep(2);
  };

  const handleAddProductsNext = (productData: Product[]) => {
    setProducts(productData);
    console.log('Order completed:', { orderData, products: productData });
    // Aquí se enviaría la orden completa
  };

  const handleBackToForm = () => {
    setCurrentStep(1);
  };

  const slideVariants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const direction = currentStep === 2 ? 1 : -1;

  return (
    <div className='relative'>
      <AnimatePresence initial={false} custom={direction}>
        {currentStep === 1 && (
          <motion.div
            key='step1'
            custom={direction}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <OrderFormStep onNext={handleOrderFormNext} />
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key='step2'
            custom={direction}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <AddProductsStep
              onNext={handleAddProductsNext}
              onBack={handleBackToForm}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
