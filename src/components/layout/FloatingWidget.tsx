import React from 'react';
import { PhoneCall } from 'lucide-react';

export const FloatingWidget: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a 
        href="tel:9152630708" 
        className="flex items-center justify-center w-14 h-14 bg-[#C5A059] text-black rounded-full shadow-[0_0_25px_rgba(197,160,89,0.5)] hover:scale-110 active:scale-95 transition-all group"
        title="Call 915-263-0708"
      >
        <PhoneCall size={24} className="animate-pulse group-hover:animate-none" />
      </a>
    </div>
  );
};
