import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Truck, 
  Target, 
  Award, 
  Box, 
  Layers, 
  Thermometer, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col gap-12">
      
      {/* 1. Page Header & Introduction */}
      <div className="flex flex-col gap-4 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-300 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider w-fit">
          <Truck size={15} />
          {t('about.about_warhorse_title')}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight uppercase">
          {t('about.about_warhorse_title')}
        </h1>
        <p className="text-[#595959] max-w-4xl text-base md:text-lg leading-relaxed">
          {t('about.about_warhorse_text')}
        </p>
      </div>

      {/* 2. Hero Visual: Fleet & Trinational Network */}
      <GlassCard className="relative overflow-hidden min-h-[340px] flex flex-col justify-end p-8 md:p-10 border border-gray-200 bg-white shadow-sm">
        <img 
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1600&q=80" 
          alt="Warhorse Heavy Fleet & Cross-Border Logistics" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">{t('about.map_badge')}</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mt-1">{t('about.map_title')}</h2>
            <p className="text-sm text-[#595959] mt-2 leading-relaxed">
              {t('about.map_desc')}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-[#F5F5F5] border border-gray-300 px-5 py-3 rounded-2xl text-[#1A1A1A] text-sm font-bold shadow-sm">
            <Truck size={22} className="text-[#1A1A1A]" />
            {t('about.map_units')}
          </div>
        </div>
      </GlassCard>

      {/* 3. Mission & Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <GlassCard className="p-8 flex flex-col gap-4 bg-white border border-gray-200">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
            <Target size={24} />
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">{t('about.mission_title')}</h2>
          <p className="text-sm text-[#595959] leading-relaxed">
            {t('about.mission_text')}
          </p>
        </GlassCard>

        <GlassCard className="p-8 flex flex-col gap-4 bg-white border border-gray-200">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
            <Award size={24} />
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">{t('about.values_title')}</h2>
          <p className="text-sm text-[#595959] leading-relaxed">
            {t('about.values_text')}
          </p>
        </GlassCard>

      </div>

      {/* 4. Corporate Structure: 3 Entities */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">{t('about.structure_title')}</h2>
          <p className="text-sm text-[#595959]">{t('about.structure_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <GlassCard className="flex flex-col justify-between gap-6 hover:border-[#1A1A1A] transition-all bg-white border border-gray-200 p-6">
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
            <div className="text-xs font-semibold text-[#595959] border-t border-gray-200 pt-4 flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#1A1A1A]" />
              {t('about.brokerage_footer')}
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col justify-between gap-6 hover:border-[#1A1A1A] transition-all bg-white border border-gray-200 p-6">
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

          <GlassCard className="flex flex-col justify-between gap-6 hover:border-[#1A1A1A] transition-all bg-white border border-gray-200 p-6">
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
              <CheckCircle2 size={16} className="text-[#1A1A1A]" />
              {t('about.logistics_footer')}
            </div>
          </GlassCard>

        </div>
      </div>

      {/* 5. Operational Scope & Equipment Modes (Flatbed, Reefer, Dry Van, Specialized) */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">{t('about.scope_title')}</h2>
          <p className="text-sm text-[#595959]">{t('about.scope_text')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <GlassCard className="p-6 flex flex-col gap-3 bg-white border border-gray-200">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
              <Box size={20} />
            </div>
            <h3 className="font-bold text-base text-[#1A1A1A]">{t('about.scope_dryvan')}</h3>
            <p className="text-xs text-[#595959] leading-relaxed">{t('about.scope_dryvan_desc')}</p>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col gap-3 bg-white border border-gray-200">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
              <Layers size={20} />
            </div>
            <h3 className="font-bold text-base text-[#1A1A1A]">{t('about.scope_flatbed')}</h3>
            <p className="text-xs text-[#595959] leading-relaxed">{t('about.scope_flatbed_desc')}</p>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col gap-3 bg-white border border-gray-200">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
              <Thermometer size={20} />
            </div>
            <h3 className="font-bold text-base text-[#1A1A1A]">{t('about.scope_reefer')}</h3>
            <p className="text-xs text-[#595959] leading-relaxed">{t('about.scope_reefer_desc')}</p>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col gap-3 bg-white border border-gray-200">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
              <Zap size={20} />
            </div>
            <h3 className="font-bold text-base text-[#1A1A1A]">{t('about.scope_specialized')}</h3>
            <p className="text-xs text-[#595959] leading-relaxed">{t('about.scope_specialized_desc')}</p>
          </GlassCard>

        </div>
      </div>

      {/* 6. Fleet and Assets (100+ US, 200+ Juárez, 1,000+ Network) */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">{t('about.fleet_title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <GlassCard className="p-8 flex flex-col gap-3 bg-white border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 flex items-center justify-center font-black text-xl">
              100+
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A]">{t('about.fleet_us_title')}</h3>
            <p className="text-sm text-[#595959] leading-relaxed">{t('about.fleet_us_desc')}</p>
          </GlassCard>

          <GlassCard className="p-8 flex flex-col gap-3 bg-white border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center justify-center font-black text-xl">
              200+
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A]">{t('about.fleet_mx_title')}</h3>
            <p className="text-sm text-[#595959] leading-relaxed">{t('about.fleet_mx_desc')}</p>
          </GlassCard>

          <GlassCard className="p-8 flex flex-col gap-3 bg-white border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center font-black text-xl">
              1,000+
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A]">{t('about.fleet_net_title')}</h3>
            <p className="text-sm text-[#595959] leading-relaxed">{t('about.fleet_net_desc')}</p>
          </GlassCard>

        </div>
      </div>

    </div>
  );
};
