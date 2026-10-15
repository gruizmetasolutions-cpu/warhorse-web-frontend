import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Search, ExternalLink, ShieldCheck, Truck, MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export const TrackLoad: React.FC = () => {
  const { t } = useTranslation();
  const [referenceInput, setReferenceInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [trackedLoads, setTrackedLoads] = useState<Array<{
    reference: string;
    origin: string;
    destination: string;
    status: string;
    driverUnit: string;
    lastPing: string;
    sealNumber: string;
    samsaraUrl: string;
  }> | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const refs = referenceInput
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean);

    if (refs.length === 0) return;

    setIsSearching(true);

    // Simulate Samsara Telemetry Query
    setTimeout(() => {
      const results = refs.map((ref, idx) => ({
        reference: ref.toUpperCase(),
        origin: idx % 2 === 0 ? 'Cd. Juárez, CHIH (Terminal MX)' : 'Monterrey, NL (Hub Norte)',
        destination: idx % 2 === 0 ? 'El Paso, TX (Warhorse Hub US)' : 'Dallas, TX (Distribution Center)',
        status: t('track.status_in_transit'),
        driverUnit: `Tractor #${400 + (idx * 15)} · Dry Van #${800 + (idx * 12)}`,
        lastPing: '2 mins ago · GPS Satellite Lock (Samsara VG54)',
        sealNumber: `ISO-17712-#${884920 + idx}`,
        samsaraUrl: `https://cloud.samsara.com/fleet/viewer?ref=${encodeURIComponent(ref)}`
      }));

      setTrackedLoads(results);
      setIsSearching(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10">
      
      {/* Header (VIEW-A1: Track Your Freight) */}
      <div className="flex flex-col gap-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider w-fit mx-auto sm:mx-0">
          <ShieldCheck size={15} />
          Samsara Fleet Visibility &bull; CTPAT Validated
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] tracking-tight uppercase">
          {t('track.title')}
        </h1>

        <p className="text-base text-[#595959] max-w-2xl leading-relaxed">
          {t('track.desc_before_login')}
          <a
            href="https://cloud.samsara.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#1A1A1A] underline hover:text-black inline-flex items-center gap-1"
          >
            {t('track.login_link')}
            <ExternalLink size={14} />
          </a>
          {t('track.desc_after_login')}
        </p>
      </div>

      {/* Main Search Panel */}
      <GlassCard className="p-8 sm:p-10 bg-white border border-gray-200 flex flex-col gap-6 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
            {t('track.subtitle')}
          </h2>
          <p className="text-xs text-[#595959] mt-1">
            Accepts multiple reference numbers, PRO numbers, or BOL identifiers separated by commas.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              value={referenceInput}
              onChange={(e) => setReferenceInput(e.target.value)}
              placeholder={t('track.input_placeholder')}
              className="w-full bg-[#F5F5F5] border border-gray-300 rounded-xl px-4 py-3.5 pl-11 text-sm text-[#1A1A1A] placeholder-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A]"
              required
            />
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isSearching}
            className="px-8 py-3.5 text-sm shrink-0 font-bold"
          >
            {isSearching ? t('track.tracking') : t('track.track_button')}
          </Button>
        </form>

        {/* Telemetry Results Section */}
        {trackedLoads && (
          <div className="flex flex-col gap-4 pt-6 border-t border-gray-200">
            <h3 className="text-base font-bold text-[#1A1A1A] flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-600" />
              {t('track.results_title')} ({trackedLoads.length})
            </h3>

            <div className="flex flex-col gap-4">
              {trackedLoads.map((load, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#F5F5F5] border border-gray-200 flex flex-col gap-3 transition-all hover:border-gray-400"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#1A1A1A] text-white text-xs font-black rounded-lg">
                        REF: {load.reference}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                        {load.status}
                      </span>
                    </div>

                    <a
                      href={load.samsaraUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1A1A1A] hover:underline"
                    >
                      {t('track.samsara_portal_btn')}
                      <ExternalLink size={13} />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs pt-1">
                    <div>
                      <span className="text-[#595959] font-medium uppercase tracking-wider text-[10px] block">
                        {t('track.origin')}
                      </span>
                      <span className="font-bold text-[#1A1A1A] mt-0.5 block flex items-center gap-1">
                        <MapPin size={13} className="text-[#1A1A1A] shrink-0" /> {load.origin}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#595959] font-medium uppercase tracking-wider text-[10px] block">
                        {t('track.destination')}
                      </span>
                      <span className="font-bold text-[#1A1A1A] mt-0.5 block flex items-center gap-1">
                        <MapPin size={13} className="text-[#1A1A1A] shrink-0" /> {load.destination}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#595959] font-medium uppercase tracking-wider text-[10px] block">
                        {t('track.carrier_network')}
                      </span>
                      <span className="font-bold text-[#1A1A1A] mt-0.5 block flex items-center gap-1">
                        <Truck size={13} className="text-[#1A1A1A] shrink-0" /> {load.driverUnit}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#595959] font-medium uppercase tracking-wider text-[10px] block">
                        {t('track.last_ping')}
                      </span>
                      <span className="font-bold text-[#1A1A1A] mt-0.5 block flex items-center gap-1">
                        <Clock size={13} className="text-[#1A1A1A] shrink-0" /> {load.lastPing}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </GlassCard>

      {/* Support Box */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#595959]">
        <div className="flex items-center gap-3">
          <AlertCircle size={20} className="text-[#1A1A1A] shrink-0" />
          <span>Need specialized API integration or automated EDI 214 shipment status feeds?</span>
        </div>
        <a
          href="mailto:helpdesk@warhorsetransportation.com"
          className="font-bold text-[#1A1A1A] underline shrink-0 hover:text-black"
        >
          Contact Systems Desk
        </a>
      </div>

    </div>
  );
};
