import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { Building2, ShieldCheck, MapPin, Truck } from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-10">
      
      <div className="flex flex-col gap-3 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A]">
          {t('about.title_highlight')}{' '}
          <span className="underline decoration-[#1A1A1A]/30 underline-offset-8">{t('about.title')}</span>
        </h1>
        <p className="text-[#595959] max-w-3xl text-base">
          {t('about.subtitle')}
        </p>
      </div>

      {/* Map visual card */}
      <GlassCard className="relative overflow-hidden min-h-[300px] flex flex-col justify-end p-8 border border-gray-200 bg-white shadow-sm">
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80" 
          alt="North America Logistics Map" 
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">{t('about.map_badge')}</span>
            <h2 className="text-2xl font-bold text-[#1A1A1A] mt-1">{t('about.map_title')}</h2>
            <p className="text-sm text-[#595959] mt-1 max-w-xl">
              {t('about.map_desc')}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-[#F5F5F5] border border-gray-300 px-4 py-2 rounded-xl text-[#1A1A1A] text-sm font-semibold">
            <Truck size={20} className="text-[#1A1A1A]" />
            {t('about.map_units')}
          </div>
        </div>
      </GlassCard>

      {/* 3 Entities Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <GlassCard className="flex flex-col justify-between gap-6 hover:border-[#1A1A1A] transition-all bg-white border border-gray-200">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] border border-gray-200 flex items-center justify-center text-[#1A1A1A]">
              <Building2 size={24} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-[#595959]">{t('about.brokerage_badge')}</span>
              <h3 className="text-xl font-bold text-[#1A1A1A] mt-0.5">{t('about.brokerage_title')}</h3>
            </div>
            <p className="text-sm text-[#595959] leading-relaxed">
              {t('about.brokerage_desc')}
            </p>
          </div>
          <div className="text-xs font-semibold text-[#595959] border-t border-gray-200 pt-4">
            {t('about.brokerage_footer')}
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col justify-between gap-6 hover:border-[#1A1A1A] transition-all bg-white border border-gray-200">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] border border-gray-200 flex items-center justify-center text-[#1A1A1A]">
              <Truck size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#595959]">
                <MapPin size={12} /> {t('about.transportation_badge')}
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mt-0.5">{t('about.transportation_title')}</h3>
            </div>
            <p className="text-sm text-[#595959] leading-relaxed">
              {t('about.transportation_desc')}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1A1A] border-t border-gray-200 pt-4">
            <ShieldCheck size={16} className="text-[#1A1A1A]" />
            {t('about.transportation_footer')}
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col justify-between gap-6 hover:border-[#1A1A1A] transition-all bg-white border border-gray-200">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] border border-gray-200 flex items-center justify-center text-[#1A1A1A]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#595959]">
                <MapPin size={12} /> {t('about.logistics_badge')}
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mt-0.5">{t('about.logistics_title')}</h3>
            </div>
            <p className="text-sm text-[#595959] leading-relaxed">
              {t('about.logistics_desc')}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1A1A] border-t border-gray-200 pt-4">
            <ShieldCheck size={16} className="text-[#1A1A1A]" />
            {t('about.logistics_footer')}
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
