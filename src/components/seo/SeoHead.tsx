import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface RouteMetadata {
  titleEn: string;
  titleEs: string;
  descEn: string;
  descEs: string;
  canonicalPath: string;
}

const ROUTE_METADATA_MAP: Record<string, RouteMetadata> = {
  '/': {
    titleEn: 'WARHORSE | Cross-Border Freight, Trucking & 5PL Logistics (USA & Mexico)',
    titleEs: 'WARHORSE | Logística Transfronteriza, Fletes y 5PL (EE. UU. y México)',
    descEn: 'CTPAT & FMCSA certified cross-border logistics, FTL, LTL, flatbed, reefer, and 5PL freight brokerage operating in Santa Teresa, NM and Ciudad Juárez, CHIH.',
    descEs: 'Logística transfronteriza certificada CTPAT y FMCSA, transporte FTL, LTL, plataformas, refrigerados y brokerage 5PL con operaciones en Santa Teresa, NM y Ciudad Juárez, CHIH.',
    canonicalPath: '/',
  },
  '/quote': {
    titleEn: 'Request a Commercial Freight Quote | WARHORSE',
    titleEs: 'Cotizar Flete Comercial y Soluciones 5PL | WARHORSE',
    descEn: 'Request direct pricing and capacity for Standard Freight (FTL, LTL, Intermodal, Flatbed, Reefer) or Customized 5PL Logistics across the USA, Mexico, and Canada.',
    descEs: 'Solicite tarifas directas y capacidad para transporte de carga estándar (FTL, LTL, Intermodal, Plataforma, Refrigerado) o soluciones logísticas personalizadas 5PL en EE. UU., México y Canadá.',
    canonicalPath: '/quote',
  },
  '/services': {
    titleEn: 'Logistics & Specialized Freight Services | WARHORSE',
    titleEs: 'Servicios Logísticos y Transporte Especializado | WARHORSE',
    descEn: 'Full Truckload (FTL), LTL, cross-border drayage, warehousing, transloading, and 5PL supply chain management between the United States and Mexico.',
    descEs: 'Transporte de carga completa (FTL), consolidada (LTL), cruces fronterizos, almacenaje, transbordos y gestión integral de cadena de suministro 5PL entre EE. UU. y México.',
    canonicalPath: '/services',
  },
  '/about': {
    titleEn: 'About Warhorse | Corporate Structure & Fleet (Santa Teresa, NM & Cd. Juárez)',
    titleEs: 'Acerca de Warhorse | Estructura Corporativa y Flota (Santa Teresa y Cd. Juárez)',
    descEn: 'Learn about Warhorse Brokerage LLC, Warhorse Transportation LLC (Santa Teresa, NM), and Warhorse México (Cd. Juárez, CHIH) with 300+ own power units.',
    descEs: 'Conozca la estructura de Warhorse Brokerage LLC, Warhorse Transportation LLC (Santa Teresa, NM) y Warhorse México (Cd. Juárez, CHIH) con más de 300 unidades motrices propias.',
    canonicalPath: '/about',
  },
  '/security': {
    titleEn: 'CTPAT Security & Compliance | WARHORSE',
    titleEs: 'Seguridad CTPAT y Cumplimiento Normativo | WARHORSE',
    descEn: 'CTPAT certified cross-border security protocols, ISO 17712 seals, 24/7 GPS satellite monitoring via Samsara, and FMCSA compliance.',
    descEs: 'Protocolos de seguridad transfronteriza certificados CTPAT, candados de alta seguridad ISO 17712, rastreo satelital GPS 24/7 con Samsara y cumplimiento normativo FMCSA.',
    canonicalPath: '/security',
  },
  '/carriers': {
    titleEn: 'Become a Carrier — Request Carrier Packet | WARHORSE',
    titleEs: 'Únete como Transportista — Solicitar Carrier Packet | WARHORSE',
    descEn: 'Haul with Warhorse Brokerage LLC. Access consistent cross-border and domestic freight with Fuel Advance, Quick Pay, and 30-day standard payment programs.',
    descEs: 'Transporte con Warhorse Brokerage LLC. Acceda a carga constante doméstica y transfronteriza con programas de Fuel Advance, Quick Pay y pago estándar a 30 días.',
    canonicalPath: '/carriers',
  },
  '/carrier': {
    titleEn: 'Become a Carrier — Request Carrier Packet | WARHORSE',
    titleEs: 'Únete como Transportista — Solicitar Carrier Packet | WARHORSE',
    descEn: 'Haul with Warhorse Brokerage LLC. Access consistent cross-border and domestic freight with Fuel Advance, Quick Pay, and 30-day standard payment programs.',
    descEs: 'Transporte con Warhorse Brokerage LLC. Acceda a carga constante doméstica y transfronteriza con programas de Fuel Advance, Quick Pay y pago estándar a 30 días.',
    canonicalPath: '/carriers',
  },
  '/apply': {
    titleEn: 'Apply Today — CDL & Cross-Border Driver Careers | WARHORSE',
    titleEs: 'Bolsa de Trabajo — Choferes CDL y Transfer | WARHORSE',
    descEn: 'Join Warhorse in Santa Teresa, NM or Ciudad Juárez, CHIH. Open positions for CDL Drivers, Cross-Border Drivers, Ramperos, Dispatch, Brokerage, and Mechanics.',
    descEs: 'Únase al equipo Warhorse en Santa Teresa, NM o Ciudad Juárez, CHIH. Vacantes para operadores CDL, transfer, ramperos, despacho, brokerage y mantenimiento.',
    canonicalPath: '/apply',
  },
  '/contact': {
    titleEn: 'Contact Us — U.S. & Mexico Directory | WARHORSE',
    titleEs: 'Contacto — Directorio Estados Unidos y México | WARHORSE',
    descEn: 'Direct contact directory for Warhorse in Santa Teresa, NM and Ciudad Juárez, CHIH: Quotes & Billing, CTPAT Security & Compliance, and Human Resources.',
    descEs: 'Directorio de contacto directo para Warhorse en Santa Teresa, NM y Ciudad Juárez, CHIH: Cotizaciones, Seguridad CTPAT y Recursos Humanos.',
    canonicalPath: '/contact',
  },
  '/track': {
    titleEn: 'Track Your Freight — Real-Time Shipment Status | WARHORSE',
    titleEs: 'Rastreo de Carga en Tiempo Real | WARHORSE',
    descEn: 'Track your freight status in real time with Samsara satellite telemetry and Warhorse Logistics control tower visibility.',
    descEs: 'Rastree el estatus de su carga en tiempo real con telemetría satelital Samsara y visibilidad de torre de control de Warhorse Logistics.',
    canonicalPath: '/track',
  },
  '/resources': {
    titleEn: 'Operations & System Resources Portal | WARHORSE',
    titleEs: 'Portal de Recursos y Sistemas Operativos | WARHORSE',
    descEn: 'Authorized access portal for Warhorse Admin Hub, Driver Hub, Samsara Telemetry, and TMS platforms.',
    descEs: 'Portal de acceso seguro para Admin Hub, Driver Hub, telemetría Samsara y plataformas TMS de Warhorse Logistics.',
    canonicalPath: '/resources',
  },
  '/privacy': {
    titleEn: 'Privacy Policy | WARHORSE',
    titleEs: 'Aviso de Privacidad | WARHORSE',
    descEn: 'Privacy Policy and data protection practices for Warhorse Brokerage LLC and affiliated logistics entities.',
    descEs: 'Aviso de privacidad y políticas de tratamiento y protección de datos personales de Warhorse Brokerage LLC y empresas filiales.',
    canonicalPath: '/privacy',
  },
  '/book-load': {
    titleEn: 'Book a Freight Load | WARHORSE',
    titleEs: 'Reservar Carga de Transporte | WARHORSE',
    descEn: 'Authorized dispatch and booking portal for scheduled freight shipments across the USA and Mexico.',
    descEs: 'Portal de despacho y reserva autorizada para envíos de carga programados en EE. UU. y México.',
    canonicalPath: '/book-load',
  },
};

