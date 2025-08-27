'use client';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    'font-semibold font-mona-sans rounded-lg transition-colors focus:outline-none focus:ring-0';

  const variantClasses = {
    primary: `text-white ${
      isLoading || disabled
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-[#2E49CE] hover:bg-[#2640B8] active:bg-[#1E3A9E]'
    }`,
    secondary: `text-[#2E49CE] bg-white border-2 border-[#2E49CE] ${
      isLoading || disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:bg-[#2E49CE] hover:text-white'
    }`,
    outline: `text-[#4E4C4C] bg-transparent border-2 border-[#EDEDED] ${
      isLoading || disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:border-[#2E49CE] hover:text-[#2E49CE]'
    }`,
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm h-9',
    md: 'px-4 py-3 text-base h-12',
    lg: 'px-6 py-4 text-lg h-14',
  };

  return (
    <button
      disabled={isLoading || disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className='flex items-center justify-center gap-2'>
          <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin'></div>
          <span>Cargando...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
