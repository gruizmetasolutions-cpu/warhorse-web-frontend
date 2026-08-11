import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#0f0f10] border-t border-white/10 mt-auto py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Warhorse Logistics Group" 
              className="h-12 w-auto object-contain brightness-0 invert drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]"
            />
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            "Safety drives us. Compliance defines us. Your success moves us forward."
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-white text-sm uppercase tracking-wider text-[#C5A059]">Quick Links</h3>
          <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">{t('nav.about')}</Link>
          <Link to="/services" className="text-sm text-gray-400 hover:text-white transition-colors">{t('nav.services')}</Link>
          <Link to="/security" className="text-sm text-gray-400 hover:text-white transition-colors">{t('nav.security')}</Link>
          <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">{t('nav.contact')}</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-white text-sm uppercase tracking-wider text-[#C5A059]">Certifications</h3>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <ShieldCheck size={18} className="text-[#C5A059]" />
            CTPAT Certified (Mexico & US)
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <ShieldCheck size={18} className="text-[#C5A059]" />
            FMCSA Registered Carrier
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-white text-sm uppercase tracking-wider text-[#C5A059]">Contact Info</h3>
          <a href="tel:9152630708" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
            <Phone size={16} className="text-[#C5A059]" />
            915-263-0708
          </a>
          <a href="mailto:Helpdesk@warhorsebrokerage.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
            <Mail size={16} className="text-[#C5A059]" />
            Helpdesk@warhorsebrokerage.com
          </a>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin size={16} className="text-[#C5A059]" />
            El Paso, TX & Cd. Juárez, CHIH
          </div>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <span>&copy; 2026 Warhorse Logistics Group. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link to="/styleguide" className="text-[#C5A059] font-bold hover:underline flex items-center gap-1">
            🎨 UX UI Warhorse V1.0 Style Guide
          </Link>
          <span>Cross-Border Logistics Architecture (US · MX · CA)</span>
        </div>
      </div>
    </footer>
  );
};
