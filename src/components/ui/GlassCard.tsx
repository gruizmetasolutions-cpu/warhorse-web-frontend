import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '',
  glow = false,
  ...props 
}) => {
  return (
    <div 
      className={`glass-card p-6 ${glow ? 'gold-glow' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
