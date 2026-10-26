import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';

const resources = {
  en: { translation: en },
  es: { translation: es }
};

// Check for URL ?lang= parameter (e.g. ?lang=es or ?lang=en) for search engine indexing
let initialLng = 'en';
if (typeof window !== 'undefined' && window.location && window.location.search) {
  const urlParams = new URLSearchParams(window.location.search);
  const langQuery = urlParams.get('lang');
  if (langQuery === 'es' || langQuery === 'en') {
    initialLng = langQuery;
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLng,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

// Keep document.documentElement.lang in sync on initialization and language change
if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLng;
  i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng;
  });
}

export default i18n;
