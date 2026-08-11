# 🚛 Warhorse Logistics Group — Official Web Frontend

Plataforma web bilingüe e interfaz institucional de alta gama para **Warhorse Logistics Group**, diseñada bajo la arquitectura **Bento Box & Dark Glassmorphism** e integrada con soporte transfronterizo (EE. UU., México, Canadá).

![Warhorse Logo](public/logo.png)

## 🌟 Características Principales

- **Arquitectura Visual Bento Box & Glassmorphism**: Tarjetas translúcidas con efectos de vidrio esmerilado (`backdrop-filter: blur(12px)`), acentos en dorado corporativo (`#C5A059`) e iconografía técnica (`lucide-react`).
- **Sistema Bilingüe Nativo (1-Click Toggle)**: Soporte completo en Inglés (principal) y Español (secundario) impulsado por `i18next`.
- **Formulario Inteligente de Leads**: Enrutamiento condicional de cotizaciones según la modalidad seleccionada (FTL, LTL, Proyectos Especiales o Managed Transportation 5PL) hacia la API de backend.
- **Sección de Seguridad & Inspección K9**: Módulo interactivo con el desglose de la **Inspección de 19 Puntos Pre-salida** y certificación CTPAT.
- **Guía de Estilo & BI Integrada**: Acceso a la librería de componentes de Business Intelligence en `/styleguide`.

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS v4 + Vanilla CSS Custom Properties
- **Iconos**: Lucide React
- **Internacionalización**: `react-i18next` / `i18next`
- **Routing**: `react-router-dom` v7

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js >= 18.x
- npm >= 9.x

### Instalación

```bash
# 1. Clonar repositorio
git clone https://github.com/gruizmetasolutions-cpu/warhorse-web-frontend.git
cd warhorse-frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/` (o el siguiente puerto disponible como `http://localhost:5174/`).

### Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo Vite con HMR.
- `npm run build`: Ejecuta la verificación de tipos con TypeScript y realiza la compilación optimizada para producción en `dist/`.
- `npm run preview`: Previsualiza la build de producción de forma local.

## 📂 Estructura del Proyecto

```text
frontend/
├── public/
│   ├── logo.png               # Logo oficial corporativo
│   └── favicon.svg
├── src/
│   ├── assets/                # Imágenes e ilustraciones de activos logísticos
│   ├── components/
│   │   ├── layout/            # StickyNavbar, Footer, FloatingWidget, Layout
│   │   └── ui/                # GlassCard, Button, Input, Select
│   ├── i18n/                  # Diccionarios i18n (en.json, es.json)
│   ├── pages/                 # Home, About, Services, Security, Contact, StyleGuide
│   ├── App.tsx                # Configuración de rutas React Router
│   ├── index.css              # Tokens de diseño, gradientes y utilidades Glassmorphism
│   └── main.tsx               # Punto de entrada de la aplicación
├── .env.example               # Plantilla limpia de variables de entorno
├── index.html
├── package.json
└── vite.config.ts
```

## 🔒 Seguridad y Buenas Prácticas

- Ningún archivo de configuración de entorno local (`.env`) o credencial de API se encuentra expuesto en este repositorio.
- Todas las variables sensibles se deben definir utilizando el prefijo `VITE_`.

---

© 2026 **Warhorse Logistics Group**. Todos los derechos reservados.
