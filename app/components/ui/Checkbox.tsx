'use client';

import { motion } from 'framer-motion';
import { IoCheckmark } from 'react-icons/io5';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Checkbox({
  checked,
  onChange,
  className = '',
  size = 'md',
}: CheckboxProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <motion.button
      type='button'
      onClick={() => onChange(!checked)}
      className={`
        ${sizeClasses[size]}
        relative
        rounded-md
        border-2
        transition-all
        duration-200
        ease-in-out
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-1
        ${
          checked
            ? 'bg-blue-600 border-blue-600 text-white'
            : 'bg-white border-gray-300 hover:border-blue-400'
        }
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
      animate={checked ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: checked ? 1 : 0,
          scale: checked ? 1 : 0.5,
        }}
        transition={{ duration: 0.15 }}
        className='absolute inset-0 flex items-center justify-center'
      >
        <IoCheckmark className={`${iconSizes[size]} font-bold`} />
      </motion.div>
    </motion.button>
  );
}
