'use client';

import {
  IoChevronBack,
  IoChevronForward,
  IoEye,
  IoEyeOff,
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
} from 'react-icons/io5';

interface IconProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export function ChevronLeftIcon({
  size = 24,
  className = '',
  onClick,
}: IconProps) {
  return (
    <IoChevronBack
      size={size}
      className={`cursor-pointer transition-colors hover:text-[#2E49CE] ${className}`}
      onClick={onClick}
    />
  );
}

export function ChevronRightIcon({
  size = 24,
  className = '',
  onClick,
}: IconProps) {
  return (
    <IoChevronForward
      size={size}
      className={`cursor-pointer transition-colors hover:text-[#2E49CE] ${className}`}
      onClick={onClick}
    />
  );
}

export function EyeIcon({ size = 24, className = '', onClick }: IconProps) {
  return (
    <IoEye
      size={size}
      className={`cursor-pointer transition-colors hover:text-[#2E49CE] ${className}`}
      onClick={onClick}
    />
  );
}

export function EyeSlashIcon({
  size = 24,
  className = '',
  onClick,
}: IconProps) {
  return (
    <IoEyeOff
      size={size}
      className={`cursor-pointer transition-colors hover:text-[#2E49CE] ${className}`}
      onClick={onClick}
    />
  );
}

export function UserIcon({ size = 24, className = '' }: IconProps) {
  return <IoPersonOutline size={size} className={className} />;
}

export function MailIcon({ size = 24, className = '' }: IconProps) {
  return <IoMailOutline size={size} className={className} />;
}

export function LockIcon({ size = 24, className = '' }: IconProps) {
  return <IoLockClosedOutline size={size} className={className} />;
}

export function CheckIcon({ size = 24, className = '' }: IconProps) {
  return <IoCheckmarkCircle size={size} className={className} />;
}

export function XIcon({ size = 24, className = '' }: IconProps) {
  return <IoCloseCircle size={size} className={className} />;
}
