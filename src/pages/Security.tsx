import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { ShieldCheck, Lock, UserCheck, Eye, Dog, CheckCircle2, AlertTriangle } from 'lucide-react';

export const Security: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [hover19, setHover19] = useState(false);

  const points19 = (t('security.points', { returnObjects: true }) as string[]) || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-10">
      
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold w-fit">
          <ShieldCheck size={14} /> {t('security.badge')}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A]">
          {t('security.title')}{' '}
          <span className="underline decoration-[#1A1A1A]/30 underline-offset-8">{t('security.title_highlight')}</span>
        </h1>
        <p className="text-[#595959] max-w-3xl text-base">
          {t('security.subtitle')}
        </p>
      </div>

      {/* Security Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <GlassCard className="flex flex-col gap-4 bg-white border border-gray-200">
          <div className="w-10 h-10 rounded-xl bg-[#F5F5F5] border border-gray-200 flex items-center justify-center text-[#1A1A1A]">
            <Lock size={20} />
          </div>
          <h3 className="text-lg font-bold text-[#1A1A1A]">{t('security.infra_title')}</h3>
          <p className="text-sm text-[#595959]">
            {t('security.infrastructure')}
          </p>
        </GlassCard>

        <GlassCard className="flex flex-col gap-4 bg-white border border-gray-200">
          <div className="w-10 h-10 rounded-xl bg-[#F5F5F5] border border-gray-200 flex items-center justify-center text-[#1A1A1A]">
            <UserCheck size={20} />
          </div>
          <h3 className="text-lg font-bold text-[#1A1A1A]">{t('security.human_title')}</h3>
          <p className="text-sm text-[#595959]">
            {t('security.human_capital')}
          </p>
        </GlassCard>

        <GlassCard className="flex flex-col gap-4 bg-white border border-gray-200">
          <div className="w-10 h-10 rounded-xl bg-[#F5F5F5] border border-gray-200 flex items-center justify-center text-[#1A1A1A]">
            <Eye size={20} />
          </div>
          <h3 className="text-lg font-bold text-[#1A1A1A]">{t('security.monitoring_title')}</h3>
          <p className="text-sm text-[#595959]">
            {t('security.monitoring')}
          </p>
        </GlassCard>

      </div>

      {/* K9 Unit Card */}
      <GlassCard className="relative overflow-hidden p-8 border border-gray-200 bg-white">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 rounded-2xl overflow-hidden h-48 relative border border-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80" 
              alt="K9 Security Dog" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
              <span className="text-xs font-bold text-white flex items-center gap-1">
                <Dog size={14} /> {t('security.k9_title')}
              </span>
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">{t('security.k9_title')}</h2>
            <p className="text-sm text-[#595959] leading-relaxed">
              {t('security.k9')}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Interactive 19-Point Inspection Bento Card */}
      <div 
        className="w-full"
        onMouseEnter={() => setHover19(true)}
        onMouseLeave={() => setHover19(false)}
      >
        <GlassCard className={`transition-all duration-300 p-8 bg-white ${hover19 ? 'border-[#1A1A1A] shadow-md' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] text-white font-black flex items-center justify-center text-lg">
                19
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1A1A1A]">{t('security.inspection_title')}</h2>
                <p className="text-xs text-[#595959]">{t('security.inspection_desc')}</p>
              </div>
            </div>
            <span className="text-xs text-[#1A1A1A] font-semibold hidden sm:block">
              {hover19 
                ? (i18n.language === 'es' ? 'Desglose Activo' : 'Active Breakdown') 
                : (i18n.language === 'es' ? 'Pasa el cursor para ver los 19 puntos' : 'Hover to inspect 19 points')}
            </span>
          </div>

          {hover19 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-4 border-t border-gray-200 animate-fade-in">
              {points19.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F5F5F5] text-xs text-[#1A1A1A] border border-gray-200 font-medium">
                  <CheckCircle2 size={14} className="text-[#1A1A1A] shrink-0" />
                  <span>{idx + 1}. {point}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 flex flex-col items-center justify-center gap-2 text-center text-[#595959]">
              <AlertTriangle size={24} className="text-[#1A1A1A] animate-bounce" />
              <span className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A]">
                {i18n.language === 'es' 
                  ? 'Pasa el cursor sobre la tarjeta para inspeccionar los 19 puntos de verificación pre-salida' 
                  : 'Hover over card to inspect all 19 CTPAT pre-departure verification checkpoints'}
              </span>
            </div>
          )}
        </GlassCard>
      </div>

    </div>
  );
};
