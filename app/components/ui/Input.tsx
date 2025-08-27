'use client';

import { forwardRef, useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className='flex flex-col items-start w-full gap-1 justify-center'>
        {label && (
          <label className='font-semibold font-mona-sans text-sm text-[#050817]'>
            {label}
          </label>
        )}
        <div className='relative w-full'>
          <input
            ref={ref}
            type={inputType}
            className={`p-3 bg-white border-2 font-mona-sans rounded-lg shadow-sm w-full transition-colors outline-none focus:outline-none focus:ring-0 ${
              isPassword ? 'pr-12' : ''
            } ${
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-[#EDEDED] '
            } ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute inset-y-0 right-0 flex items-center pr-3 text-[#4E4C4C] hover:text-[#2E49CE] transition-colors'
            >
              {showPassword ? (
                <IoEyeOffOutline size={20} />
              ) : (
                <IoEyeOutline size={20} />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className='text-red-500 text-sm font-mona-sans mt-1'>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
