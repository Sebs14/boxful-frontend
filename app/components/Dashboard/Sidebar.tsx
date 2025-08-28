'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoAdd, IoTime, IoChevronBack, IoLogOutOutline } from 'react-icons/io5';
import Image from 'next/image';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout?: () => void;
}

const menuItems = [
  {
    id: 'crear-orden',
    label: 'Crear orden',
    icon: IoAdd,
    isActive: true,
    isPrimary: true,
  },
  {
    id: 'historial',
    label: 'Historial',
    icon: IoTime,
    isActive: false,
    isPrimary: true,
  },
];

export default function Sidebar({
  isCollapsed,
  onToggleCollapse,
  activeTab,
  onTabChange,
  onLogout,
}: SidebarProps) {
  return (
    <motion.div
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className='bg-[#F8F9FAf] border-r border-gray-200 h-screen flex flex-col fixed top-0 left-0 z-30'
    >
      {/* Header */}
      <div className='p-6 '>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3 overflow-hidden'>
            <Image width={40} height={40} src='/Iso.svg' alt='Boxful Logo' />
            <motion.span
              initial={{ opacity: 1 }}
              animate={{
                opacity: isCollapsed ? 0 : 1,
                x: isCollapsed ? -20 : 0,
              }}
              transition={{ duration: 0.2 }}
              className='text-xl font-bold text-red-500 font-mona-sans whitespace-nowrap'
            >
              boxful
            </motion.span>
          </div>

          <button
            onClick={onToggleCollapse}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors relative z-10 flex-shrink-0'
          >
            <IoChevronBack
              className={`w-5 h-5 text-gray-500 transition-transform ${
                isCollapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className='flex-1 p-4'>
        <nav className='space-y-2'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all h-12 ${
                  isActive
                    ? item.isPrimary
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className='w-5 h-5 flex-shrink-0' />
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: isCollapsed ? 0 : 1,
                    x: isCollapsed ? -10 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className='font-medium font-mona-sans whitespace-nowrap overflow-hidden'
                >
                  {item.label}
                </motion.span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className='p-4 border-t border-gray-200'>
        <motion.button
          onClick={onLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all h-12 text-red-600 hover:bg-red-50'
        >
          <IoLogOutOutline className='w-5 h-5 flex-shrink-0' />
          <motion.span
            initial={{ opacity: 1 }}
            animate={{
              opacity: isCollapsed ? 0 : 1,
              x: isCollapsed ? -10 : 0,
            }}
            transition={{ duration: 0.2 }}
            className='font-medium font-mona-sans whitespace-nowrap overflow-hidden'
          >
            Cerrar sesión
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
}
