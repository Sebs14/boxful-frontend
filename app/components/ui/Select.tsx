'use client';

import { forwardRef, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { motion } from 'framer-motion';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  className?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, className = '', options, placeholder, onChange, ...props },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseDown = () => {
      setIsOpen(true);
    };

    const handleBlur = () => {
      // Pequeño delay para permitir que el onChange se ejecute primero
      setTimeout(() => {
        setIsOpen(false);
      }, 150);
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e);
      }
      // Cerrar después de un pequeño delay
      setTimeout(() => {
        setIsOpen(false);
      }, 100);
    };

    return (
      <div className='flex flex-col items-start w-full gap-1 justify-center'>
        {label && (
          <label className='font-semibold font-mona-sans text-sm text-[#050817]'>
            {label}
          </label>
        )}
        <div className='relative w-full'>
          <select
            ref={ref}
            defaultValue=''
            onMouseDown={handleMouseDown}
            onBlur={handleBlur}
            onChange={handleChange}
            className={`p-3 bg-white border font-mona-sans rounded-lg shadow-sm w-full transition-colors outline-none focus:outline-none focus:ring-0 appearance-none cursor-pointer ${
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-[#EDEDED] focus:border-[#EDEDED]'
            } ${className}`}
            {...props}
          >
            {placeholder && (
              <option value='' disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <motion.div
              animate={{
                rotate: isOpen ? 180 : 0,
                scale: isOpen ? 1.1 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                duration: 0.3,
              }}
            >
              <IoChevronDown
                size={20}
                className={`${error ? 'text-red-500' : 'text-[#4E4C4C]'}`}
              />
            </motion.div>
          </div>
        </div>
        {error && (
          <p className='text-red-500 text-sm font-mona-sans mt-1'>{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
