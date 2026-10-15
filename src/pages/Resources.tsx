import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  Cpu, 
  Truck, 
  Database, 
  History, 
  Clock, 
  Lock 
} from 'lucide-react';

export const Resources: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEs = i18n.language === 'es';

  const livePortals = [
    {
      title: t('resources_page.portal_admin_title'),
      desc: t('resources_page.portal_admin_desc'),
      url: 'https://warhorse.dataholics.com.mx/',
      icon: Cpu,
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      title: t('resources_page.portal_driver_title'),
      desc: t('resources_page.portal_driver_desc'),
      url: 'https://warhorse.dataholics.com.mx/',
      icon: Truck,
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      title: t('resources_page.portal_samsara_title'),
      desc: t('resources_page.portal_samsara_desc'),
      url: 'https://cloud.samsara.com/',
      icon: ShieldCheck,
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200'
    },
    {
      title: t('resources_page.portal_genesis_title'),
      desc: t('resources_page.portal_genesis_desc'),
      url: 'https://warhorse.genesis-tms.com/login',
      icon: Database,
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200'
    },
    {
      title: t('resources_page.portal_strategy_title'),
      desc: t('resources_page.portal_strategy_desc'),
      url: 'https://test.strategylive.net/',
      icon: History,
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    }
  ];

  const comingSoonPortals = [
    {
      title: t('resources_page.portal_transp_hub_title'),
      desc: t('resources_page.portal_transp_hub_desc'),
      icon: Truck
    },
    {
      title: t('resources_page.portal_clockin_title'),
      desc: t('resources_page.portal_clockin_desc'),
      icon: Clock
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col gap-12">
      
      {/* Header */}
      <div className="flex flex-col gap-4 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-300 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider w-fit">
          <BookOpen size={15} />
          {t('nav.resources')}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight uppercase">
          {isEs ? 'Portal de Recursos y Sistemas' : 'Operations & System Resources'}
        </h1>
        <p className="text-[#595959] max-w-3xl text-base md:text-lg">
          {isEs 
            ? 'Accesos directos autorizados a las plataformas telemáticas, sistemas de gestión de transporte (TMS) y portales operativos de Warhorse.'
            : 'Authorized direct gateways to Warhorse enterprise telematics, TMS platforms, and secure partner portals.'}
        </p>
      </div>

      {/* 1. Live Operating Systems (5 Portals) */}
      <div className="flex flex-col gap-6">
        <div className="border-b border-gray-200 pb-3">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">
            {isEs ? 'Sistemas Operativos Activos' : 'Live Enterprise Systems'}
          </h2>
          <p className="text-xs text-[#595959] mt-0.5">
            {isEs ? 'Portales en línea con acceso seguro y cifrado' : 'Production platforms with SSL authenticated single sign-on'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {livePortals.map((portal, idx) => {
            const Icon = portal.icon;
            return (
              <GlassCard key={idx} className="p-6 flex flex-col justify-between gap-6 bg-white border border-gray-200 hover:border-[#1A1A1A] transition-all shadow-sm">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
                      <Icon size={20} />
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${portal.badgeColor}`}>
                      {t('resources_page.live_badge')}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-[#1A1A1A]">{portal.title}</h3>
                  <p className="text-xs text-[#595959] leading-relaxed">{portal.desc}</p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full p-2.5 rounded-xl bg-[#F5F5F5] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white transition-all text-xs font-bold group"
                  >
                    <span>{t('resources_page.open_portal')}</span>
                    <ExternalLink size={14} className="text-gray-400 group-hover:text-white" />
                  </a>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* 2. Systems Under Development (Coming Soon) */}
      <div className="flex flex-col gap-6">
        <div className="border-b border-gray-200 pb-3">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">
            {isEs ? 'Próximos Portales en Desarrollo' : 'Next-Generation Portals'}
          </h2>
          <p className="text-xs text-[#595959] mt-0.5">
            {isEs ? 'Módulos en fase de integración técnica para despliegue inminente' : 'Modules in active development for scheduled future rollout'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comingSoonPortals.map((portal, idx) => {
            const Icon = portal.icon;
            return (
              <GlassCard key={idx} className="p-6 flex flex-col justify-between gap-6 bg-gray-50/70 border border-dashed border-gray-300 opacity-80 cursor-not-allowed">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-600 border border-gray-300">
                      {t('resources_page.coming_soon_badge')}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-700">{portal.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{portal.desc}</p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between w-full p-2.5 rounded-xl bg-gray-200/50 text-gray-400 text-xs font-semibold select-none">
                    <span className="flex items-center gap-1.5">
                      <Lock size={13} />
                      {t('resources_page.disabled_notice')}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider">Coming soon</span>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

    </div>
  );
};
