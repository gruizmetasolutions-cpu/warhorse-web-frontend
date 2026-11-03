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
      
      {/* Hero Section (HOME-03 a HOME-05, TKT-WEB-029: 2-Column Split Hero Layout - Mobile-First) */}
      <section className="relative rounded-3xl bg-white border border-gray-200 shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column (Identity, Typography & Audience Selectors) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-5">
            
            {/* Top Assurance Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-300 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider shadow-sm">
              <ShieldCheck size={16} className="text-[#1A1A1A]" />
              {t('home.badge')}
            </div>

            {/* Protagonist Logo */}
            <div className="relative group my-1">
              <img 
                src="/logo.png?v=3" 
                alt="WARHORSE" 
                width={500}
                height={176}
                {...({ fetchpriority: "high" } as any)}
                className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto object-contain drop-shadow-sm hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Hero Subtitle as Semantic <h1> */}
            <div className="flex flex-col gap-1">
              <h1 className="text-xs sm:text-sm md:text-base font-bold tracking-wide text-[#1A1A1A] uppercase">
                {t('home.hero_subtitle')}
              </h1>
            </div>

            {/* Value Propositions */}
            <div className="flex flex-col gap-2 max-w-xl">
              <p className="text-xl sm:text-2xl lg:text-3xl text-[#1A1A1A] font-black italic tracking-tight">
                "{t('home.hero_slogan')}"
              </p>
              <p className="text-sm sm:text-base text-[#1A1A1A] font-bold">
                {t('home.hero_value')}
              </p>
              <p className="text-xs sm:text-sm text-[#595959] font-normal leading-relaxed">
                {t('home.hero_support')}
              </p>
            </div>

            {/* Audience Dropdown Buttons */}
            <div ref={dropdownRef} className="flex flex-wrap justify-center lg:justify-start items-center gap-3 pt-3 relative z-30">
              
              {/* 1. I'm a Shipper Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleDropdown('shipper')}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 border cursor-pointer ${
                    openDropdown === 'shipper'
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-md ring-2 ring-gray-400'
                      : 'bg-[#1A1A1A] text-white border-[#1A1A1A] hover:bg-black shadow-sm'
                  }`}
                >
                  {t('home.audience.shipper_btn')}
                  <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === 'shipper' ? 'rotate-180' : ''}`} />
                </button>

                {openDropdown === 'shipper' && (
                  <div className="absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 bottom-full mb-2 w-64 bg-white border border-gray-300 rounded-2xl shadow-2xl p-2 z-50 flex flex-col gap-1 text-left animate-in fade-in zoom-in-95 duration-150">
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
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 border cursor-pointer ${
                    openDropdown === 'carrier'
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-md ring-2 ring-gray-400'
                      : 'bg-white text-[#1A1A1A] border-gray-300 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  {t('home.audience.carrier_btn')}
                  <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === 'carrier' ? 'rotate-180' : ''}`} />
                </button>

                {openDropdown === 'carrier' && (
                  <div className="absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 bottom-full mb-2 w-64 bg-white border border-gray-300 rounded-2xl shadow-2xl p-2 z-50 flex flex-col gap-1 text-left animate-in fade-in zoom-in-95 duration-150">
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
                      href="/carrier"
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
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 border cursor-pointer ${
                    openDropdown === 'customer'
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-md ring-2 ring-gray-400'
                      : 'bg-[#F5F5F5] text-[#1A1A1A] border-gray-300 hover:bg-gray-200 shadow-sm'
                  }`}
                >
                  {t('home.audience.new_customer_btn')}
                  <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === 'customer' ? 'rotate-180' : ''}`} />
                </button>

                {openDropdown === 'customer' && (
                  <div className="absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 bottom-full mb-2 w-72 bg-white border border-gray-300 rounded-2xl shadow-2xl p-2 z-50 flex flex-col gap-1 text-left animate-in fade-in zoom-in-95 duration-150">
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

          {/* Right Column (Uncovered Panoramic Fleet Sunset Photography) */}
          <div className="lg:col-span-6 xl:col-span-6 w-full h-[300px] sm:h-[380px] md:h-[440px] lg:h-[500px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-gray-200 relative group bg-gray-900">
            <img 
              src="/images/warhorse-home-hero-fleet-sunset.jpg" 
              alt="Warhorse Heavy Freight Fleet at Sunset" 
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>

        </div>
      </section>

      {/* METRICS PURGE (HOME-06): The 6-card metrics bento grid was completely purged per acceptance criteria */}

    </div>
  );
};
