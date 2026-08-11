import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : 'select');

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold uppercase tracking-wider text-gray-400 pl-1">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full bg-[#1A1A1B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none transition-all duration-300 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] cursor-pointer ${error ? 'border-red-500/50' : ''} ${className}`}
        {...props}
      >
        <option value="" disabled className="bg-[#1A1A1B] text-gray-400">
          -- Select an option --
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#1A1A1B] text-white">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-400 text-xs pl-1">{error}</span>}
    </div>
  );
};
