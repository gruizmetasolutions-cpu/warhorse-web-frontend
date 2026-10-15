import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../ui/GlassCard';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { CheckCircle2, ShieldCheck, Send, AlertCircle, Lock, Sparkles, Truck } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

interface DynamicQuoteFormProps {
  initialType?: 'standard' | 'customized';
  onSuccess?: () => void;
}

export const DynamicQuoteForm: React.FC<DynamicQuoteFormProps> = ({
  initialType = 'standard',
  onSuccess
}) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  // Read URL query parameter ?type=customized or standard if provided
  const paramType = searchParams.get('type');
  const [quoteType, setQuoteType] = useState<'standard' | 'customized'>(
    paramType === 'customized' ? 'customized' : initialType
  );

  useEffect(() => {
    if (paramType === 'customized') {
      setQuoteType('customized');
    } else if (paramType === 'standard') {
      setQuoteType('standard');
    }
  }, [paramType]);

  // Form State
  const [formData, setFormData] = useState({
    // Standard Freight
    equipmentType: '',
    countryUsa: true,
    countryMexico: false,
    pickupDate: '',
    pickupLocation: '',
    deliveryLocation: '',
    
    // Customized Service
    describeNeeds: '',

    // Universal Contact Fields
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',

    // Antispam Honeypot & Privacy
    quote_hp: '',
    privacyAgreed: false
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [routedMailboxes, setRoutedMailboxes] = useState<string[]>([]);

  // Equipment options for Option 1
  const equipmentOptions = [
    { value: 'ftl', label: 'Full Truckload (FTL)' },
    { value: 'ltl', label: 'Less-Than-Truckload (LTL)' },
    { value: 'intermodal', label: 'Intermodal' },
    { value: 'flatbed', label: 'Flatbed' },
    { value: 'reefer', label: 'Refrigerated (Reefer)' },
    { value: 'bobtail', label: 'Bobtail' },
  ];

  // Helper date for minimum date (block past dates)
  const todayDate = new Date().toISOString().split('T')[0];

  // Regex validators
  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  const validatePhone = (val: string) => {
    // Accepts +1 and +52 patterns or at least 10 digits
    const cleaned = val.replace(/\D/g, '');
    return cleaned.length >= 10;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time inline error clearing
    if (name === 'email' && value.trim()) {
      if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: t('contact.email_invalid') }));
      } else {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
    if (name === 'phone' && value.trim()) {
      if (!validatePhone(value)) {
        setErrors((prev) => ({ ...prev, phone: t('contact.phone_invalid') }));
      } else {
        setErrors((prev) => ({ ...prev, phone: undefined }));
      }
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCountryToggle = (country: 'usa' | 'mexico') => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        countryUsa: country === 'usa' ? !prev.countryUsa : prev.countryUsa,
        countryMexico: country === 'mexico' ? !prev.countryMexico : prev.countryMexico
      };
      if (updated.countryUsa || updated.countryMexico) {
        setErrors((errs) => ({ ...errs, country: undefined }));
      }
      return updated;
    });
  };

  const handlePrivacyToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData((prev) => ({ ...prev, privacyAgreed: checked }));
    if (checked) {
      setErrors((prev) => ({ ...prev, privacy: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Antispam Honeypot Guard
    if (formData.quote_hp) {
      console.warn('Honeypot triggered on quote form.');
      setStatus('success');
      return;
    }

    // 2. Validate Fields
    const newErrors: Record<string, string | undefined> = {};

    // Common Contact Validation
    if (!formData.firstName.trim()) newErrors.firstName = t('quote_page.first_name') + ' *';
    if (!formData.lastName.trim()) newErrors.lastName = t('quote_page.last_name') + ' *';
    if (!formData.email.trim() || !validateEmail(formData.email)) newErrors.email = t('contact.email_invalid');
    if (!formData.phone.trim() || !validatePhone(formData.phone)) newErrors.phone = t('contact.phone_invalid');
    if (!formData.companyName.trim()) newErrors.companyName = t('quote_page.company') + ' *';
    if (!formData.countryUsa && !formData.countryMexico) newErrors.country = t('quote_page.country_required');
    if (!formData.privacyAgreed) newErrors.privacy = t('contact.privacy_required');

    if (quoteType === 'standard') {
      if (!formData.equipmentType) newErrors.equipmentType = t('quote_page.equipment_required');
      if (!formData.pickupDate) newErrors.pickupDate = t('quote_page.date_required');
      if (!formData.pickupLocation.trim()) newErrors.pickupLocation = t('quote_page.pickup_location') + ' *';
      if (!formData.deliveryLocation.trim()) newErrors.deliveryLocation = t('quote_page.delivery_location') + ' *';
    } else {
      if (!formData.describeNeeds.trim()) newErrors.describeNeeds = t('quote_page.needs_required');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('loading');

    // 3. Dynamic Conditional Mailer Routing Logic (Open Item #3)
    const targets: string[] = [];
    if (formData.countryUsa) {
      targets.push('quotes@warhorsebrokerage.com');
    }
    if (formData.countryMexico) {
      targets.push('cotizaciones@warhorsemexico.com');
    }
    setRoutedMailboxes(targets);

    const payload = {
      id: `quote_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      quoteType,
      serviceCountries: targets,
      routedTo: targets.join(', '),
      formData: {
        ...formData,
        email: formData.email.toLowerCase().trim()
      },
      submittedAt: new Date().toISOString()
    };

    // 4. Client-side Persistence Safeguard
    try {
      const quoteQueue = JSON.parse(localStorage.getItem('warhorse_quotes_backup') || '[]');
      quoteQueue.push(payload);
      localStorage.setItem('warhorse_quotes_backup', JSON.stringify(quoteQueue));

      const leadsQueue = JSON.parse(localStorage.getItem('warhorse_leads_backup') || '[]');
      leadsQueue.push({
        id: payload.id,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone.trim(),
        company: formData.companyName.trim(),
        service: quoteType === 'standard' ? formData.equipmentType : 'customized_service',
        source: 'dynamic_quote_form',
        routedTo: targets.join(', '),
        timestamp: payload.submittedAt
      });
      localStorage.setItem('warhorse_leads_backup', JSON.stringify(leadsQueue));
    } catch (saveErr) {
      console.warn('Quote storage backup skipped:', saveErr);
    }

    // 5. Backend Dispatch
    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setStatus('success');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setStatus('success'); // Lead secured in local store
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      equipmentType: '',
      countryUsa: true,
      countryMexico: false,
      pickupDate: '',
      pickupLocation: '',
      deliveryLocation: '',
      describeNeeds: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyName: '',
      quote_hp: '',
      privacyAgreed: false
    });
    setErrors({});
  };

  return (
    <GlassCard className="w-full max-w-4xl mx-auto p-6 sm:p-10 bg-white border border-gray-200 shadow-sm flex flex-col gap-8">
      
      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center gap-5 bg-emerald-50 border border-emerald-300 rounded-2xl animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-emerald-950">
            {t('quote_page.success_title')}
          </h2>
          <p className="text-sm text-emerald-900 max-w-lg leading-relaxed">
            {t('quote_page.success_msg')}
          </p>

          <div className="p-4 rounded-xl bg-white/80 border border-emerald-300 text-xs text-emerald-900 flex flex-col gap-1 w-full max-w-md">
            <span className="font-bold uppercase tracking-wider text-[11px] text-emerald-950">
              {t('quote_page.routed_to')}
            </span>
            <div className="flex flex-wrap gap-2 justify-center pt-1 font-mono text-xs">
              {routedMailboxes.map((mb) => (
                <span key={mb} className="px-2.5 py-1 bg-emerald-100 rounded-md font-semibold">
                  {mb}
                </span>
              ))}
            </div>
          </div>

          <Button variant="outline" onClick={handleReset} className="mt-2 text-sm">
            {t('quote_page.send_another')}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
          
          {/* Honeypot field (hidden) */}
          <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
            <input
              type="text"
              name="quote_hp"
              tabIndex={-1}
              autoComplete="off"
              value={formData.quote_hp}
              onChange={handleInputChange}
            />
          </div>

          {/* STEP 1: CONDITIONAL SELECTOR (MANDATORY RADIO BUTTONS) */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
              {t('quote_page.step_quote_type')} <span className="text-red-500 font-bold">*</span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Option 1: Standard Freight */}
              <div
                onClick={() => setQuoteType('standard')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                  quoteType === 'standard'
                    ? 'border-[#1A1A1A] bg-[#F5F5F5] ring-2 ring-[#1A1A1A]/10 shadow-sm'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="quoteType"
                  id="opt_standard"
                  checked={quoteType === 'standard'}
                  onChange={() => setQuoteType('standard')}
                  className="mt-1 h-4 w-4 text-[#1A1A1A] border-gray-300 focus:ring-[#1A1A1A] cursor-pointer"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-[#1A1A1A]" />
                    <span className="font-bold text-sm text-[#1A1A1A]">
                      {t('quote_page.opt_standard')}
                    </span>
                  </div>
                  <p className="text-xs text-[#595959] leading-relaxed">
                    {t('quote_page.opt_standard_desc')}
                  </p>
                </div>
              </div>

              {/* Option 2: Customized Service */}
              <div
                onClick={() => setQuoteType('customized')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                  quoteType === 'customized'
                    ? 'border-[#1A1A1A] bg-[#F5F5F5] ring-2 ring-[#1A1A1A]/10 shadow-sm'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="quoteType"
                  id="opt_customized"
                  checked={quoteType === 'customized'}
                  onChange={() => setQuoteType('customized')}
                  className="mt-1 h-4 w-4 text-[#1A1A1A] border-gray-300 focus:ring-[#1A1A1A] cursor-pointer"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#1A1A1A]" />
                    <span className="font-bold text-sm text-[#1A1A1A]">
                      {t('quote_page.opt_customized')}
                    </span>
                  </div>
                  <p className="text-xs text-[#595959] leading-relaxed">
                    {t('quote_page.opt_customized_desc')}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* STEP 2: DYNAMIC CONDITIONAL FIELDS */}
          <div className="flex flex-col gap-6 pt-2 border-t border-gray-200">
            
            {/* Service Country Checkboxes (Both Options 1 & 2) */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#595959] pl-1">
                {t('quote_page.service_country')} <span className="text-red-500 font-bold">*</span>
              </label>
              
              <div className="flex flex-wrap items-center gap-6 pl-1">
                <label className="flex items-center gap-2 text-sm text-[#1A1A1A] font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.countryUsa}
                    onChange={() => handleCountryToggle('usa')}
                    className="h-4 w-4 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A] cursor-pointer"
                  />
                  <span>{t('quote_page.country_usa')} (quotes@warhorsebrokerage.com)</span>
                </label>

                <label className="flex items-center gap-2 text-sm text-[#1A1A1A] font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.countryMexico}
                    onChange={() => handleCountryToggle('mexico')}
                    className="h-4 w-4 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A] cursor-pointer"
                  />
                  <span>{t('quote_page.country_mexico')} (cotizaciones@warhorsemexico.com)</span>
                </label>
              </div>

              {errors.country && (
                <span className="text-red-600 text-xs font-medium pl-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.country}
                </span>
              )}
            </div>

            {/* OPTION 1 CONDITIONAL FIELDS (STANDARD FREIGHT) */}
            {quoteType === 'standard' && (
              <div className="flex flex-col gap-5 animate-fade-in">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Select
                    name="equipmentType"
                    label={t('quote_page.service_type')}
                    options={equipmentOptions}
                    required
                    placeholderOption={t('quote_page.select_service_type')}
                    value={formData.equipmentType}
                    onChange={handleInputChange}
                    error={errors.equipmentType}
                  />

                  <Input
                    name="pickupDate"
                    type="date"
                    label={t('quote_page.pickup_date')}
                    min={todayDate}
                    required
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    error={errors.pickupDate}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    name="pickupLocation"
                    type="text"
                    label={t('quote_page.pickup_location')}
                    placeholder={t('quote_page.pickup_location_placeholder')}
                    required
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    error={errors.pickupLocation}
                  />

                  <Input
                    name="deliveryLocation"
                    type="text"
                    label={t('quote_page.delivery_location')}
                    placeholder={t('quote_page.delivery_location_placeholder')}
                    required
                    value={formData.deliveryLocation}
                    onChange={handleInputChange}
                    error={errors.deliveryLocation}
                  />
                </div>

              </div>
            )}

            {/* OPTION 2 CONDITIONAL FIELDS (CUSTOMIZED SERVICE) */}
            {quoteType === 'customized' && (
              <div className="flex flex-col gap-2 animate-fade-in">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#595959] pl-1">
                  {t('quote_page.describe_needs')} <span className="text-red-500 font-bold">*</span>
                </label>
                <textarea
                  name="describeNeeds"
                  rows={4}
                  placeholder={t('quote_page.describe_needs_placeholder')}
                  value={formData.describeNeeds}
                  onChange={handleInputChange}
                  className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] resize-none ${
                    errors.describeNeeds ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.describeNeeds && (
                  <span className="text-red-600 text-xs font-medium pl-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.describeNeeds}
                  </span>
                )}
              </div>
            )}

            {/* STEP 3: CONTACT FIELDS (UNIVERSAL FOR BOTH OPTIONS) */}
            <div className="flex flex-col gap-4 pt-4 border-t border-gray-200">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                Contact & Company Information
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  name="firstName"
                  label={t('quote_page.first_name')}
                  placeholder={t('quote_page.first_name_placeholder')}
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                />

                <Input
                  name="lastName"
                  label={t('quote_page.last_name')}
                  placeholder={t('quote_page.last_name_placeholder')}
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <Input
                  name="email"
                  type="email"
                  label={t('quote_page.email')}
                  placeholder={t('quote_page.email_placeholder')}
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />

                <Input
                  name="phone"
                  type="tel"
                  label={t('quote_page.phone')}
                  placeholder={t('quote_page.phone_placeholder')}
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                />

                <Input
                  name="companyName"
                  type="text"
                  label={t('quote_page.company')}
                  placeholder={t('quote_page.company_placeholder')}
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  error={errors.companyName}
                />
              </div>
            </div>

            {/* PRIVACY AGREEMENT & COMPLIANCE */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-200">
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="privacyQuoteAgreed"
                  checked={formData.privacyAgreed}
                  onChange={handlePrivacyToggle}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A] cursor-pointer"
                />
                <label htmlFor="privacyQuoteAgreed" className="text-xs text-[#595959] cursor-pointer leading-relaxed">
                  {t('contact.privacy_agree')}{' '}
                  <Link
                    to="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#1A1A1A] underline hover:text-black"
                  >
                    {t('contact.privacy_link')}
                  </Link>
                  <span className="text-red-500 font-bold ml-1">*</span>
                </label>
              </div>
              {errors.privacy && (
                <span className="text-red-600 text-xs font-medium pl-6 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.privacy}
                </span>
              )}
            </div>

            {/* SUBMIT BUTTON & SECURITY BADGES */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4 text-xs text-[#595959]">
                <span className="flex items-center gap-1">
                  <Lock size={13} className="text-[#1A1A1A]" /> SSL 256-Bit
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-[#1A1A1A]" /> CTPAT Tier 2
                </span>
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={status === 'loading'}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold flex items-center justify-center gap-2"
              >
                {status === 'loading' ? t('quote_page.submitting') : t('quote_page.submit')}
                <Send size={16} />
              </Button>
            </div>

          </div>

        </form>
      )}

    </GlassCard>
  );
};
