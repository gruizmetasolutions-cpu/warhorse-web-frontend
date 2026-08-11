import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Truck, Network, Globe, Clock, Users, Eye, ArrowRight, ShieldCheck } from 'lucide-react';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  const kpis = [
    { label: t('home.kpi_assets'), value: '850+', icon: Truck, desc: 'Owned fleet direct control' },
    { label: t('home.kpi_carriers'), value: '500,000+', icon: Network, desc: 'Massive certified network' },
    { label: t('home.kpi_countries'), value: '3 Países', icon: Globe, desc: 'US · MX · CA connected' },
    { label: t('home.kpi_ontime'), value: '98%+', icon: Clock, desc: 'Reliable execution rate' },
    { label: t('home.kpi_clients'), value: '100+', icon: Users, desc: 'Fortune 500 & Enterprise' },
    { label: t('home.kpi_visibility'), value: '24/7', icon: Eye, desc: 'Real-time GPS tracking' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-12">
      
      {/* Hero Section with Background Image */}
      <section className="relative rounded-3xl overflow-hidden min-h-[60vh] flex flex-col justify-end p-8 md:p-12 border border-white/10 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920&q=80" 
            alt="Warhorse Black Kenworth Truck" 
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] via-[#0f0f10]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-6 py-6">
          
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <ShieldCheck size={16} />
            Cross-Border Logistics Excellence · US · MX · CA
          </div>

          {/* PROTAGONIST LOGO */}
          <div className="relative group my-1">
            <div className="absolute inset-0 bg-[#C5A059]/20 blur-3xl rounded-full scale-125 pointer-events-none" />
            <img 
              src="/logo.png" 
              alt="Warhorse Logistics Group" 
              className="relative h-28 sm:h-36 md:h-44 lg:h-52 w-auto object-contain brightness-0 invert drop-shadow-[0_0_35px_rgba(197,160,89,0.7)] hover:scale-105 transition-all duration-500"
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            WARHORSE <span className="gold-gradient-text">LOGISTICS GROUP</span>
          </h1>

          <div className="flex flex-col gap-2 max-w-2xl">
            <p className="text-xl md:text-2xl text-[#C5A059] font-semibold italic">
              "{t('home.hero_slogan')}"
            </p>
            <p className="text-base md:text-lg text-gray-200 font-bold">
              {t('home.hero_value')}
            </p>
            <p className="text-xs md:text-sm text-gray-400 font-normal leading-relaxed pt-1">
              {t('home.hero_desc')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/contact">
              <Button variant="primary" className="text-base px-8 py-3.5">
                {t('nav.quote')}
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="text-base px-8 py-3.5">
                {t('nav.about')}
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* KPI Bento Grid */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">Infraestructura & Capacidad Operativa</h2>
          <p className="text-gray-400 text-sm">Métricas en tiempo real respaldadas por flotas propias y red transfronteriza.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <GlassCard key={idx} className="flex flex-col justify-between min-h-[180px] p-6 group hover:scale-[1.02] transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-black transition-colors shrink-0">
                    <Icon size={24} />
                  </div>
                  <span className="text-3xl font-black text-white group-hover:text-[#C5A059] transition-colors">{kpi.value}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 leading-snug">{kpi.label}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{kpi.desc}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

    </div>
  );
};
