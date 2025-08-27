'use client';

import { forwardRef } from 'react';
import { IoCalendarOutline } from 'react-icons/io5';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, className = '', ...props }, ref) => {
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
            type='date'
            className={`p-3 bg-white border-2 font-mona-sans rounded-lg shadow-sm w-full transition-colors outline-none focus:outline-none focus:ring-0 cursor-pointer ${
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-[#EDEDED] focus:border-[#EDEDED]'
            } ${className}`}
            {...props}
          />
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <IoCalendarOutline
              size={20}
              className={`transition-colors ${
                error ? 'text-red-500' : 'text-[#4E4C4C]'
              }`}
            />
          </div>
        </div>
        {error && (
          <p className='text-red-500 text-sm font-mona-sans mt-1'>{error}</p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
