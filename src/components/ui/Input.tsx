import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : 'input');

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-[#595959] pl-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-[#1A1A1A] placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-red-600 text-xs pl-1 font-medium">{error}</span>}
    </div>
  );
};
