import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { 
  Briefcase, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ApplyToday: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEs = i18n.language === 'es';

  const [step, setStep] = useState<number>(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Contact
    fullName: '',
    phone: '',
    smsConsent: false,
    email: '',
    cityState: '',
    position: '',
    location: '',
    prefLang: 'English',
    // Step 2: Driver Info (Conditional)
    licenseType: '',
    drivingExp: '',
    credentials: [] as string[],
    endorsements: [] as string[],
    routeTypes: [] as string[],
    // Step 3: Resume & Additional
    resumeFileName: '',
    resumeFileSize: '',
    notes: '',
    // Step 4: Consent
    consentAgreed: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [submittedRouting, setSubmittedRouting] = useState<string>('');
  const [applicationFolio, setApplicationFolio] = useState<string>('');

  const isDriverPosition = (pos: string) => {
    return [
      'CDL Driver (U.S. only)',
      'Local Driver (U.S. only)',
      'Cross-border Driver / Chofer de Cruce (MX only)',
      'Chofer Local (Rampero) (MX only)'
    ].includes(pos);
  };

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  const validatePhone = (val: string) => val.replace(/\D/g, '').length >= 10;

  // Handle generic input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Checkbox array toggling (credentials, endorsements, routeTypes)
  const toggleArrayItem = (key: 'credentials' | 'endorsements' | 'routeTypes', item: string) => {
    setFormData(prev => {
      const exists = prev[key].includes(item);
      const updated = exists ? prev[key].filter(x => x !== item) : [...prev[key], item];
      return { ...prev, [key]: updated };
    });
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 10 MB
    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ 
        ...prev, 
        resume: isEs ? 'El archivo excede el límite máximo de 10 MB.' : 'File exceeds maximum 10 MB limit.' 
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      resumeFileName: file.name,
      resumeFileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    }));
    setErrors(prev => ({ ...prev, resume: undefined }));
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = isEs ? 'Ingresa tu nombre completo.' : 'Full name is required.';
    if (!formData.phone.trim()) {
      newErrors.phone = isEs ? 'Ingresa un teléfono.' : 'Phone number is required.';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = isEs ? 'Ingresa un teléfono válido a 10 dígitos.' : 'Valid 10-digit phone number required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = isEs ? 'Ingresa tu correo.' : 'Email address is required.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = isEs ? 'Ingresa un correo electrónico válido.' : 'Valid email required.';
    }
    if (!formData.cityState.trim()) newErrors.cityState = isEs ? 'Indica tu ciudad y estado.' : 'City and state required.';
    if (!formData.position) newErrors.position = isEs ? 'Selecciona un puesto de interés.' : 'Please select a position of interest.';
    if (!formData.location) newErrors.location = isEs ? 'Selecciona una base / ubicación.' : 'Please select a preferred location.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validation (Drivers only)
  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.licenseType) newErrors.licenseType = isEs ? 'Selecciona tu tipo de licencia.' : 'License type is required.';
    if (!formData.drivingExp) newErrors.drivingExp = isEs ? 'Selecciona tus años de experiencia.' : 'Years of driving experience required.';
    if (formData.routeTypes.length === 0) newErrors.routeTypes = isEs ? 'Elige al menos un tipo de ruta preferida.' : 'Select at least one preferred route type.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation handlers
  const handleNext = () => {
    if (step === 1) {
      if (!validateStep1()) return;
      // If position is driver, go to step 2; otherwise skip step 2 and go straight to step 3!
      if (isDriverPosition(formData.position)) {
        setStep(2);
      } else {
        setStep(3);
      }
    } else if (step === 2) {
      if (!validateStep2()) return;
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step === 4) {
      setStep(3);
    } else if (step === 3) {
      // If was driver, back to 2, else back to 1
      if (isDriverPosition(formData.position)) {
        setStep(2);
      } else {
        setStep(1);
      }
    } else if (step === 2) {
      setStep(1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consentAgreed) {
      setErrors({ consent: isEs ? 'Debes otorgar tu consentimiento para ser contactado.' : 'You must agree to the consent checkbox.' });
      return;
    }

    setStatus('submitting');

    // HR Routing Rule (Ticket #187 Criteria):
    // If Santa Teresa, NM OR CDL Driver (U.S.) -> rh@warhorsebrokerage.com
    // If Ciudad Juárez, CHIH -> rh_mx@warhorsemexico.com
    let targetHr = 'rh@warhorsebrokerage.com';
    if (
      formData.location === 'Santa Teresa, NM' ||
      formData.position === 'CDL Driver (U.S. only)' ||
      formData.position === 'Local Driver (U.S. only)'
    ) {
      targetHr = 'rh@warhorsebrokerage.com';
    } else {
      targetHr = 'rh_mx@warhorsemexico.com';
    }

    const folio = 'WH-APP-' + Math.floor(100000 + Math.random() * 900000);
    setSubmittedRouting(targetHr);
    setApplicationFolio(folio);

    setTimeout(() => {
      // Save local backup in localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('warhorse_applications_backup') || '[]');
        existing.push({
          folio,
          ...formData,
          routed_to: targetHr,
          submitted_at: new Date().toISOString()
        });
        localStorage.setItem('warhorse_applications_backup', JSON.stringify(existing));
      } catch (err) {
        console.error('LocalStorage application backup error:', err);
      }

      setStatus('success');
    }, 700);
  };

  const totalSteps = isDriverPosition(formData.position) ? 4 : 3;
  const currentDisplayStep = step === 3 && !isDriverPosition(formData.position) ? 2 : (step === 4 && !isDriverPosition(formData.position) ? 3 : step);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10 flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex flex-col gap-3 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-300 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider w-fit">
          <Briefcase size={15} />
          {t('apply_wizard.badge')}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight uppercase">
          {t('apply_wizard.title')}
        </h1>
        <p className="text-[#595959] text-base md:text-lg">
          {t('apply_wizard.subtitle')}
        </p>
      </div>

      {status === 'success' ? (
        <GlassCard className="p-10 bg-white border border-gray-200 text-center flex flex-col items-center gap-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <CheckCircle2 size={36} />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">{t('apply_wizard.success_title')}</h2>
            <p className="text-sm text-[#595959] max-w-lg leading-relaxed">
              {t('apply_wizard.success_desc', { email: submittedRouting })}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col gap-1 text-xs text-[#595959]">
            <span>{t('apply_wizard.application_id')}</span>
            <span className="font-mono font-bold text-base text-[#1A1A1A]">{applicationFolio}</span>
          </div>

          <Button 
            variant="outline" 
            onClick={() => {
              setStep(1);
              setStatus('idle');
              setFormData({
                fullName: '',
                phone: '',
                smsConsent: false,
                email: '',
                cityState: '',
                position: '',
                location: '',
                prefLang: 'English',
                licenseType: '',
                drivingExp: '',
                credentials: [],
                endorsements: [],
                routeTypes: [],
                resumeFileName: '',
                resumeFileSize: '',
                notes: '',
                consentAgreed: false
              });
            }}
          >
            {t('apply_wizard.apply_another')}
          </Button>
        </GlassCard>
      ) : (
        <GlassCard className="p-6 md:p-10 bg-white border border-gray-200 shadow-sm flex flex-col gap-8">
          
          {/* Progress Bar & Indicators */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-bold text-[#595959] uppercase tracking-wider">
              <span>{t('apply_wizard.step_of', { current: currentDisplayStep, total: totalSteps })}</span>
              <span className="text-[#1A1A1A]">
                {step === 1 && t('apply_wizard.step_1_title')}
                {step === 2 && t('apply_wizard.step_2_title')}
                {step === 3 && t('apply_wizard.step_3_title')}
                {step === 4 && t('apply_wizard.step_4_title')}
              </span>
            </div>
            
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#1A1A1A] transition-all duration-300 rounded-full"
                style={{ width: `${(currentDisplayStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* STEP 1: Contact Information */}
          {step === 1 && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-xl font-bold text-[#1A1A1A]">{t('apply_wizard.step_1_title')}</h3>
                <p className="text-xs text-[#595959] mt-0.5">{isEs ? 'Información básica para contacto y entrevista inicial' : 'Core contact details for recruitment follow-up'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  name="fullName"
                  label={t('apply_wizard.full_name')}
                  required
                  placeholder={isEs ? 'Nombre y Apellidos' : 'First and Last Name'}
                  value={formData.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                />

                <Input
                  name="email"
                  type="email"
                  label={t('apply_wizard.email')}
                  required
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <div className="flex flex-col gap-1.5">
                  <Input
                    name="phone"
                    type="tel"
                    label={t('apply_wizard.phone')}
                    required
                    placeholder="+1 (555) 000-0000 / +52 (656) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  />
                  <label className="flex items-center gap-2 mt-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.smsConsent}
                      onChange={e => setFormData(prev => ({ ...prev, smsConsent: e.target.checked }))}
                      className="w-3.5 h-3.5 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]"
                    />
                    <span className="text-[11px] text-[#595959]">{t('apply_wizard.sms_consent')}</span>
                  </label>
                </div>

                <Input
                  name="cityState"
                  label={t('apply_wizard.city_state')}
                  required
                  placeholder={isEs ? 'Ej. Santa Teresa, NM / Cd. Juárez, CHIH' : 'e.g. Santa Teresa, NM or Cd. Juárez, CHIH'}
                  value={formData.cityState}
                  onChange={handleChange}
                  error={errors.cityState}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <Select
                  name="position"
                  label={t('apply_wizard.position')}
                  required
                  value={formData.position}
                  onChange={handleChange}
                  error={errors.position}
                  options={[
                    { value: '', label: isEs ? '-- Selecciona un puesto --' : '-- Select a position --' },
                    { value: 'CDL Driver (U.S.)', label: 'CDL Driver (U.S.)' },
                    { value: 'Local Driver (México)', label: 'Local Driver (México)' },
                    { value: 'Cross-Border Driver (México)', label: 'Cross-Border Driver (México)' },
                    { value: 'Dispatch', label: 'Dispatch / Despacho' },
                    { value: 'Brokerage / Traffic', label: 'Brokerage / Tráfico' },
                    { value: 'Administrative', label: 'Administrative / Administración' },
                    { value: 'Mechanic', label: 'Mechanic / Mecánico Diésel' },
                    { value: 'Maintenance / Housekeeping', label: 'Maintenance / Limpieza' },
                    { value: 'Security', label: 'Security / Seguridad' },
                    { value: 'Other', label: 'Other / Otro' }
                  ]}
                />

                <Select
                  name="location"
                  label={t('apply_wizard.location')}
                  required
                  value={formData.location}
                  onChange={handleChange}
                  error={errors.location}
                  options={[
                    { value: '', label: isEs ? '-- Selecciona una ubicación --' : '-- Select location --' },
                    { value: 'Ciudad Juárez, CHIH', label: 'Ciudad Juárez, CHIH' },
                    { value: 'Santa Teresa, NM', label: 'Santa Teresa, NM' }
                  ]}
                />
              </div>

              {/* Preferred Language Radio */}
              <div className="flex flex-col gap-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  {t('apply_wizard.pref_lang')}
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-[#1A1A1A]">
                    <input
                      type="radio"
                      name="prefLang"
                      value="English"
                      checked={formData.prefLang === 'English'}
                      onChange={handleChange}
                      className="text-[#1A1A1A] focus:ring-[#1A1A1A]"
                    />
                    English
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-[#1A1A1A]">
                    <input
                      type="radio"
                      name="prefLang"
                      value="Español"
                      checked={formData.prefLang === 'Español'}
                      onChange={handleChange}
                      className="text-[#1A1A1A] focus:ring-[#1A1A1A]"
                    />
                    Español
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Driver Qualifications (Conditional) */}
          {step === 2 && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-xl font-bold text-[#1A1A1A]">{t('apply_wizard.step_2_title')}</h3>
                <p className="text-xs text-[#595959] mt-0.5">{isEs ? 'Requisitos de manejo comercial, licencias y certificaciones' : 'Commercial driving credentials and route preferences'}</p>
              </div>

              {/* License Type Radio */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  {t('apply_wizard.license_type')} *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['CDL-A', 'CDL-B', 'Licencia Federal (México)'].map(lic => (
                    <label 
                      key={lic} 
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formData.licenseType === lic 
                          ? 'border-[#1A1A1A] bg-gray-50 ring-1 ring-[#1A1A1A]' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="licenseType"
                        value={lic}
                        checked={formData.licenseType === lic}
                        onChange={handleChange}
                        className="text-[#1A1A1A] focus:ring-[#1A1A1A]"
                      />
                      <span className="text-xs font-bold text-[#1A1A1A]">{lic}</span>
                    </label>
                  ))}
                </div>
                {errors.licenseType && <span className="text-xs text-red-600 font-semibold">{errors.licenseType}</span>}
              </div>

              {/* Years of driving experience */}
              <Select
                name="drivingExp"
                label={t('apply_wizard.driving_exp')}
                required
                value={formData.drivingExp}
                onChange={handleChange}
                error={errors.drivingExp}
                options={[
                  { value: '', label: isEs ? '-- Selecciona experiencia --' : '-- Select experience --' },
                  { value: 'Less than 1', label: isEs ? 'Menos de 1 año' : 'Less than 1 year' },
                  { value: '1–2', label: isEs ? '1 a 2 años' : '1 to 2 years' },
                  { value: '3–5', label: isEs ? '3 a 5 años' : '3 to 5 years' },
                  { value: '6–10', label: isEs ? '6 a 10 años' : '6 to 10 years' },
                  { value: 'More than 10', label: isEs ? 'Más de 10 años' : 'More than 10 years' }
                ]}
              />

              {/* Cross-Border Credentials Checkboxes */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  {t('apply_wizard.cross_border_creds')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['FAST card', 'B1 visa', 'TWIC card'].map(cred => (
                    <label 
                      key={cred}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs font-semibold ${
                        formData.credentials.includes(cred) ? 'border-[#1A1A1A] bg-gray-50' : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.credentials.includes(cred)}
                        onChange={() => toggleArrayItem('credentials', cred)}
                        className="w-4 h-4 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]"
                      />
                      {cred}
                    </label>
                  ))}
                </div>
              </div>

              {/* Endorsements Checkboxes */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  {t('apply_wizard.endorsements')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['Hazmat (H)', 'Tanker (N)', 'Doubles/Triples (T)'].map(end => (
                    <label 
                      key={end}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs font-semibold ${
                        formData.endorsements.includes(end) ? 'border-[#1A1A1A] bg-gray-50' : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.endorsements.includes(end)}
                        onChange={() => toggleArrayItem('endorsements', end)}
                        className="w-4 h-4 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]"
                      />
                      {end}
                    </label>
                  ))}
                </div>
              </div>

              {/* Route Type Checkboxes */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  {t('apply_wizard.route_type')} *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['Local', 'Regional', 'Cross-border'].map(rt => (
                    <label 
                      key={rt}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs font-semibold ${
                        formData.routeTypes.includes(rt) ? 'border-[#1A1A1A] bg-gray-50' : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.routeTypes.includes(rt)}
                        onChange={() => toggleArrayItem('routeTypes', rt)}
                        className="w-4 h-4 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]"
                      />
                      {rt}
                    </label>
                  ))}
                </div>
                {errors.routeTypes && <span className="text-xs text-red-600 font-semibold">{errors.routeTypes}</span>}
              </div>

            </div>
          )}

          {/* STEP 3: Resume & Additional Info */}
          {step === 3 && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-xl font-bold text-[#1A1A1A]">{t('apply_wizard.step_3_title')}</h3>
                <p className="text-xs text-[#595959] mt-0.5">{t('apply_wizard.resume_hint')}</p>
              </div>

              {/* File Upload Box */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  {t('apply_wizard.resume_file')}
                </label>
                <div className="border-2 border-dashed border-gray-300 hover:border-[#1A1A1A] rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-3 transition-colors bg-gray-50/50">
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1A1A1A] shadow-sm">
                    <Upload size={22} />
                  </div>
                  
                  {formData.resumeFileName ? (
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-sm text-[#1A1A1A] flex items-center gap-1.5">
                        <FileText size={16} />
                        {formData.resumeFileName}
                      </span>
                      <span className="text-xs text-[#595959]">{formData.resumeFileSize}</span>
                      <label className="mt-2 text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                        {isEs ? 'Cambiar archivo' : 'Choose different file'}
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center gap-1">
                      <span className="text-sm font-bold text-[#1A1A1A] hover:underline">
                        {isEs ? 'Haz clic para seleccionar tu CV o foto de solicitud' : 'Click to browse resume or application photo'}
                      </span>
                      <span className="text-xs text-[#595959]">{t('apply_wizard.resume_hint')}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                {errors.resume && <span className="text-xs text-red-600 font-semibold">{errors.resume}</span>}
              </div>

              {/* Anything else we should know */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  {t('apply_wizard.anything_else')}
                </label>
                <textarea
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={isEs ? 'Comparte detalles adicionales sobre tus metas, certificaciones o disponibilidad de inicio...' : 'Share any additional details about your schedule, certifications, or start date...'}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition-all"
                />
              </div>

            </div>
          )}

          {/* STEP 4: Review, Consent & Submit */}
          {step === 4 && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-xl font-bold text-[#1A1A1A]">{t('apply_wizard.step_4_title')}</h3>
                <p className="text-xs text-[#595959] mt-0.5">{isEs ? 'Verifica tus datos antes de enviar tu solicitud' : 'Review your application summary and confirm consent'}</p>
              </div>

              {/* Summary Card */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-500 font-medium">{t('apply_wizard.full_name')}:</span>
                  <p className="font-bold text-[#1A1A1A] text-sm mt-0.5">{formData.fullName}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">{t('apply_wizard.email')}:</span>
                  <p className="font-bold text-[#1A1A1A] text-sm mt-0.5">{formData.email}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">{t('apply_wizard.phone')}:</span>
                  <p className="font-bold text-[#1A1A1A] text-sm mt-0.5">{formData.phone}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">{t('apply_wizard.position')}:</span>
                  <p className="font-bold text-[#1A1A1A] text-sm mt-0.5">{formData.position}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">{t('apply_wizard.location')}:</span>
                  <p className="font-bold text-[#1A1A1A] text-sm mt-0.5">{formData.location}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">{isEs ? 'Archivo adjunto:' : 'Attached file:'}</span>
                  <p className="font-bold text-[#1A1A1A] text-sm mt-0.5">{formData.resumeFileName || (isEs ? 'Ninguno' : 'None')}</p>
                </div>
              </div>

              {/* Smart Routing Preview */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
                <ShieldCheck size={18} className="shrink-0 text-blue-700" />
                <span>
                  {isEs ? 'Esta solicitud será canalizada directamente a la coordinación de RH en:' : 'This application will be routed to the recruitment desk at:'}{' '}
                  <strong>
                    {formData.location === 'Santa Teresa, NM' || formData.position === 'CDL Driver (U.S. only)' || formData.position === 'Local Driver (U.S. only)'
                      ? 'rh@warhorsebrokerage.com' 
                      : 'rh_mx@warhorsemexico.com'}
                  </strong>
                </span>
              </div>

              {/* Mandatory Consent Checkbox */}
              <div className="flex flex-col gap-1.5 pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.consentAgreed}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, consentAgreed: e.target.checked }));
                      if (e.target.checked && errors.consent) {
                        setErrors(prev => ({ ...prev, consent: undefined }));
                      }
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]"
                  />
                  <span className="text-xs text-[#595959] leading-relaxed">
                    {t('apply_wizard.consent_checkbox')}{' '}
                    <Link to="/privacy" className="text-[#1A1A1A] font-bold underline hover:text-black">
                      {t('apply_wizard.privacy_link')}
                    </Link>.
                  </span>
                </label>
                {errors.consent && <span className="text-xs text-red-600 font-semibold">{errors.consent}</span>}
              </div>

            </div>
          )}

          {/* Navigation Controls */}
          <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
            {step > 1 ? (
              <Button
                variant="outline"
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 text-xs font-bold py-2.5 px-4"
              >
                <ArrowLeft size={14} />
                {t('apply_wizard.prev_btn')}
              </Button>
            ) : <div />}

            {step < 4 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 text-xs font-bold py-2.5 px-6 bg-[#1A1A1A] text-white hover:bg-black"
              >
                {t('apply_wizard.next_btn')}
                <ArrowRight size={14} />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={status === 'submitting'}
                className="flex items-center gap-1.5 text-xs font-bold py-3 px-8 bg-[#1A1A1A] text-white hover:bg-black shadow-md"
              >
                {status === 'submitting' ? t('apply_wizard.submitting') : t('apply_wizard.submit_btn')}
              </Button>
            )}
          </div>

        </GlassCard>
      )}

    </div>
  );
};
