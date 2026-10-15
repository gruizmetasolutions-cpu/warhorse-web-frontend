import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { Briefcase, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ApplyToday: React.FC = () => {
  const { i18n } = useTranslation();
  const isEs = i18n.language === 'es';

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-300 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider w-fit">
          <Briefcase size={15} />
          {isEs ? 'Oportunidades de Carrera y Transportistas' : 'Career & Carrier Opportunities'}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight uppercase">
          {isEs ? 'Aplica Hoy' : 'Apply Today'}
        </h1>
        <p className="text-base text-[#595959] max-w-3xl">
          {isEs
            ? 'Únete a la red líder en logística transfronteriza entre Estados Unidos, México y Canadá. Descubre cómo colaborar como conductor o transportista asociado.'
            : 'Join the premier cross-border logistics network across the United States, Mexico, and Canada. Explore opportunities for professional drivers and certified partner carriers.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="p-8 flex flex-col justify-between bg-white border border-gray-200">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-[#1A1A1A]">
              <Truck size={24} />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">
              {isEs ? 'Conductores Profesionales' : 'Company Drivers & Operators'}
            </h2>
            <p className="text-sm text-[#595959] leading-relaxed">
              {isEs
                ? 'Ofrecemos equipo moderno, mantenimiento certificado DOT, rutas seguras y esquemas de compensación competitivos.'
                : 'Offering modern equipment, DOT-certified maintenance, secure routes, and competitive compensation packages.'}
            </p>
            <ul className="flex flex-col gap-2 pt-2 text-xs text-[#595959]">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#1A1A1A]" />
                {isEs ? 'Licencia comercial vigente (CDL / Licencia Federal)' : 'Valid CDL / Federal Commercial License'}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#1A1A1A]" />
                {isEs ? 'Certificación de antecedentes y antidoping' : 'Clean background check & drug screening'}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#1A1A1A]" />
                {isEs ? 'Asignación de unidades de modelo reciente' : 'Late-model tractor assignments'}
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A1A1A] text-white font-semibold text-sm hover:bg-black transition-all"
            >
              {isEs ? 'Iniciar Solicitud' : 'Start Application'}
              <ArrowRight size={16} />
            </Link>
          </div>
        </GlassCard>

        <GlassCard className="p-8 flex flex-col justify-between bg-white border border-gray-200">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-[#1A1A1A]">
              <Briefcase size={24} />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">
              {isEs ? 'Red de Transportistas Asociados' : 'Partner Carrier Network'}
            </h2>
            <p className="text-sm text-[#595959] leading-relaxed">
              {isEs
                ? 'Conéctate con nuestra red transfronteriza y accede a cargas continuas con pagos rápidos y respaldo operativo 24/7.'
                : 'Connect with our cross-border freight network for consistent load volume, fast-pay options, and 24/7 operational dispatch.'}
            </p>
            <ul className="flex flex-col gap-2 pt-2 text-xs text-[#595959]">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#1A1A1A]" />
                {isEs ? 'Autoridad activa FMCSA / SCT' : 'Active FMCSA / SCT operating authority'}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#1A1A1A]" />
                {isEs ? 'Certificación CTPAT preferente' : 'CTPAT certification preferred'}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#1A1A1A]" />
                {isEs ? 'Póliza de seguro vigente' : 'Active cargo & auto liability insurance'}
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A1A1A] text-white font-semibold text-sm hover:bg-black transition-all"
            >
              {isEs ? 'Registrarse como Carrier' : 'Register as Carrier'}
              <ArrowRight size={16} />
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
