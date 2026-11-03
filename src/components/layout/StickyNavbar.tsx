import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ShieldCheck, Truck, Layers, Mail, Home as HomeIcon, Briefcase, BookOpen, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link, useLocation } from 'react-router-dom';

export const StickyNavbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile drawer whenever location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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

  const handleNavClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass-nav px-3 sm:px-4 lg:px-6 py-3 sm:py-3.5 flex justify-between items-center transition-all bg-white/90 backdrop-blur-md border-b border-gray-200/80">
        <div className="flex items-center gap-4 xl:gap-8">
          {/* LOGO: DES-03 Blanco y negro corporativo sobre fondo blanco, exclusivamente WARHORSE */}
          <Link to="/" onClick={handleNavClick} className="flex items-center gap-2 group py-1">
            <img 
              src="/logo.png" 
              alt="WARHORSE" 
              className="h-8 sm:h-9 md:h-11 w-auto object-contain transition-all duration-300"
            />
          </Link>
          
          {/* Desktop Navigation Pill Container */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-[#F5F5F5] p-1 rounded-2xl border border-gray-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
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

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage} 
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-[#F5F5F5] border border-gray-200 text-[#1A1A1A] hover:bg-gray-200 transition-all font-bold text-xs uppercase cursor-pointer"
            title="Toggle Language"
            aria-label="Toggle Language"
          >
            <Globe size={15} />
            <span>{i18n.language}</span>
          </button>

          {/* Quote Button */}
          <Link to="/quote" onClick={handleNavClick}>
            <Button variant="primary" className="text-xs sm:text-sm px-3.5 sm:px-5 py-1.5 sm:py-2.5 font-bold">
              {t('nav.quote')}
            </Button>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex items-center justify-center p-2 rounded-xl bg-[#F5F5F5] border border-gray-200 text-[#1A1A1A] hover:bg-gray-200 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-2xl py-4 px-4 transition-all">
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleNavClick}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#1A1A1A] text-white shadow-sm'
                        : 'text-[#404040] hover:text-[#1A1A1A] hover:bg-gray-100 bg-[#F9F9F9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isActive ? 'text-white' : 'text-[#666666]'} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={16} className={isActive ? 'text-white/70' : 'text-gray-400'} />
                  </Link>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200 flex flex-col gap-2">
              <Link
                to="/quote"
                onClick={handleNavClick}
                className="w-full"
              >
                <Button variant="primary" className="w-full py-2.5 text-sm font-bold justify-center">
                  {t('nav.quote')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop overlay for mobile menu */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 top-[58px] bg-black/40 backdrop-blur-xs z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
