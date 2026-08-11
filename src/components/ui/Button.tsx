import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  let baseStyles = 'px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer';

  if (variant === 'primary') {
    baseStyles += ' bg-[#C5A059] text-black hover:bg-[#d4b068] hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] active:scale-95';
  } else if (variant === 'outline') {
    baseStyles += ' border border-[#C5A059]/40 text-[#C5A059] hover:border-[#C5A059] hover:bg-[#C5A059]/10 active:scale-95';
  } else if (variant === 'ghost') {
    baseStyles += ' text-gray-300 hover:text-white hover:bg-white/5 active:scale-95';
  }

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button className={`${baseStyles} ${widthClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
