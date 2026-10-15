import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, ChevronDown, ExternalLink, Search, FileText, CalendarCheck, UserPlus, Sparkles } from 'lucide-react';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState<'shipper' | 'carrier' | 'customer' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (key: 'shipper' | 'carrier' | 'customer') => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-12">
      
      {/* Hero Section (HOME-03 a HOME-05: Single Protagonist Identity, Refactored Hero Copy & Audience Selectors) */}
      <section className="relative rounded-3xl overflow-hidden min-h-[65vh] flex flex-col justify-end p-8 md:p-14 border border-gray-200 shadow-xl bg-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920&q=80" 
            alt="Warhorse Freight Fleet" 
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-6 py-6">
          
          {/* Top Assurance Pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-100 border border-gray-300 text-[#1A1A1A] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <ShieldCheck size={16} className="text-[#1A1A1A]" />
            {t('home.badge')}
          </div>

          {/* Protagonist Logo (GL-02, HOME-03: Horse icon + WARHORSE typography only) */}
          <div className="relative group my-1">
            <img 
              src="/logo.png" 
              alt="WARHORSE" 
              className="relative h-24 sm:h-32 md:h-40 w-auto object-contain drop-shadow-sm hover:scale-105 transition-all duration-500"
            />
          </div>

          {/* Hero Headline & Subtitle (HOME-04, 5.2, Open Item #2) */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#1A1A1A] uppercase">
              {t('home.title_main')}
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-semibold tracking-wide text-[#1A1A1A] uppercase">
              {t('home.hero_subtitle')}
            </p>
          </div>

          {/* Value Propositions */}
          <div className="flex flex-col gap-2 max-w-2xl">
            <p className="text-xl md:text-2xl text-[#1A1A1A] font-bold italic">
              "{t('home.hero_slogan')}"
            </p>
            <p className="text-base md:text-lg text-[#1A1A1A] font-semibold">
              {t('home.hero_value')}
            </p>
            <p className="text-xs md:text-sm text-[#595959] font-normal leading-relaxed pt-1">
              {t('home.hero_support')}
            </p>
          </div>

          {/* Audience Dropdown Buttons (HOME-05, 5.3: Replaces Quote Now & About Us) */}
          <div ref={dropdownRef} className="flex flex-wrap justify-center items-center gap-4 pt-4 relative z-30">
            
            {/* 1. I'm a Shipper Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('shipper')}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 border cursor-pointer ${
                  openDropdown === 'shipper'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-md ring-2 ring-gray-400'
                    : 'bg-[#1A1A1A] text-white border-[#1A1A1A] hover:bg-black'
                }`}
              >
                {t('home.audience.shipper_btn')}
                <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === 'shipper' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'shipper' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-gray-300 rounded-2xl shadow-2xl p-2 z-50 flex flex-col gap-1 text-left animate-in fade-in zoom-in-95 duration-150">
                  <a
                    href="/track"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F5F5] transition-colors text-sm font-semibold text-[#1A1A1A] group"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <span className="flex items-center gap-2.5">
                      <Search size={16} className="text-[#1A1A1A]" />
                      {t('home.audience.track_load')}
                    </span>
                    <ExternalLink size={14} className="text-gray-400 group-hover:text-[#1A1A1A]" />
                  </a>

                  <a
                    href="/quote"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F5F5] transition-colors text-sm font-semibold text-[#1A1A1A] group"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <span className="flex items-center gap-2.5">
                      <FileText size={16} className="text-[#1A1A1A]" />
                      {t('home.audience.get_quote')}
                    </span>
                    <ExternalLink size={14} className="text-gray-400 group-hover:text-[#1A1A1A]" />
                  </a>
                </div>
              )}
            </div>

            {/* 2. I'm a Carrier Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('carrier')}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 border cursor-pointer ${
                  openDropdown === 'carrier'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-md ring-2 ring-gray-400'
                    : 'bg-white text-[#1A1A1A] border-gray-300 hover:bg-gray-100'
                }`}
              >
                {t('home.audience.carrier_btn')}
                <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === 'carrier' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'carrier' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-gray-300 rounded-2xl shadow-2xl p-2 z-50 flex flex-col gap-1 text-left animate-in fade-in zoom-in-95 duration-150">
                  <a
                    href="/book-load"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F5F5] transition-colors text-sm font-semibold text-[#1A1A1A] group"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <span className="flex items-center gap-2.5">
                      <CalendarCheck size={16} className="text-[#1A1A1A]" />
                      {t('home.audience.book_load')}
                    </span>
                    <ExternalLink size={14} className="text-gray-400 group-hover:text-[#1A1A1A]" />
                  </a>

                  <a
                    href="/apply"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F5F5] transition-colors text-sm font-semibold text-[#1A1A1A] group"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <span className="flex items-center gap-2.5">
                      <UserPlus size={16} className="text-[#1A1A1A]" />
                      {t('home.audience.become_carrier')}
                    </span>
                    <ExternalLink size={14} className="text-gray-400 group-hover:text-[#1A1A1A]" />
                  </a>
                </div>
              )}
            </div>

            {/* 3. I'm a New Customer Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('customer')}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 border cursor-pointer ${
                  openDropdown === 'customer'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-md ring-2 ring-gray-400'
                    : 'bg-[#F5F5F5] text-[#1A1A1A] border-gray-300 hover:bg-gray-200'
                }`}
              >
                {t('home.audience.new_customer_btn')}
                <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === 'customer' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'customer' && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-white border border-gray-300 rounded-2xl shadow-2xl p-2 z-50 flex flex-col gap-1 text-left animate-in fade-in zoom-in-95 duration-150">
                  <a
                    href="/quote?type=customized"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F5F5F5] transition-colors text-sm font-semibold text-[#1A1A1A] group"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <span className="flex items-center gap-2.5">
                      <Sparkles size={16} className="text-[#1A1A1A]" />
                      {t('home.audience.personalized_quote')}
                    </span>
                    <ExternalLink size={14} className="text-gray-400 group-hover:text-[#1A1A1A]" />
                  </a>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* METRICS PURGE (HOME-06): The 6-card metrics bento grid was completely purged per acceptance criteria */}

    </div>
  );
};
