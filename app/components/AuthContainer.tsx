'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthContainer() {
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login');
  const [isHydrated, setIsHydrated] = useState(false);

  const showRegister = () => setCurrentView('register');
  const showLogin = () => setCurrentView('login');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Direction: 1 = left to right (show register), -1 = right to left (show login)
  const direction = currentView === 'register' ? 1 : -1;

  // Prevent hydration mismatch by not rendering until hydrated
  if (!isHydrated) {
    return (
      <div className='relative w-1/2 h-screen overflow-hidden'>
        <div className='absolute inset-0 w-full h-full'>
          <div className='flex flex-col justify-center items-start w-full p-8 h-screen gap-11'>
            <div className='flex flex-col items-center gap-3 justify-center sm:items-start'>
              <div className='h-8 bg-gray-200 rounded w-48 animate-pulse' />
              <div className='h-4 bg-gray-200 rounded w-64 animate-pulse' />
            </div>
            <div className='flex flex-col w-full gap-6 pb-11'>
              <div className='w-full h-16 bg-gray-200 rounded animate-pulse' />
              <div className='w-full h-16 bg-gray-200 rounded animate-pulse' />
              <div className='w-full h-12 bg-gray-200 rounded animate-pulse' />
            </div>
            <div className='w-full h-4 bg-gray-200 rounded animate-pulse' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='relative w-1/2 h-screen overflow-hidden'>
      <AnimatePresence initial={false} custom={direction}>
        {currentView === 'login' && (
          <motion.div
            key='login'
            custom={direction}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                showRegister();
              }
            }}
            className='absolute inset-0 w-full h-full'
          >
            <LoginForm onShowRegister={showRegister} />
          </motion.div>
        )}

        {currentView === 'register' && (
          <motion.div
            key='register'
            custom={direction}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe > swipeConfidenceThreshold) {
                showLogin();
              }
            }}
            className='absolute inset-0 w-full h-full'
          >
            <RegisterForm onShowLogin={showLogin} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
