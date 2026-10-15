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
  let baseStyles = 'px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer';

  if (variant === 'primary') {
    // DES-02: Botones primarios en negro sólido (#1A1A1A) con texto blanco
    baseStyles += ' bg-[#1A1A1A] text-white hover:bg-black hover:shadow-md active:scale-[0.98]';
  } else if (variant === 'outline') {
    // DES-02: Botones secundarios con borde negro (outline)
    baseStyles += ' border-2 border-[#1A1A1A] text-[#1A1A1A] bg-transparent hover:bg-[#1A1A1A] hover:text-white active:scale-[0.98]';
  } else if (variant === 'ghost') {
    baseStyles += ' text-[#595959] hover:text-[#1A1A1A] hover:bg-gray-100 active:scale-[0.98]';
  }

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button className={`${baseStyles} ${widthClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
