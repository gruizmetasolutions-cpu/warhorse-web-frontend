import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#F5F5F5] border-t border-gray-200 mt-auto py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Warhorse Logistics Group" 
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="text-sm text-[#595959] leading-relaxed">
            "Safety drives us. Compliance defines us. Your success moves us forward."
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">Quick Links</h3>
          <Link to="/about" className="text-sm text-[#595959] hover:text-[#1A1A1A] transition-colors">{t('nav.about')}</Link>
          <Link to="/services" className="text-sm text-[#595959] hover:text-[#1A1A1A] transition-colors">{t('nav.services')}</Link>
          <Link to="/security" className="text-sm text-[#595959] hover:text-[#1A1A1A] transition-colors">{t('nav.security')}</Link>
          <Link to="/contact" className="text-sm text-[#595959] hover:text-[#1A1A1A] transition-colors">{t('nav.contact')}</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">Certifications</h3>
          <div className="flex items-center gap-2 text-sm text-[#595959]">
            <ShieldCheck size={18} className="text-[#1A1A1A]" />
            CTPAT Certified (Mexico & US)
          </div>
          <div className="flex items-center gap-2 text-sm text-[#595959]">
            <ShieldCheck size={18} className="text-[#1A1A1A]" />
            FMCSA Registered Carrier
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">Contact Info</h3>
          <a href="tel:9152630708" className="flex items-center gap-2 text-sm text-[#595959] hover:text-[#1A1A1A]">
            <Phone size={16} className="text-[#1A1A1A]" />
            915-263-0708
          </a>
          <a href="mailto:Helpdesk@warhorsebrokerage.com" className="flex items-center gap-2 text-sm text-[#595959] hover:text-[#1A1A1A]">
            <Mail size={16} className="text-[#1A1A1A]" />
            Helpdesk@warhorsebrokerage.com
          </a>
          <div className="flex items-center gap-2 text-sm text-[#595959]">
            <MapPin size={16} className="text-[#1A1A1A]" />
            El Paso, TX & Cd. Juárez, CHIH
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-300/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#595959]">
        <p>© {new Date().getFullYear()} Warhorse Logistics Group. All rights reserved.</p>
        <p className="font-medium">Cross-Border FTL · LTL · Specialized Transport</p>
      </div>
    </footer>
  );
};
