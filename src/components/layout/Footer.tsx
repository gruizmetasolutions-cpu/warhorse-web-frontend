import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const supportEmail = i18n.language === 'es' 
    ? 'helpdesk@warhorsemexico.com' 
    : 'helpdesk@warhorsetransportation.com';

  return (
    <footer className="w-full bg-[#F5F5F5] border-t border-gray-200 mt-auto py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="WARHORSE" 
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="text-sm text-[#595959] leading-relaxed italic">
            {t('footer.tagline')}
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">{t('footer.quick_links')}</h3>
          <Link to="/about" className="text-sm text-[#595959] hover:text-[#1A1A1A] transition-colors">{t('nav.about')}</Link>
          <Link to="/services" className="text-sm text-[#595959] hover:text-[#1A1A1A] transition-colors">{t('nav.services')}</Link>
          <Link to="/security" className="text-sm text-[#595959] hover:text-[#1A1A1A] transition-colors">{t('nav.security')}</Link>
          <Link to="/contact" className="text-sm text-[#595959] hover:text-[#1A1A1A] transition-colors">{t('nav.contact')}</Link>
          <Link to="/apply" className="text-sm text-[#595959] hover:text-[#1A1A1A] transition-colors">{t('nav.apply')}</Link>
          <Link to="/resources" className="text-sm text-[#595959] hover:text-[#1A1A1A] transition-colors">{t('nav.resources')}</Link>
          <Link to="/privacy" className="text-sm text-[#595959] hover:text-[#1A1A1A] transition-colors font-medium">{t('footer.privacy_notice')}</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">{t('footer.certifications')}</h3>
          <div className="flex items-center gap-2 text-sm text-[#595959]">
            <ShieldCheck size={18} className="text-[#1A1A1A]" />
            {t('footer.cert_ctpat')}
          </div>
          <div className="flex items-center gap-2 text-sm text-[#595959]">
            <ShieldCheck size={18} className="text-[#1A1A1A]" />
            {t('footer.cert_fmcsa')}
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">{t('footer.contact_info')}</h3>
          <a href={`mailto:${supportEmail.toLowerCase()}`} className="flex items-center gap-2 text-sm text-[#595959] hover:text-[#1A1A1A] break-all">
            <Mail size={16} className="text-[#1A1A1A] shrink-0" />
            {supportEmail.toLowerCase()}
          </a>
          <div className="flex items-center gap-2 text-sm text-[#595959]">
            <MapPin size={16} className="text-[#1A1A1A] shrink-0" />
            {t('footer.locations')}
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-300/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#595959]">
        <p>{t('footer.rights')}</p>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="hover:underline hover:text-[#1A1A1A] transition-colors">{t('footer.privacy_notice')}</Link>
          <span>·</span>
          <p className="font-medium">{t('footer.category')}</p>
        </div>
      </div>
    </footer>
  );
};
