import React from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicQuoteForm } from '../components/forms/DynamicQuoteForm';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuotePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12 flex flex-col gap-10">
      
      {/* Header */}
      <div className="flex flex-col gap-3 text-center sm:text-left">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#595959] hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gray-100 border border-gray-300 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={14} />
            Direct Carrier & Brokerage Routing
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] tracking-tight uppercase">
          {t('quote_page.title')}
        </h1>
        <p className="text-base text-[#595959] max-w-3xl">
          {t('quote_page.subtitle')}
        </p>
      </div>

      {/* Embedded Dynamic Form Component */}
      <DynamicQuoteForm />

      <p className="text-center text-xs text-[#595959] pt-2">
        Warhorse Brokerage LLC &bull; Warhorse Transportation LLC &bull; Warhorse Logistics de México
      </p>

    </div>
  );
};
