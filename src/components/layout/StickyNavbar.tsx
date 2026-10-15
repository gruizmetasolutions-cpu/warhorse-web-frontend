import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Phone, ShieldCheck, Truck, Layers, Mail, Home as HomeIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link, useLocation } from 'react-router-dom';

export const StickyNavbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(nextLang);
  };

  const navItems = [
    { path: '/', label: t('nav.home'), icon: HomeIcon },
    { path: '/about', label: t('nav.about'), icon: Truck },
    { path: '/services', label: t('nav.services'), icon: Layers },
    { path: '/security', label: t('nav.security'), icon: ShieldCheck },
    { path: '/contact', label: t('nav.contact'), icon: Mail },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav px-6 py-3.5 flex justify-between items-center transition-all">
      <div className="flex items-center gap-8">
        {/* LOGO: DES-03 Blanco y negro corporativo sobre fondo blanco */}
        <Link to="/" className="flex items-center gap-3 group py-1">
          <img 
            src="/logo.png" 
            alt="Warhorse Logistics Group" 
            className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
          />
        </Link>
        
        <div className="hidden lg:flex items-center gap-1 bg-[#F5F5F5] p-1 rounded-2xl border border-gray-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-[#1A1A1A] text-white font-semibold shadow-sm' 
                    : 'text-[#595959] hover:text-[#1A1A1A] hover:bg-white'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <a 
          href="tel:9152630708" 
          className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#595959] hover:text-[#1A1A1A] transition-colors px-3 py-2 rounded-xl bg-[#F5F5F5] border border-gray-200"
        >
          <Phone size={16} className="text-[#1A1A1A]" />
          915-263-0708
        </a>
        
        <button 
          onClick={toggleLanguage} 
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F5F5F5] border border-gray-200 text-[#1A1A1A] hover:bg-gray-200 transition-all font-bold text-xs uppercase cursor-pointer"
          title="Toggle Language"
        >
          <Globe size={18} />
          {i18n.language}
        </button>

        <Link to="/contact">
          <Button variant="primary" className="text-sm px-5 py-2.5">
            {t('nav.quote')}
          </Button>
        </Link>
      </div>
    </nav>
  );
};
