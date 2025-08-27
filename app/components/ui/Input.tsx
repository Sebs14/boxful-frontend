'use client';

import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className='flex flex-col items-start w-full gap-1 justify-center'>
        {label && (
          <label className='font-semibold font-mona-sans text-sm text-[#050817]'>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`p-3 bg-white border-2 font-mona-sans rounded-lg shadow-sm w-full transition-colors outline-none focus:outline-none focus:ring-0 ${
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-[#EDEDED] '
          } ${className}`}
          {...props}
        />
        {error && (
          <p className='text-red-500 text-sm font-mona-sans mt-1'>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
