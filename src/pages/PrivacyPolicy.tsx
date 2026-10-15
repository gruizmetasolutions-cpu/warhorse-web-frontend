import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { ShieldCheck, Lock, FileText } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const { i18n } = useTranslation();
  const isEs = i18n.language === 'es';

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-300 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider w-fit">
          <Lock size={15} />
          {isEs ? 'Protección de Datos Personales' : 'Data Privacy & Protection'}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight uppercase">
          {isEs ? 'Aviso de Privacidad' : 'Privacy Notice'}
        </h1>
        <p className="text-sm text-[#595959]">
          {isEs ? 'Última actualización: Enero 2026' : 'Last updated: January 2026'}
        </p>
      </div>

      <GlassCard className="p-8 md:p-10 bg-white border border-gray-200 flex flex-col gap-6 text-sm text-[#1A1A1A] leading-relaxed">
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-bold flex items-center gap-2 text-[#1A1A1A]">
            <ShieldCheck size={18} />
            {isEs ? '1. Identidad y Domicilio del Responsable' : '1. Data Controller Identity'}
          </h2>
          <p className="text-[#595959]">
            {isEs
              ? 'Warhorse Logistics Group (Warhorse Brokerage LLC / Warhorse Transportation LLC / Warhorse Logistics de México), con domicilio fiscal y operativo en El Paso, TX y Cd. Juárez, Chihuahua, es responsable del tratamiento y resguardo de sus datos personales recolectados a través de este portal.'
              : 'Warhorse Logistics Group (Warhorse Brokerage LLC / Warhorse Transportation LLC / Warhorse Logistics de México), headquartered in El Paso, TX and Cd. Juárez, Chihuahua, is the responsible entity for processing and safeguarding personal information collected through this website.'}
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-bold flex items-center gap-2 text-[#1A1A1A]">
            <FileText size={18} />
            {isEs ? '2. Finalidades del Tratamiento' : '2. Purpose of Data Processing'}
          </h2>
          <p className="text-[#595959]">
            {isEs
              ? 'Los datos personales y de contacto recolectados (nombre, correo electrónico, teléfono, empresa y especificaciones de carga) se utilizarán exclusivamente para: (a) procesar cotizaciones de flete y logística transfronteriza, (b) coordinar la prestación de servicios de transporte, (c) validar cumplimiento CTPAT / DOT / FMCSA, y (d) responder solicitudes de información comercial.'
              : 'Contact and identification data collected (name, email, phone number, company, and cargo details) are used strictly to: (a) generate freight and cross-border logistics quotes, (b) coordinate freight execution, (c) verify CTPAT / DOT / FMCSA regulatory compliance, and (d) respond to commercial inquiries.'}
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-bold flex items-center gap-2 text-[#1A1A1A]">
            <Lock size={18} />
            {isEs ? '3. Medidas de Seguridad y Derechos ARCO' : '3. Security Measures & Rights'}
          </h2>
          <p className="text-[#595959]">
            {isEs
              ? 'Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales contra daño, pérdida, alteración o tratamiento no autorizado. Usted puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición contactando a nuestro oficial de cumplimiento en:'
              : 'We implement administrative, technical, and physical safeguards to prevent data loss, misuse, or unauthorized access. You may exercise your privacy and data access rights by contacting our compliance officer at:'}
          </p>
          <a
            href="mailto:safetyandcompliance@warhorsebrokerage.com"
            className="font-semibold text-[#1A1A1A] underline"
          >
            safetyandcompliance@warhorsebrokerage.com
          </a>
        </section>
      </GlassCard>
    </div>
  );
};
