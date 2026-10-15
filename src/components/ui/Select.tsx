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
        <label htmlFor={selectId} className="text-xs font-semibold uppercase tracking-wider text-[#595959] pl-1">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-[#1A1A1A] outline-none transition-all duration-200 focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] cursor-pointer ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      >
        <option value="" disabled className="bg-white text-gray-400">
          -- Select an option --
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white text-[#1A1A1A]">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-600 text-xs pl-1 font-medium">{error}</span>}
    </div>
  );
};
