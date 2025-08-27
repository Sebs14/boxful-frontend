'use client';

import { motion } from 'framer-motion';
import { IoNotifications, IoSearch, IoMenu } from 'react-icons/io5';

interface HeaderProps {
  title: string;
  onToggleSidebar: () => void;
}

export default function Header({ title, onToggleSidebar }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className='bg-white border-b border-gray-200 px-6 py-4 w-full'
    >
      <div className='flex items-center justify-between'>
        {/* Left side */}
        <div className='flex items-center gap-4'>
          <button
            onClick={onToggleSidebar}
            className='lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors'
          >
            <IoMenu className='w-6 h-6 text-gray-600' />
          </button>

          <h1 className='text-2xl text-gray-900 font-mona-sans'>{title}</h1>
        </div>

        {/* Right side */}
        <div className='flex items-center gap-4'>
          {/* User menu */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className='flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer'
          >
            <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
              <span className='text-white text-sm font-semibold'>TN</span>
            </div>
            <div className='hidden sm:block'>
              <p className='text-sm font-medium text-gray-900 font-mona-sans whitespace-nowrap'>
                {'{Tunombre}'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
