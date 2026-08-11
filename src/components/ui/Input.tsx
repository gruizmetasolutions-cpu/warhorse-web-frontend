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
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-gray-400 pl-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-[#C5A059] focus:bg-white/10 focus:ring-1 focus:ring-[#C5A059] ${error ? 'border-red-500/50' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-red-400 text-xs pl-1">{error}</span>}
    </div>
  );
};
