import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { ShieldCheck, Lock, UserCheck, Eye, Dog, CheckCircle2, AlertTriangle } from 'lucide-react';

export const Security: React.FC = () => {
  const { t } = useTranslation();
  const [hover19, setHover19] = useState(false);

  const points19 = [
    "Parachoques delantero y parrilla", "Llantas y rines frontales", "Quinta rueda y perno rey",
    "Motor e inspección de fluidos", "Tanques de combustible y sellos", "Cabina y compartimento de conductor",
    "Puertas laterales y seguros", "Chasis y rieles de bastidor", "Tanques de aire y frenos",
    "Piso de la caja secadora", "Paredes laterales interiores", "Puertas traseras y mecanismos de bloqueo",
    "Techo y sellado exterior", "Unidad de refrigeración (Reefer)", "Sistemas GPS e itinerario",
    "Sellos de seguridad ISO 17712", "Inspección inferior de chasis", "Luces y refrenado eléctrico", "Unidad K9 y escaneo biológico"
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-10">
      
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold w-fit">
          <ShieldCheck size={14} /> CTPAT & FMCSA Blindaje Operativo
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white">
          Seguridad & <span className="gold-gradient-text">Cumplimiento Operativo</span>
        </h1>
        <p className="text-gray-400 max-w-3xl">
          Protocolos de alta seguridad diseñados para blindar su carga en cada trayecto transfronterizo.
        </p>
      </div>

      {/* Security Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <GlassCard className="flex flex-col gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
            <Lock size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Infraestructura Blindada</h3>
          <p className="text-sm text-gray-400">
            {t('security.infrastructure')}
          </p>
        </GlassCard>

        <GlassCard className="flex flex-col gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
            <UserCheck size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Capital Humano Verificado</h3>
          <p className="text-sm text-gray-400">
            {t('security.human_capital')}
          </p>
        </GlassCard>

        <GlassCard className="flex flex-col gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
            <Eye size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Monitoreo & Sellos ISO</h3>
          <p className="text-sm text-gray-400">
            {t('security.monitoring')}
          </p>
        </GlassCard>

      </div>

      {/* K9 Unit Card */}
      <GlassCard className="relative overflow-hidden p-8 border-[#C5A059]/30">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 rounded-2xl overflow-hidden h-48 relative border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80" 
              alt="K9 Security Dog" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
              <span className="text-xs font-bold text-[#C5A059] flex items-center gap-1">
                <Dog size={14} /> Unidad Canina K9
              </span>
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white">Diferenciador Técnico: Inspección K9 Especializada</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Para cargas de alto valor y cruces fronterizos de máxima prioridad, Warhorse despliega unidades K9 capacitadas en la detección de narcóticos y contrabando, garantizando el cumplimiento estricto con la CTPAT y la aduana estadounidense.
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
        <GlassCard className={`transition-all duration-500 p-8 ${hover19 ? 'border-[#C5A059] gold-glow' : 'border-white/10'}`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A059] text-black font-black flex items-center justify-center text-lg">
                19
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{t('security.inspection_title')}</h2>
                <p className="text-xs text-gray-400">{t('security.inspection_desc')}</p>
              </div>
            </div>
            <span className="text-xs text-[#C5A059] font-medium hidden sm:block">
              {hover19 ? 'Desglose Activo' : 'Pasa el cursor para ver los 19 puntos'}
            </span>
          </div>

          {hover19 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-4 border-t border-white/10 animate-fade-in">
              {points19.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 text-xs text-gray-200 border border-white/5">
                  <CheckCircle2 size={14} className="text-[#C5A059] shrink-0" />
                  <span>{idx + 1}. {point}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 flex flex-col items-center justify-center gap-2 text-center text-gray-400">
              <AlertTriangle size={24} className="text-[#C5A059] animate-bounce" />
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-300">Pasa el cursor sobre la tarjeta para inspeccionar los 19 puntos de verificación pre-salida</span>
            </div>
          )}
        </GlassCard>
      </div>

    </div>
  );
};
