import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { Building2, ShieldCheck, MapPin, Truck } from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-10">
      
      <div className="flex flex-col gap-3 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-black text-white">
          Nuestra <span className="gold-gradient-text">Estructura Corporativa</span>
        </h1>
        <p className="text-gray-400 max-w-3xl">
          Respaldo integral que combina tecnología, coordinación estratégica y flotas propias en Estados Unidos y México.
        </p>
      </div>

      {/* Map visual card */}
      <GlassCard className="relative overflow-hidden min-h-[300px] flex flex-col justify-end p-8 border-[#C5A059]/30">
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80" 
          alt="North America Logistics Map" 
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1B] via-[#1A1A1B]/80 to-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">Alcance Geográfico Trinacional</span>
            <h2 className="text-2xl font-bold text-white">Red Interconectada: EE. UU. · México · Canadá</h2>
            <p className="text-sm text-gray-300 mt-1 max-w-xl">
              Capacidad elástica para gestionar más de 1,000 unidades en operaciones extendidas transfronterizas sin interrupciones.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-[#C5A059]/10 border border-[#C5A059]/30 px-4 py-2 rounded-xl text-[#C5A059] text-sm font-semibold">
            <Truck size={20} />
            1,000+ Unidades Capacitadas
          </div>
        </div>
      </GlassCard>

      {/* 3 Entities Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <GlassCard className="flex flex-col justify-between gap-6 hover:border-[#C5A059]/50 transition-all">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
              <Building2 size={24} />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-[#C5A059]">U.S. Control Tower</span>
              <h3 className="text-xl font-bold text-white">{t('about.brokerage_title')}</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t('about.brokerage_desc')}
            </p>
          </div>
          <div className="text-xs font-semibold text-gray-500 border-t border-white/5 pt-4">
            Eje del Modelo 5PL & Control Tower
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col justify-between gap-6 hover:border-[#C5A059]/50 transition-all">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
              <Truck size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#C5A059]">
                <MapPin size={12} /> El Paso, TX
              </div>
              <h3 className="text-xl font-bold text-white">{t('about.transportation_title')}</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t('about.transportation_desc')}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 border-t border-white/5 pt-4">
            <ShieldCheck size={16} className="text-[#C5A059]" />
            Certificado FMCSA (U.S. Carrier)
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col justify-between gap-6 hover:border-[#C5A059]/50 transition-all">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#C5A059]">
                <MapPin size={12} /> Cd. Juárez, CHIH
              </div>
              <h3 className="text-xl font-bold text-white">{t('about.logistics_title')}</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t('about.logistics_desc')}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 border-t border-white/5 pt-4">
            <ShieldCheck size={16} className="text-[#C5A059]" />
            Certificado CTPAT & Patio Propio
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