function setOrCreateMeta(selector: string, attrName: string, attrValue: string, content: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setOrCreateLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export const SeoHead: React.FC = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  // Handle URL query parameter ?lang=
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const langParam = searchParams.get('lang');
    if ((langParam === 'es' || langParam === 'en') && i18n.language !== langParam) {
      i18n.changeLanguage(langParam);
    }
  }, [location.search, i18n]);

  useEffect(() => {
    const currentLang = i18n.language === 'es' ? 'es' : 'en';
    document.documentElement.lang = currentLang;

    const path = location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    const meta = ROUTE_METADATA_MAP[path] || ROUTE_METADATA_MAP['/'];

    const title = currentLang === 'es' ? meta.titleEs : meta.titleEn;
    const desc = currentLang === 'es' ? meta.descEs : meta.descEn;
    const canonicalUrl = `https://warhorsebrokerage.com${meta.canonicalPath === '/' ? '/' : meta.canonicalPath}`;

    // 1. Title
    document.title = title;

    // 2. Standard Meta Tags
    setOrCreateMeta('meta[name="description"]', 'name', 'description', desc);
    setOrCreateLink('canonical', canonicalUrl);

    // 3. Open Graph
    setOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', desc);
    setOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setOrCreateMeta('meta[property="og:locale"]', 'property', 'og:locale', currentLang === 'es' ? 'es_MX' : 'en_US');

    // 4. Twitter Cards
    setOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setOrCreateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc);

  }, [location.pathname, i18n.language]);

  return null;
};
