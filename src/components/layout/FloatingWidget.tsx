import React from 'react';
import { PhoneCall } from 'lucide-react';

export const FloatingWidget: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a 
        href="tel:9152630708" 
        className="flex items-center justify-center w-14 h-14 bg-[#1A1A1A] text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all group border border-gray-300"
        title="Call 915-263-0708"
      >
        <PhoneCall size={22} className="animate-pulse group-hover:animate-none" />
      </a>
    </div>
  );
};
