import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ShieldCheck, Truck, Layers, Mail, Home as HomeIcon, Briefcase, BookOpen } from 'lucide-react';
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
    { path: '/apply', label: t('nav.apply'), icon: Briefcase },
    { path: '/resources', label: t('nav.resources'), icon: BookOpen },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav px-4 lg:px-6 py-3.5 flex justify-between items-center transition-all">
      <div className="flex items-center gap-6 xl:gap-8">
        {/* LOGO: DES-03 Blanco y negro corporativo sobre fondo blanco, exclusivamente WARHORSE */}
        <Link to="/" className="flex items-center gap-3 group py-1">
          <img 
            src="/logo.png" 
            alt="WARHORSE" 
            className="h-9 md:h-11 w-auto object-contain transition-all duration-300"
          />
        </Link>
        
        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-[#F5F5F5] p-1 rounded-2xl border border-gray-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 xl:px-3.5 xl:py-2 rounded-xl text-xs xl:text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-[#1A1A1A] text-white font-semibold shadow-sm' 
                    : 'text-[#595959] hover:text-[#1A1A1A] hover:bg-white'
                }`}
              >
                <Icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={toggleLanguage} 
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F5F5] border border-gray-200 text-[#1A1A1A] hover:bg-gray-200 transition-all font-bold text-xs uppercase cursor-pointer"
          title="Toggle Language"
        >
          <Globe size={16} />
          {i18n.language}
        </button>

        <Link to="/quote">
          <Button variant="primary" className="text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5">
            {t('nav.quote')}
          </Button>
        </Link>
      </div>
    </nav>
  );
};
