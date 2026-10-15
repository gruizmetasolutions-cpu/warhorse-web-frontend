import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { BookOpen, ShieldCheck, FileText, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Resources: React.FC = () => {
  const { i18n } = useTranslation();
  const isEs = i18n.language === 'es';

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-300 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider w-fit">
          <BookOpen size={15} />
          {isEs ? 'Documentación y Recursos' : 'Documentation & Resources'}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight uppercase">
          {isEs ? 'Recursos Operativos' : 'Resources'}
        </h1>
        <p className="text-base text-[#595959] max-w-3xl">
          {isEs
            ? 'Guías operativas, formatos de cumplimiento CTPAT y accesos para clientes y transportistas.'
            : 'Operational guides, CTPAT compliance documents, and secure portal links for clients and carriers.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 flex flex-col justify-between bg-white border border-gray-200">
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-[#1A1A1A]">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A]">
              {isEs ? 'Seguridad y Cumplimiento CTPAT' : 'CTPAT & Safety Compliance'}
            </h3>
            <p className="text-xs text-[#595959] leading-relaxed">
              {isEs
                ? 'Conoce nuestros protocolos de sellado ISO 17712, inspección de 19 puntos y custodia de carga.'
                : 'Learn about our ISO 17712 sealing protocols, 19-point inspections, and chain-of-custody controls.'}
            </p>
          </div>
          <div className="pt-6">
            <Link
              to="/security"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1A1A1A] hover:underline"
            >
              {isEs ? 'Ver Seguridad' : 'Explore Security'}
              <ArrowRight size={14} />
            </Link>
          </div>
        </GlassCard>

        <GlassCard className="p-6 flex flex-col justify-between bg-white border border-gray-200">
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-[#1A1A1A]">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A]">
              {isEs ? 'Paquete de Transportista' : 'Carrier Setup Packet'}
            </h3>
            <p className="text-xs text-[#595959] leading-relaxed">
              {isEs
                ? 'Documentación necesaria para darte de alta en nuestra red aprobada de transportistas.'
                : 'Standard onboarding requirements, insurance guidelines, and agreement forms for approved carriers.'}
            </p>
          </div>
          <div className="pt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1A1A1A] hover:underline"
            >
              {isEs ? 'Solicitar Paquete' : 'Request Packet'}
              <ArrowRight size={14} />
            </Link>
          </div>
        </GlassCard>

        <GlassCard className="p-6 flex flex-col justify-between bg-white border border-gray-200">
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-[#1A1A1A]">
              <ExternalLink size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A]">
              {isEs ? 'Portal de Rastreo Samsara' : 'Samsara Fleet Visibility'}
            </h3>
            <p className="text-xs text-[#595959] leading-relaxed">
              {isEs
                ? 'Monitoreo telemático y telemetría de activos en tiempo real a través de la plataforma Samsara.'
                : 'Real-time asset telemetry and GPS visibility through the secure Samsara fleet management portal.'}
            </p>
          </div>
          <div className="pt-6">
            <a
              href="https://cloud.samsara.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1A1A1A] hover:underline"
            >
              {isEs ? 'Portal Samsara' : 'Open Samsara'}
              <ExternalLink size={14} />
            </a>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
