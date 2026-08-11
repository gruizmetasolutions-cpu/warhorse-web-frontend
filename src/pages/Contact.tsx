import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../components/ui/GlassCard';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Phone, MapPin, Send, CheckCircle2, Shield } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const options = [
    { value: 'ftl', label: t('contact.services_options.ftl') },
    { value: 'ltl', label: t('contact.services_options.ltl') },
    { value: 'special', label: t('contact.services_options.special') },
    { value: 'managed', label: t('contact.services_options.managed') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-10">
      
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl md:text-5xl font-black text-white">
          Atención al Cliente & <span className="gold-gradient-text">Cotizaciones</span>
        </h1>
        <p className="text-gray-400 max-w-3xl">
          Canales directos de comunicación y respuesta prioritaria para su operación transfronteriza.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Direct Directory Bento Card */}
        <GlassCard className="flex flex-col justify-between gap-6 p-8 border-[#C5A059]/30">
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield className="text-[#C5A059]" size={20} />
              Directorio Especializado
            </h2>

            <div className="flex flex-col gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
                <span className="font-bold text-[#C5A059] uppercase tracking-wider text-[10px]">Consultas Generales</span>
                <a href="mailto:Helpdesk@warhorsebrokerage.com" className="text-gray-300 hover:underline break-all">Helpdesk@warhorsebrokerage.com</a>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
                <span className="font-bold text-[#C5A059] uppercase tracking-wider text-[10px]">Ventas & Cotizaciones</span>
                <a href="mailto:Quotes@WarhorseBrokerage.com" className="text-gray-300 hover:underline break-all">Quotes@WarhorseBrokerage.com</a>
                <a href="mailto:Cotizaciones@WarhorseMexico.com" className="text-gray-300 hover:underline break-all">Cotizaciones@WarhorseMexico.com</a>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
                <span className="font-bold text-[#C5A059] uppercase tracking-wider text-[10px]">Seguridad & Cumplimiento</span>
                <a href="mailto:SafetyandCompliance@warhorsebrokerage.com" className="text-gray-300 hover:underline break-all">SafetyandCompliance@warhorsebrokerage.com</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10 text-xs">
            <a href="tel:9152630708" className="flex items-center gap-2 text-gray-300 hover:text-[#C5A059]">
              <Phone size={16} className="text-[#C5A059]" /> 915-263-0708 (Voz / WhatsApp)
            </a>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin size={16} className="text-[#C5A059]" /> El Paso, TX & Cd. Juárez, CHIH
            </div>
          </div>
        </GlassCard>

        {/* Right Column: Lead Form (2 cols wide) */}
        <GlassCard className="lg:col-span-2 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t('contact.title')}
          </h2>

          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center p-12 text-center gap-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
              <CheckCircle2 size={48} className="text-emerald-400" />
              <h3 className="text-xl font-bold text-white">¡Solicitud Recibida!</h3>
              <p className="text-sm text-gray-300">{t('contact.success')}</p>
              <Button variant="outline" onClick={() => setStatus('idle')} className="mt-4">
                Enviar otra solicitud
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input 
                  name="name"
                  label={t('contact.form_name')}
                  required
                  placeholder="Ej. Juan Pérez"
                  value={formData.name}
                  onChange={handleChange}
                />
                
                <Input 
                  name="email"
                  type="email"
                  label={t('contact.form_email')}
                  required
                  placeholder="juan@empresa.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <Select
                name="service"
                label={t('contact.form_service')}
                options={options}
                required
                value={formData.service}
                onChange={handleChange}
              />
              
              <div className="flex flex-col gap-2 w-full">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 pl-1">
                  {t('contact.form_message')}
                </label>
                <textarea
                  name="message"
                  placeholder="Detalles sobre origen, destino, tipo de mercancía o requerimientos CTPAT..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] min-h-[120px] resize-none"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Enviando...' : t('contact.submit')}
                  <Send size={16} />
                </Button>
              </div>
            </form>
          )}
        </GlassCard>

      </div>

    </div>
  );
};
