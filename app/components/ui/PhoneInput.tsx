'use client';

import { forwardRef, useEffect, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  className?: string;
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const countryCodes: CountryCode[] = [
  { code: '+503', country: 'El Salvador', flag: '🇸🇻' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+1', country: 'Estados Unidos', flag: '🇺🇸' },
  { code: '+52', country: 'México', flag: '🇲🇽' },
  { code: '+34', country: 'España', flag: '🇪🇸' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+51', country: 'Perú', flag: '🇵🇪' },
  { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
];

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      error,
      className = '',
      countryCode = '+503',
      onCountryCodeChange,
      onChange,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const handleSelectMouseDown = () => {
      setIsSelectOpen(true);
    };

    const handleSelectBlur = () => {
      // Pequeño delay para permitir que el onChange se ejecute primero
      setTimeout(() => {
        setIsSelectOpen(false);
      }, 150);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onCountryCodeChange) {
        onCountryCodeChange(e.target.value);
      }
      // Cerrar después de un pequeño delay
      setTimeout(() => {
        setIsSelectOpen(false);
      }, 100);
    };

    if (!mounted) {
      return (
        <div className='flex flex-col items-start w-full gap-1 justify-center'>
          {label && (
            <label className='font-semibold font-mona-sans text-sm text-[#050817]'>
              {label}
            </label>
          )}
          <div className='relative w-full'>
            <div className='p-3 bg-white border font-mona-sans rounded-lg shadow-sm border-[#EDEDED] h-[50px]' />
          </div>
        </div>
      );
    }

    return (
      <div className='flex flex-col items-start w-full gap-1 justify-center'>
        {label && (
          <label className='font-semibold font-mona-sans text-sm text-[#050817]'>
            {label}
          </label>
        )}
        <div className='relative w-full'>
          {/* Container integrado */}
          <div
            className={`flex w-full border font-mona-sans rounded-lg shadow-sm transition-colors overflow-hidden ${
              error
                ? 'border-red-500'
                : 'border-[#EDEDED] focus-within:border-[#EDEDED]'
            }`}
          >
            {/* Select para código de área */}
            <div className='relative bg-gray-50'>
              <select
                value={countryCode}
                onChange={handleSelectChange}
                onMouseDown={handleSelectMouseDown}
                onBlur={handleSelectBlur}
                className='p-3 bg-transparent outline-none focus:outline-none focus:ring-0 appearance-none cursor-pointer border-none text-sm min-w-[80px] pr-6'
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code}
                  </option>
                ))}
              </select>
              <div className='absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none'>
                <IoChevronDown
                  size={12}
                  className={`transition-all duration-200 ease-in-out ${
                    isSelectOpen ? 'rotate-180' : 'rotate-0'
                  } ${error ? 'text-red-500' : 'text-[#4E4C4C]'}`}
                />
              </div>
            </div>

            {/* Separador visual */}
            <div className={`w-px bg-gray-300 ${error ? 'bg-red-300' : ''}`} />

            {/* Input para número de teléfono */}
            <input
              ref={ref}
              type='tel'
              className='p-3 bg-white flex-1 outline-none focus:outline-none focus:ring-0 border-none'
              onChange={onChange}
              {...props}
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

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
