import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { CalendarClock, Mail, ArrowRight, ShieldCheck, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BookLoad: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-16 flex flex-col items-center text-center gap-8">
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-300 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider">
        <ShieldCheck size={14} />
        {t('book_load.badge')}
      </div>

      {/* Main Card */}
      <GlassCard className="p-10 sm:p-14 bg-white border border-gray-200 flex flex-col items-center gap-6 shadow-sm max-w-2xl">
        <div className="w-16 h-16 rounded-3xl bg-[#F5F5F5] border border-gray-200 flex items-center justify-center text-[#1A1A1A]">
          <CalendarClock size={32} />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] tracking-tight">
          {t('book_load.title')}
        </h1>

        <p className="text-base text-[#595959] leading-relaxed max-w-lg">
          {t('book_load.desc')}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full justify-center">
          <a
            href="mailto:quotes@warhorsebrokerage.com"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1A1A1A] text-white font-bold text-sm hover:bg-black transition-all w-full sm:w-auto"
          >
            <Mail size={16} />
            {t('book_load.contact_btn')}
            <ArrowRight size={16} />
          </a>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] border border-gray-300 font-bold text-sm hover:bg-gray-200 transition-all w-full sm:w-auto"
          >
            <Home size={16} />
            {t('book_load.back_home')}
          </Link>
        </div>
      </GlassCard>

      <p className="text-xs text-[#595959]">
        Warhorse Logistics Group &bull; Carrier Relations &bull; Santa Teresa, NM &bull; Cd. Juárez, CHIH
      </p>

    </div>
  );
};
