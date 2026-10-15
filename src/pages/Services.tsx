import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { Layers, Cpu, Wrench, Fuel, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export const Services: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-10">
      
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A]">
          {t('services.title')}{' '}
          <span className="underline decoration-[#1A1A1A]/30 underline-offset-8">{t('services.title_highlight')}</span>
        </h1>
        <p className="text-[#595959] max-w-3xl text-base">
          {t('services.subtitle')}
        </p>
      </div>

      {/* Services Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <GlassCard className="flex flex-col justify-between gap-6 p-8 relative overflow-hidden bg-white border border-gray-200">
          <div className="flex flex-col gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] border border-gray-200 flex items-center justify-center text-[#1A1A1A]">
              <Layers size={24} />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">{t('services.logistics_title')}</h2>
            <p className="text-[#595959] leading-relaxed text-sm">
              {t('services.logistics')}
            </p>
            <ul className="grid grid-cols-2 gap-2 text-xs text-[#595959] pt-2 font-medium">
              <li className="flex items-center gap-1.5">{t('services.ftl_opt')}</li>
              <li className="flex items-center gap-1.5">{t('services.ltl_opt')}</li>
              <li className="flex items-center gap-1.5">{t('services.intermodal_opt')}</li>
              <li className="flex items-center gap-1.5">{t('services.dedicated_opt')}</li>
            </ul>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col justify-between gap-6 p-8 relative overflow-hidden bg-white border border-gray-200">
          <img 
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80" 
            alt="Control Tower Operations" 
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="flex flex-col gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] border border-gray-200 flex items-center justify-center text-[#1A1A1A]">
              <Cpu size={24} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#595959]">{t('services.management_badge')}</span>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">{t('services.management_title')}</h2>
            <p className="text-[#595959] leading-relaxed text-sm">
              {t('services.management')}
            </p>
          </div>
        </GlassCard>

      </div>

      {/* Support & Tech Panel */}
      <GlassCard className="p-8 flex flex-col gap-6 bg-white border border-gray-200">
        <h2 className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
          <Wrench className="text-[#1A1A1A]" size={22} />
          {t('services.panel_title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#F5F5F5] border border-gray-200">
            <Clock className="text-[#1A1A1A]" size={20} />
            <h3 className="font-bold text-sm text-[#1A1A1A]">{t('services.support_247_title')}</h3>
            <p className="text-xs text-[#595959]">{t('services.support_247_desc')}</p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#F5F5F5] border border-gray-200">
            <Fuel className="text-[#1A1A1A]" size={20} />
            <h3 className="font-bold text-sm text-[#1A1A1A]">{t('services.fuel_title')}</h3>
            <p className="text-xs text-[#595959]">{t('services.fuel_desc')}</p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#F5F5F5] border border-gray-200">
            <Wrench className="text-[#1A1A1A]" size={20} />
            <h3 className="font-bold text-sm text-[#1A1A1A]">{t('services.dot_title')}</h3>
            <p className="text-xs text-[#595959]">{t('services.dot_desc')}</p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Link to="/contact">
            <Button variant="primary">
              {t('services.cta_button')}
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </GlassCard>

    </div>
  );
};
