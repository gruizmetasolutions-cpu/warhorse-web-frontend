import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { 
  Truck, 
  Layers, 
  Users, 
  Building, 
  Warehouse, 
  Radio, 
  ShieldAlert, 
  Thermometer, 
  Flame, 
  FileCheck, 
  ShieldCheck, 
  Compass, 
  Clock, 
  Fuel, 
  Wrench, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Services: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEs = i18n.language === 'es';

  const logisticsIcons = [
    Truck,       // Cross-border drayage
    Layers,      // Long-haul FTL
    Users,       // Expedited team
    Building,    // Dedicated fleet
    Warehouse,   // Yard management
    Warehouse,   // Warehouse transload
    Radio        // Samsara GPS
  ];

  const specializedIcons = [
    ShieldAlert, // Heavy haul
    Layers,      // Flatbed step deck
    Thermometer, // Reefer
    Flame,       // Hazmat
    FileCheck,   // In-bond
    ShieldCheck, // High-value
    Compass      // Custom logistics engineering
  ];

  const logisticsList = (t('services.logistics_7', { returnObjects: true }) as Array<{title: string; desc: string}>) || [];
  const specializedList = (t('services.specialized_7', { returnObjects: true }) as Array<{title: string; desc: string}>) || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col gap-12">
      
      {/* Header */}
      <div className="flex flex-col gap-4 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-300 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider w-fit">
          <Layers size={15} />
          {t('services.logistics_title_main')}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight uppercase">
          {t('services.logistics_title_main')}
        </h1>
        <p className="text-[#595959] max-w-3xl text-base md:text-lg">
          {t('services.logistics_subtitle_main')}
        </p>
      </div>

      {/* Featured Fleet Showcase: Unit WH192 + 53ft Dry Van (TKT-WEB-025) */}
      <div className="relative rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-md">
        <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full overflow-hidden bg-gray-900">
          <img 
            src="/images/warhorse-services-unit-wh192-53ft.jpg" 
            alt="Warhorse Transportation Unit WH192 + 53ft Trailer T103" 
            className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 text-white">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider text-white">
                <Truck size={14} />
                {isEs ? 'Flota Propia Activa' : 'Active Company Fleet'}
              </div>
              <h3 className="text-lg sm:text-2xl font-black mt-2 text-white">
                {isEs ? 'Tractocamión WH192 · Remolque 53ft Seco T103' : 'Heavy Power Unit WH192 · 53ft Dry Van Trailer T103'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 max-w-xl">
                {isEs 
                  ? 'Equipo de arrastre de última generación con rastreo satelital Samsara en tiempo real, doble seguro binacional y operador certificado CTPAT.' 
                  : 'Late-model heavy tractor paired with 53ft dry van equipped with Samsara real-time GPS, dual binational insurance, and CTPAT-certified drivers.'}
              </p>
            </div>
            <Link to="/quote">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs py-2 px-4 shadow-lg shrink-0">
                {t('services.cta_quote')}
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 1. 7 Logistics Services */}
      <div className="flex flex-col gap-6">
        <div className="border-b border-gray-200 pb-3 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">{t('services.logistics_title_main')}</h2>
            <p className="text-xs text-[#595959] mt-0.5">{isEs ? '7 Soluciones de Línea y Transferencia Fronteriza' : '7 Core Freight & Cross-Border Drayage Solutions'}</p>
          </div>
          <Link to="/quote">
            <Button variant="outline" className="text-xs font-bold py-1.5 px-3">
              {t('services.cta_quote')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logisticsList.map((srv, idx) => {
            const Icon = logisticsIcons[idx % logisticsIcons.length];
            return (
              <GlassCard key={idx} className="p-6 flex flex-col gap-3 bg-white border border-gray-200 hover:border-[#1A1A1A] transition-all">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-base text-[#1A1A1A]">{srv.title}</h3>
                <p className="text-xs text-[#595959] leading-relaxed">{srv.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* 2. 7 Specialized Services */}
      <div className="flex flex-col gap-6">
        <div className="border-b border-gray-200 pb-3 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">{t('services.specialized_title_main')}</h2>
            <p className="text-xs text-[#595959] mt-0.5">{isEs ? '7 Capacidades Especializadas de Carga Crítica' : '7 Engineered Configurations for Critical Cargo'}</p>
          </div>
          <Link to="/quote">
            <Button variant="outline" className="text-xs font-bold py-1.5 px-3">
              {t('services.cta_quote')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializedList.map((srv, idx) => {
            const Icon = specializedIcons[idx % specializedIcons.length];
            return (
              <GlassCard key={idx} className="p-6 flex flex-col gap-3 bg-white border border-gray-200 hover:border-[#1A1A1A] transition-all">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-base text-[#1A1A1A]">{srv.title}</h3>
                <p className="text-xs text-[#595959] leading-relaxed">{srv.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* 3. Support & Tech Hub */}
      <GlassCard className="p-8 flex flex-col gap-6 bg-white border border-gray-200">
        <h2 className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
          <Wrench className="text-[#1A1A1A]" size={22} />
          {t('services.panel_title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2 p-5 rounded-2xl bg-[#F5F5F5] border border-gray-200">
            <Clock className="text-[#1A1A1A]" size={22} />
            <h3 className="font-bold text-sm text-[#1A1A1A]">{t('services.support_247_title')}</h3>
            <p className="text-xs text-[#595959] leading-relaxed">{t('services.support_247_desc')}</p>
          </div>
          <div className="flex flex-col gap-2 p-5 rounded-2xl bg-[#F5F5F5] border border-gray-200">
            <Fuel className="text-[#1A1A1A]" size={22} />
            <h3 className="font-bold text-sm text-[#1A1A1A]">{t('services.fuel_title')}</h3>
            <p className="text-xs text-[#595959] leading-relaxed">{t('services.fuel_desc')}</p>
          </div>
          <div className="flex flex-col gap-2 p-5 rounded-2xl bg-[#F5F5F5] border border-gray-200">
            <Wrench className="text-[#1A1A1A]" size={22} />
            <h3 className="font-bold text-sm text-[#1A1A1A]">{t('services.dot_title')}</h3>
            <p className="text-xs text-[#595959] leading-relaxed">{t('services.dot_desc')}</p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200">
          <p className="text-xs text-[#595959]">
            {isEs 
              ? '¿Requieres una solución logística dedicada o asesoría técnica para tu cruce fronterizo?' 
              : 'Need dedicated logistics engineering or custom advice for your international cargo flow?'}
          </p>
          <Link to="/contact">
            <Button className="w-full sm:w-auto text-xs font-bold py-2.5 px-6 bg-[#1A1A1A] text-white hover:bg-black">
              {t('services.cta_contact')}
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </GlassCard>

    </div>
  );
};
