import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { 
  ShieldCheck, 
  Dog, 
  CheckCircle2, 
  FileCheck, 
  Award 
} from 'lucide-react';

export const Security: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEs = i18n.language === 'es';

  const points11 = (t('security.points_11', { returnObjects: true }) as Array<{title: string; desc: string}>) || [];
  const points19 = (t('security.points', { returnObjects: true }) as string[]) || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col gap-12">
      
      {/* 1. Header */}
      <div className="flex flex-col gap-4 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider w-fit">
          <ShieldCheck size={15} />
          {t('security.badge')}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight uppercase">
          {t('security.title')}{' '}
          <span className="underline decoration-[#1A1A1A]/30 underline-offset-8">{t('security.title_highlight')}</span>
        </h1>
        <p className="text-[#595959] max-w-3xl text-base md:text-lg">
          {t('security.subtitle')}
        </p>
      </div>

      {/* 2. CTPAT / CBP Tiered Certification Banner */}
      <GlassCard className="p-8 md:p-10 bg-white border border-gray-200 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-20 h-20 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
          <Award size={40} />
        </div>
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">
            {t('security.ctpat_intro_title')}
          </h2>
          <p className="text-sm text-[#595959] leading-relaxed max-w-4xl">
            {t('security.ctpat_intro_text')}
          </p>
          <div className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start">
            <span className="px-3 py-1 rounded-lg bg-gray-100 text-[#1A1A1A] font-semibold text-xs border border-gray-200 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-700" />
              CBP CTPAT Certified
            </span>
            <span className="px-3 py-1 rounded-lg bg-gray-100 text-[#1A1A1A] font-semibold text-xs border border-gray-200 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-700" />
              CBP FAST Lane Approved
            </span>
            <span className="px-3 py-1 rounded-lg bg-gray-100 text-[#1A1A1A] font-semibold text-xs border border-gray-200 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-700" />
              ISO 17712 Compliant
            </span>
          </div>
        </div>
      </GlassCard>

      {/* 3. The 11 Core Security Bullets */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">{t('security.points_11_title')}</h2>
          <p className="text-xs text-[#595959] mt-0.5">{isEs ? 'Auditoría integral y cadena de custodia en carretera y aduanas' : 'Comprehensive chain-of-custody verification at every cross-border touchpoint'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points11.map((item, idx) => (
            <GlassCard key={idx} className="p-6 flex flex-col gap-3 bg-white border border-gray-200 hover:border-[#1A1A1A] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  #{idx + 1}
                </span>
                <ShieldCheck size={18} className="text-[#1A1A1A]" />
              </div>
              <h3 className="font-bold text-base text-[#1A1A1A]">{item.title}</h3>
              <p className="text-xs text-[#595959] leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* 4. Visual Verification Badges & K9 Unit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* K9 Canine Card */}
        <GlassCard className="relative overflow-hidden p-8 border border-gray-200 bg-white flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
                <Dog size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">{t('security.k9_title')}</h3>
                <span className="text-xs text-emerald-700 font-semibold">{isEs ? 'Detección en Sitio' : 'On-Site Tactical Screening'}</span>
              </div>
            </div>
            <p className="text-sm text-[#595959] leading-relaxed">
              {t('security.k9')}
            </p>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-3 text-xs text-[#595959]">
            <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
            <span>{isEs ? 'Inspección canina no intrusiva previa al despacho fronterizo' : 'Non-intrusive pre-dispatch tactical canine screening before international departure'}</span>
          </div>
        </GlassCard>

        {/* 17/19-Point Checklist Modal / Card */}
        <GlassCard className="p-8 border border-gray-200 bg-white flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
                <FileCheck size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">{t('security.inspection_title')}</h3>
                <span className="text-xs text-[#595959] font-medium">{t('security.inspection_badge')}</span>
              </div>
            </div>
            <p className="text-sm text-[#595959] leading-relaxed">
              {t('security.inspection_desc')}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#595959] max-h-48 overflow-y-auto pr-2 border-t border-gray-100 pt-3">
              {points19.slice(0, 10).map((pt, i) => (
                <div key={i} className="flex items-center gap-1.5 py-0.5">
                  <CheckCircle2 size={12} className="text-emerald-700 shrink-0" />
                  <span className="truncate">{pt}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-xs text-[#595959] italic border-t border-gray-200 pt-3">
            {isEs ? 'Cumple al 100% con los lineamientos del Manual de Validación CTPAT.' : '100% compliant with CBP CTPAT Validation Standards.'}
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
