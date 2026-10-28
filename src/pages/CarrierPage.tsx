import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { 
  Truck, 
  Fuel, 
  Zap, 
  Calendar, 
  MapPin, 
  Headphones, 
  CheckCircle2, 
  FileText, 
  ShieldCheck 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CarrierPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEs = i18n.language === 'es';

  const [formData, setFormData] = useState({
    usdot_or_sct: '',
    carrier_name: '',
    state_province: '',
    contact_name: '',
    email: '',
    phone: '',
    notes: '',
    privacyAgreed: false,
    hp_field: '' // Honeypot antispam
  });

  const [errors, setErrors] = useState<{
    usdot_or_sct?: string;
    carrier_name?: string;
    state_province?: string;
    contact_name?: string;
    email?: string;
    phone?: string;
    privacy?: string;
  }>({});

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  const validatePhone = (val: string) => val.replace(/\D/g, '').length >= 10;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData(prev => ({ ...prev, privacyAgreed: checked }));
    if (checked && errors.privacy) {
      setErrors(prev => ({ ...prev, privacy: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.hp_field) {
      setStatus('success');
      return;
    }

    const newErrors: typeof errors = {};
    if (!formData.usdot_or_sct.trim()) newErrors.usdot_or_sct = t('carrier_page.validation_required');
    if (!formData.carrier_name.trim()) newErrors.carrier_name = t('carrier_page.validation_required');
    if (!formData.state_province.trim()) newErrors.state_province = t('carrier_page.validation_required');
    if (!formData.contact_name.trim()) newErrors.contact_name = t('carrier_page.validation_required');
    if (!formData.email.trim()) {
      newErrors.email = t('carrier_page.validation_required');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('carrier_page.validation_email');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('carrier_page.validation_required');
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t('carrier_page.validation_phone');
    }
    if (!formData.privacyAgreed) {
      newErrors.privacy = isEs ? 'Debes aceptar los términos de privacidad.' : 'You must accept the privacy terms.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/carrier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.status === 'ok') {
        try {
          const existing = JSON.parse(localStorage.getItem('warhorse_carrier_packets_backup') || '[]');
          existing.push({
            ...formData,
            folio: data?.folio,
            submitted_at: new Date().toISOString(),
            routed_to: 'Dispatch@WarhorseTransportation.com'
          });
          localStorage.setItem('warhorse_carrier_packets_backup', JSON.stringify(existing));
        } catch (err) {
          console.error('LocalStorage backup error:', err);
        }
        setStatus('success');
      } else {
        throw new Error(data?.message || 'Carrier registration failed');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col gap-12">
      
      {/* Top Hero Section */}
      <div className="flex flex-col gap-4 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-300 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider w-fit">
          <Truck size={15} />
          {t('carrier_page.badge')}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight uppercase">
          {t('carrier_page.title')}
        </h1>
        <p className="text-[#595959] max-w-3xl text-base md:text-lg">
          {t('carrier_page.subtitle')}
        </p>
      </div>

      {/* Value Proposition: Why Haul with Warhorse (5 Bullets) */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">
            {t('carrier_page.why_haul_title')}
          </h2>
          <p className="text-sm text-[#595959]">
            {t('carrier_page.packet_block_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <GlassCard className="p-5 flex flex-col gap-3 bg-white border border-gray-200">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
              <Fuel size={20} />
            </div>
            <h3 className="font-bold text-sm text-[#1A1A1A]">{t('carrier_page.bullet_1_title')}</h3>
            <p className="text-xs text-[#595959] leading-relaxed">{t('carrier_page.bullet_1_desc')}</p>
          </GlassCard>

          <GlassCard className="p-5 flex flex-col gap-3 bg-white border border-gray-200">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
              <Zap size={20} />
            </div>
            <h3 className="font-bold text-sm text-[#1A1A1A]">{t('carrier_page.bullet_2_title')}</h3>
            <p className="text-xs text-[#595959] leading-relaxed">{t('carrier_page.bullet_2_desc')}</p>
          </GlassCard>

          <GlassCard className="p-5 flex flex-col gap-3 bg-white border border-gray-200">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
              <Calendar size={20} />
            </div>
            <h3 className="font-bold text-sm text-[#1A1A1A]">{t('carrier_page.bullet_3_title')}</h3>
            <p className="text-xs text-[#595959] leading-relaxed">{t('carrier_page.bullet_3_desc')}</p>
          </GlassCard>

          <GlassCard className="p-5 flex flex-col gap-3 bg-white border border-gray-200">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
              <MapPin size={20} />
            </div>
            <h3 className="font-bold text-sm text-[#1A1A1A]">{t('carrier_page.bullet_4_title')}</h3>
            <p className="text-xs text-[#595959] leading-relaxed">{t('carrier_page.bullet_4_desc')}</p>
          </GlassCard>

          <GlassCard className="p-5 flex flex-col gap-3 bg-white border border-gray-200">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-[#1A1A1A]">
              <Headphones size={20} />
            </div>
            <h3 className="font-bold text-sm text-[#1A1A1A]">{t('carrier_page.bullet_5_title')}</h3>
            <p className="text-xs text-[#595959] leading-relaxed">{t('carrier_page.bullet_5_desc')}</p>
          </GlassCard>

        </div>
      </div>

      {/* Carrier Packet Application Form */}
      <GlassCard className="p-8 md:p-10 bg-white border border-gray-200 shadow-sm max-w-4xl mx-auto w-full">
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">{t('carrier_page.success_title')}</h3>
            <p className="text-sm text-[#595959] max-w-lg leading-relaxed">
              {t('carrier_page.success_desc')}
            </p>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#595959] flex items-center gap-2">
              <FileText size={16} className="text-[#1A1A1A]" />
              <span>{isEs ? 'Enrutado oficial:' : 'Official dispatch:'} <strong>Dispatch@WarhorseTransportation.com</strong></span>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setFormData({
                  usdot_or_sct: '',
                  carrier_name: '',
                  state_province: '',
                  contact_name: '',
                  email: '',
                  phone: '',
                  notes: '',
                  privacyAgreed: false,
                  hp_field: ''
                });
                setStatus('idle');
              }}
              className="mt-4"
            >
              {isEs ? 'Enviar otra solicitud' : 'Submit another request'}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-[#1A1A1A] flex items-center gap-2">
                <FileText size={22} className="text-[#1A1A1A]" />
                {t('carrier_page.form_title')}
              </h2>
              <p className="text-xs text-[#595959] mt-1">
                {t('carrier_page.form_subtitle')}
              </p>
            </div>

            {/* Antispam Honeypot */}
            <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
              <input 
                type="text" 
                name="hp_field" 
                value={formData.hp_field} 
                onChange={handleChange} 
                tabIndex={-1} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* USDOT or SCT */}
              <Input
                name="usdot_or_sct"
                label={t('carrier_page.usdot_or_sct')}
                required
                placeholder={t('carrier_page.usdot_or_sct_placeholder')}
                value={formData.usdot_or_sct}
                onChange={handleChange}
                error={errors.usdot_or_sct}
              />

              {/* Carrier Name */}
              <Input
                name="carrier_name"
                label={t('carrier_page.carrier_name')}
                required
                placeholder={t('carrier_page.carrier_name_placeholder')}
                value={formData.carrier_name}
                onChange={handleChange}
                error={errors.carrier_name}
              />

              {/* State / Province */}
              <Input
                name="state_province"
                label={t('carrier_page.state_province')}
                required
                placeholder={t('carrier_page.state_province_placeholder')}
                value={formData.state_province}
                onChange={handleChange}
                error={errors.state_province}
              />

              {/* Contact Name */}
              <Input
                name="contact_name"
                label={t('carrier_page.contact_name')}
                required
                placeholder={t('carrier_page.contact_name_placeholder')}
                value={formData.contact_name}
                onChange={handleChange}
                error={errors.contact_name}
              />

              {/* Email */}
              <Input
                name="email"
                type="email"
                label={t('carrier_page.email')}
                required
                placeholder={t('carrier_page.email_placeholder')}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              {/* Phone */}
              <Input
                name="phone"
                type="tel"
                label={t('carrier_page.phone')}
                required
                placeholder={t('carrier_page.phone_placeholder')}
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />

            </div>

            {/* Optional Notes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                {t('carrier_page.notes')}
              </label>
              <textarea
                name="notes"
                rows={3}
                placeholder={t('carrier_page.notes_placeholder')}
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition-all"
              />
            </div>

            {/* Privacy Checkbox */}
            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="privacyAgreed"
                  checked={formData.privacyAgreed}
                  onChange={handleCheckboxChange}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]"
                />
                <span className="text-xs text-[#595959] leading-relaxed">
                  {isEs ? (
                    <>
                      Acepto que Warhorse procese la información enviada para la calificación y alta de transportista, conforme a su{' '}
                      <Link to="/privacy" className="text-[#1A1A1A] font-bold underline hover:text-black">
                        Aviso de Privacidad
                      </Link>.
                    </>
                  ) : (
                    <>
                      I agree to allow Warhorse to process the submitted carrier information for qualification and onboarding per the{' '}
                      <Link to="/privacy" className="text-[#1A1A1A] font-bold underline hover:text-black">
                        Privacy Notice
                      </Link>.
                    </>
                  )}
                </span>
              </label>
              {errors.privacy && (
                <span className="text-xs font-semibold text-red-600 mt-1">{errors.privacy}</span>
              )}
            </div>

            {status === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm">
                {isEs 
                  ? 'Error al enviar el registro de transportista. Por favor intenta de nuevo o escribe a Dispatch@WarhorseTransportation.com' 
                  : 'Failed to submit carrier packet. Please try again or contact Dispatch@WarhorseTransportation.com'}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#595959]">
                <ShieldCheck size={16} className="text-[#1A1A1A]" />
                <span>{isEs ? 'Enrutamiento oficial a Dispatch@WarhorseTransportation.com' : 'Direct dispatch to Dispatch@WarhorseTransportation.com'}</span>
              </div>
              <Button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#1A1A1A] text-white font-bold rounded-xl hover:bg-black transition-all"
              >
                {status === 'loading' ? t('carrier_page.submitting') : t('carrier_page.submit_btn')}
              </Button>
            </div>

          </form>
        )}
      </GlassCard>

    </div>
  );
};
