import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { 
  ShieldCheck, Truck, TrendingUp, TrendingDown, Clock, 
  Search, Filter, ChevronRight, Download, RefreshCw, CheckCircle2, AlertTriangle, XCircle 
} from 'lucide-react';

export const StyleGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'components' | 'bi' | 'tables'>('bi');
  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d' | '12m'>('7d');
  const [activeMetrics, setActiveMetrics] = useState({
    miles: true,
    fuel: true,
    dwell: false
  });

  // Dynamic Multi-variable Line Chart Data
  const lineChartDatasets = {
    '24h': {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
      miles: [120, 340, 890, 1250, 1100, 750, 420],
      fuel: [6.8, 7.1, 7.4, 7.2, 7.5, 7.3, 7.0],
      dwell: [25, 30, 55, 62, 45, 38, 28]
    },
    '7d': {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      miles: [4200, 5800, 6100, 5900, 6800, 3900, 2800],
      fuel: [7.2, 7.4, 7.3, 7.5, 7.6, 7.8, 7.4],
      dwell: [42, 38, 45, 50, 35, 28, 22]
    },
    '30d': {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      miles: [24500, 28900, 31200, 29800],
      fuel: [7.3, 7.5, 7.4, 7.6],
      dwell: [40, 44, 38, 35]
    },
    '12m': {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      miles: [98000, 105000, 120000, 115000, 132000, 140000, 138000, 142000, 135000, 148000, 150000, 155000],
      fuel: [7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.5, 7.7, 7.6, 7.7, 7.8, 7.9],
      dwell: [48, 45, 42, 40, 38, 35, 36, 34, 33, 31, 30, 28]
    }
  };

  const currentDataset = lineChartDatasets[timeFilter];

  const toggleMetric = (key: 'miles' | 'fuel' | 'dwell') => {
    setActiveMetrics(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // BI Data Mock
  const tableData = [
    { id: 'TRK-9082', origin: 'Cd. Juárez, MX', destination: 'El Paso, TX', type: 'FTL Reefer', status: 'In Transit', driver: 'Carlos Mendoza', eta: '2026-08-11 18:30' },
    { id: 'TRK-8812', origin: 'Monterrey, MX', destination: 'Dallas, TX', type: 'FTL Dry Van', status: 'Approved', driver: 'Roberto Gómez', eta: '2026-08-12 09:15' },
    { id: 'TRK-7419', origin: 'Querétaro, MX', destination: 'Chicago, IL', type: 'Intermodal', status: 'Inspection', driver: 'Eduardo Silva', eta: '2026-08-13 14:00' },
    { id: 'TRK-6021', origin: 'Guadalajara, MX', destination: 'Atlanta, GA', type: 'LTL Consolidado', status: 'Delayed', driver: 'Jorge Hernández', eta: '2026-08-12 21:45' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-10">
      
      {/* Header Banner - Horizontal Layout with Inset Centered Logo Right */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 md:px-14 rounded-3xl bg-gradient-to-r from-[#1A1A1B] via-[#1A1A1B]/90 to-[#0f0f10] border border-[#C5A059]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#C5A059]/10 blur-3xl rounded-full pointer-events-none" />
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col gap-3 relative z-10 max-w-xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] text-xs font-bold uppercase tracking-widest w-fit">
            <ShieldCheck size={14} /> Official Design System & BI Library
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            UX UI WARHORSE <span className="gold-gradient-text">V1.0</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Guía de estilo unificada y catálogo de componentes de Business Intelligence (BI) para la estandarización visual de la plataforma Warhorse Logistics Group.
          </p>
        </div>

        {/* Right Column: Logo +20% Larger & Shifted Inward towards Center */}
        <div className="flex items-center justify-center md:mr-8 lg:mr-16 relative z-10 shrink-0">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#C5A059]/20 blur-2xl rounded-full scale-110 pointer-events-none" />
            <img 
              src="/logo.png" 
              alt="Warhorse Logo" 
              className="relative h-32 sm:h-36 md:h-44 lg:h-48 w-auto object-contain brightness-0 invert drop-shadow-[0_0_30px_rgba(197,160,89,0.65)] hover:scale-105 transition-all duration-300" 
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
        <button
          onClick={() => setActiveTab('bi')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'bi' ? 'bg-[#C5A059] text-black shadow-[0_0_15px_rgba(197,160,89,0.4)]' : 'bg-white/5 text-gray-400 hover:text-white'
          }`}
        >
          📊 Business Intelligence & Charts
        </button>
        <button
          onClick={() => setActiveTab('components')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'components' ? 'bg-[#C5A059] text-black shadow-[0_0_15px_rgba(197,160,89,0.4)]' : 'bg-white/5 text-gray-400 hover:text-white'
          }`}
        >
          🧩 UI Components & Form Inputs
        </button>
        <button
          onClick={() => setActiveTab('tables')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'tables' ? 'bg-[#C5A059] text-black shadow-[0_0_15px_rgba(197,160,89,0.4)]' : 'bg-white/5 text-gray-400 hover:text-white'
          }`}
        >
          📋 BI Data Tables & Status Badges
        </button>
        <button
          onClick={() => setActiveTab('tokens')}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'tokens' ? 'bg-[#C5A059] text-black shadow-[0_0_15px_rgba(197,160,89,0.4)]' : 'bg-white/5 text-gray-400 hover:text-white'
          }`}
        >
          🎨 Tokens, Colors & Typography
        </button>
      </div>

      {/* TAB 1: BI CHARTS & KPI METRICS */}
      {(activeTab === 'bi' || activeTab === 'tokens') && (
        <section className="flex flex-col gap-8">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Tarjetas KPI & Gráficos de BI</h2>
              <p className="text-xs text-gray-400">Indicadores clave de rendimiento operativo con visualización gráfica.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="text-xs px-3 py-1.5">
                <RefreshCw size={14} /> Actualizar Datos
              </Button>
              <Button variant="primary" className="text-xs px-3 py-1.5">
                <Download size={14} /> Exportar Reporte
              </Button>
            </div>
          </div>

          {/* 4 BI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <GlassCard className="flex flex-col justify-between min-h-[170px] p-5 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0">
                  <Truck size={20} />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold shrink-0">
                  <TrendingUp size={12} /> +14.2%
                </span>
              </div>
              <div>
                <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider block truncate">Cargas Activas (FTL/LTL)</span>
                <h3 className="text-3xl font-black text-white mt-1">1,482</h3>
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#C5A059] h-full rounded-full" style={{ width: '78%' }} />
                </div>
                <span className="text-[10px] text-gray-500 truncate">78% de la capacidad de flota utilizada</span>
              </div>
            </GlassCard>

            <GlassCard className="flex flex-col justify-between min-h-[170px] p-5 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0">
                  <Clock size={20} />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold shrink-0">
                  <TrendingUp size={12} /> 98.4%
                </span>
              </div>
              <div>
                <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider block truncate">On-Time Delivery Rate</span>
                <h3 className="text-3xl font-black text-white mt-1">98.4%</h3>
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '98.4%' }} />
                </div>
                <span className="text-[10px] text-gray-500 truncate">Objetivo SLA: &gt;97.5% (Cumplido)</span>
              </div>
            </GlassCard>

            <GlassCard className="flex flex-col justify-between min-h-[170px] p-5 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold shrink-0">
                  100%
                </span>
              </div>
              <div>
                <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider block truncate">Inspecciones 19-Puntos</span>
                <h3 className="text-3xl font-black text-white mt-1">3,920</h3>
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#C5A059] h-full rounded-full" style={{ width: '100%' }} />
                </div>
                <span className="text-[10px] text-gray-500 truncate">Cero incidencias mecánicas</span>
              </div>
            </GlassCard>

            <GlassCard className="flex flex-col justify-between min-h-[170px] p-5 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold shrink-0">
                  <TrendingDown size={12} /> -2.1%
                </span>
              </div>
              <div>
                <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider block truncate">Tiempo de Cruce Aduana</span>
                <h3 className="text-3xl font-black text-white mt-1">42 min</h3>
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-400 h-full rounded-full" style={{ width: '42%' }} />
                </div>
                <span className="text-[10px] text-gray-500 truncate">Promedio El Paso / Cd. Juárez</span>
              </div>
            </GlassCard>

          </div>

          {/* Dynamic Interactive Line Chart */}
          <GlassCard className="flex flex-col gap-6 p-6 border-[#C5A059]/30">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="text-[#C5A059]" size={20} />
                  Tendencias Operativas & Multivariables
                </h3>
                <p className="text-xs text-gray-400">Análisis comparativo en tiempo real con selector de rango temporal.</p>
              </div>

              {/* Time Range Filter Buttons */}
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                {(['24h', '7d', '30d', '12m'] as const).map(tf => (
                  <button
                    key={tf}
                    onClick={() => setTimeFilter(tf)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase ${
                      timeFilter === tf 
                        ? 'bg-[#C5A059] text-black shadow-[0_0_10px_rgba(197,160,89,0.5)]' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Variable Selectors Toggles */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Variables Visibles:</span>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <button 
                  onClick={() => toggleMetric('miles')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                    activeMetrics.miles 
                      ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059] font-bold' 
                      : 'bg-white/5 border-white/10 text-gray-500 line-through'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
                  Millas Recorridas
                </button>

                <button 
                  onClick={() => toggleMetric('fuel')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                    activeMetrics.fuel 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold' 
                      : 'bg-white/5 border-white/10 text-gray-500 line-through'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Eficiencia MPG
                </button>

                <button 
                  onClick={() => toggleMetric('dwell')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                    activeMetrics.dwell 
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400 font-bold' 
                      : 'bg-white/5 border-white/10 text-gray-500 line-through'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  Demora Aduanal (min)
                </button>
              </div>
            </div>

            {/* Line Chart Visual Canvas */}
            <div className="flex flex-col gap-4 w-full pb-2">
              <div className="h-56 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 700 180" preserveAspectRatio="none">
                  {/* Horizontal Grid lines */}
                  <line x1="20" y1="20" x2="680" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                  <line x1="20" y1="65" x2="680" y2="65" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                  <line x1="20" y1="110" x2="680" y2="110" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                  <line x1="20" y1="155" x2="680" y2="155" stroke="rgba(255,255,255,0.1)" />

                  {/* Variable 1: Miles Driven (Gold) */}
                  {activeMetrics.miles && (
                    <>
                      <path
                        d={currentDataset.miles.reduce((acc, val, i, arr) => {
                          const x = 20 + (i / (arr.length - 1)) * 660;
                          const maxVal = Math.max(...arr);
                          const minVal = Math.min(...arr);
                          const y = 155 - ((val - minVal) / (maxVal - minVal || 1)) * 125;
                          return `${acc} ${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }, '')}
                        fill="none"
                        stroke="#C5A059"
                        strokeWidth="3"
                        className="transition-all duration-500"
                      />
                      {currentDataset.miles.map((val, i, arr) => {
                        const x = 20 + (i / (arr.length - 1)) * 660;
                        const maxVal = Math.max(...arr);
                        const minVal = Math.min(...arr);
                        const y = 155 - ((val - minVal) / (maxVal - minVal || 1)) * 125;
                        return (
                          <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="5"
                            className="fill-[#C5A059] stroke-[#0f0f10] stroke-2 hover:r-7 transition-all cursor-pointer"
                          >
                            <title>Millas: {val}</title>
                          </circle>
                        );
                      })}
                    </>
                  )}

                  {/* Variable 2: Fuel Efficiency MPG (Emerald) */}
                  {activeMetrics.fuel && (
                    <>
                      <path
                        d={currentDataset.fuel.reduce((acc, val, i, arr) => {
                          const x = 20 + (i / (arr.length - 1)) * 660;
                          const maxVal = Math.max(...arr);
                          const minVal = Math.min(...arr);
                          const y = 150 - ((val - minVal) / (maxVal - minVal || 1)) * 105;
                          return `${acc} ${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }, '')}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray="6 3"
                        className="transition-all duration-500"
                      />
                      {currentDataset.fuel.map((val, i, arr) => {
                        const x = 20 + (i / (arr.length - 1)) * 660;
                        const maxVal = Math.max(...arr);
                        const minVal = Math.min(...arr);
                        const y = 150 - ((val - minVal) / (maxVal - minVal || 1)) * 105;
                        return (
                          <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="4"
                            className="fill-[#10b981] stroke-[#0f0f10] stroke-2 hover:r-6 transition-all cursor-pointer"
                          >
                            <title>Fuel MPG: {val}</title>
                          </circle>
                        );
                      })}
                    </>
                  )}

                  {/* Variable 3: Dwell Time (Rose) */}
                  {activeMetrics.dwell && (
                    <>
                      <path
                        d={currentDataset.dwell.reduce((acc, val, i, arr) => {
                          const x = 20 + (i / (arr.length - 1)) * 660;
                          const maxVal = Math.max(...arr);
                          const minVal = Math.min(...arr);
                          const y = 150 - ((val - minVal) / (maxVal - minVal || 1)) * 115;
                          return `${acc} ${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }, '')}
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="3"
                        className="transition-all duration-500"
                      />
                      {currentDataset.dwell.map((val, i, arr) => {
                        const x = 20 + (i / (arr.length - 1)) * 660;
                        const maxVal = Math.max(...arr);
                        const minVal = Math.min(...arr);
                        const y = 150 - ((val - minVal) / (maxVal - minVal || 1)) * 115;
                        return (
                          <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="4"
                            className="fill-[#f43f5e] stroke-[#0f0f10] stroke-2 hover:r-6 transition-all cursor-pointer"
                          >
                            <title>Demora: {val} min</title>
                          </circle>
                        );
                      })}
                    </>
                  )}
                </svg>
              </div>

              {/* X-Axis Labels with Padding */}
              <div className="flex justify-between items-center text-[11px] font-semibold text-gray-400 pt-3 px-3 border-t border-white/10">
                {currentDataset.labels.map((lbl, idx) => (
                  <span key={idx} className="text-center">{lbl}</span>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Detailed BI Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart 1: Bar Chart (Freight Volume) */}
            <GlassCard className="lg:col-span-2 flex flex-col gap-6 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-white">Volumen de Carga Mensual (FTL vs LTL)</h3>
                  <p className="text-xs text-gray-400">Comparativa trimestral de millas recorridas e ingresos por segmento.</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <span className="w-3 h-3 rounded-full bg-[#C5A059]" /> FTL
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <span className="w-3 h-3 rounded-full bg-white/30" /> LTL
                  </span>
                </div>
              </div>

              {/* Bar Graph Visual */}
              <div className="h-56 w-full flex items-end justify-between gap-4 pt-6 px-2 border-b border-white/10">
                {[
                  { month: 'Ene', ftl: 65, ltl: 35 },
                  { month: 'Feb', ftl: 78, ltl: 42 },
                  { month: 'Mar', ftl: 85, ltl: 48 },
                  { month: 'Abr', ftl: 70, ltl: 38 },
                  { month: 'May', ftl: 92, ltl: 55 },
                  { month: 'Jun', ftl: 96, ltl: 60 },
                  { month: 'Jul', ftl: 88, ltl: 50 },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      <div 
                        className="w-1/2 bg-gradient-to-t from-[#806430] to-[#C5A059] rounded-t-md transition-all duration-500 group-hover:brightness-125"
                        style={{ height: `${item.ftl}%` }}
                        title={`FTL: ${item.ftl}%`}
                      />
                      <div 
                        className="w-1/2 bg-white/20 rounded-t-md transition-all duration-500 group-hover:bg-white/40"
                        style={{ height: `${item.ltl}%` }}
                        title={`LTL: ${item.ltl}%`}
                      />
                    </div>
                    <span className="text-xs text-gray-400 font-semibold">{item.month}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Chart 2: Gauge / Progress Ring (Fleet Utilization) */}
            <GlassCard className="flex flex-col justify-between gap-6 p-6">
              <div>
                <h3 className="text-lg font-bold text-white">Eficiencia de Flota 5PL</h3>
                <p className="text-xs text-gray-400">Rendimiento global del parque vehicular.</p>
              </div>

              {/* Semi Ring visual */}
              <div className="flex flex-col items-center justify-center py-4 relative">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle cx="96" cy="96" r="76" stroke="rgba(255,255,255,0.08)" strokeWidth="16" fill="transparent" />
                  <circle 
                    cx="96" cy="96" r="76" 
                    stroke="#C5A059" 
                    strokeWidth="16" 
                    strokeDasharray="477" 
                    strokeDashoffset="75" 
                    strokeLinecap="round"
                    fill="transparent" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-black text-white">84.2%</span>
                  <span className="text-xs font-semibold text-[#C5A059] uppercase tracking-wider">Óptimo Operativo</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs border-t border-white/10 pt-4">
                <div>
                  <span className="text-gray-400 block">En Ruta</span>
                  <span className="font-bold text-white">715 Unidades</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Mantenimiento DOT</span>
                  <span className="font-bold text-[#C5A059]">135 Unidades</span>
                </div>
              </div>
            </GlassCard>

          </div>
        </section>
      )}

      {/* TAB 2: UI COMPONENTS & FORM INPUTS */}
      {(activeTab === 'components' || activeTab === 'tokens') && (
        <section className="flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Componentes Base de Formulario e Interacción</h2>
            <p className="text-xs text-gray-400">Estándares para botones, entradas de texto, switches y selecciones.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Buttons Showcase */}
            <GlassCard className="flex flex-col gap-6 p-6">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">Botones (Variantes & Estados)</h3>
              
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">
                  Botón Primario (Gold)
                </Button>
                <Button variant="outline">
                  Botón Outline
                </Button>
                <Button variant="ghost">
                  Botón Ghost
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button variant="primary" disabled>
                  Deshabilitado
                </Button>
                <Button variant="outline">
                  <RefreshCw className="animate-spin" size={16} />
                  Cargando...
                </Button>
              </div>
            </GlassCard>

            {/* Inputs Showcase */}
            <GlassCard className="flex flex-col gap-6 p-6">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">Campos de Entrada (Form Inputs)</h3>
              
              <div className="flex flex-col gap-4">
                <Input label="Nombre del Conductor" placeholder="Ej. Carlos Mendoza" />
                <Select 
                  label="Tipo de Servicio Requerido" 
                  options={[
                    { value: 'ftl', label: 'FTL (Full Truckload)' },
                    { value: 'ltl', label: 'LTL (Consolidado)' },
                    { value: 'reefer', label: 'Reefer (Caja Refrigerada)' }
                  ]}
                />
              </div>
            </GlassCard>

          </div>
        </section>
      )}

      {/* TAB 3: DATA TABLES & STATUS BADGES */}
      {(activeTab === 'tables' || activeTab === 'tokens') && (
        <section className="flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Tablas de Datos BI & Badges de Estado</h2>
            <p className="text-xs text-gray-400">Patrón de tablas de alta densidad de información para monitoreo de unidades.</p>
          </div>

          <GlassCard className="p-6 overflow-x-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Buscar por Tractor o Ruta..." 
                    className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-[#C5A059]"
                  />
                </div>
                <Button variant="outline" className="text-xs px-3 py-2">
                  <Filter size={14} /> Filtros
                </Button>
              </div>
              <span className="text-xs text-gray-400 font-medium">Mostrando 4 de 1,482 Cargas</span>
            </div>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider whitespace-nowrap">
                  <th className="p-3">ID Unidad</th>
                  <th className="p-3">Ruta (Origen &rarr; Destino)</th>
                  <th className="p-3">Modalidad</th>
                  <th className="p-3">Estado CTPAT/Ruta</th>
                  <th className="p-3">Conductor Asignado</th>
                  <th className="p-3">ETA Programado</th>
                  <th className="p-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 whitespace-nowrap">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-mono font-bold text-[#C5A059]">{row.id}</td>
                    <td className="p-3 font-medium text-white">{row.origin} &rarr; {row.destination}</td>
                    <td className="p-3 text-gray-300">{row.type}</td>
                    <td className="p-3">
                      {row.status === 'In Transit' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 font-semibold">
                          <Truck size={12} /> En Tránsito
                        </span>
                      )}
                      {row.status === 'Approved' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                          <CheckCircle2 size={12} /> CTPAT Aprobado
                        </span>
                      )}
                      {row.status === 'Inspection' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold">
                          <Clock size={12} /> Inspección 19-Pts
                        </span>
                      )}
                      {row.status === 'Delayed' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 font-semibold">
                          <XCircle size={12} /> Retrasado
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-gray-300">{row.driver}</td>
                    <td className="p-3 font-mono text-gray-400">{row.eta}</td>
                    <td className="p-3 text-right">
                      <button className="p-1.5 rounded-lg bg-white/5 hover:bg-[#C5A059] hover:text-black text-gray-300 transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </section>
      )}

      {/* TAB 4: DESIGN TOKENS & COLOR SWATCHES */}
      {(activeTab === 'tokens') && (
        <section className="flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Tokens de Diseño (Paleta Oficial Warhorse)</h2>
            <p className="text-xs text-gray-400">Códigos HEX, RGBA y valores de desenfoque para emulación exacta en otros proyectos.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#0f0f10] border border-white/10 flex flex-col gap-2">
              <div className="h-16 rounded-lg bg-[#0f0f10] border border-white/20" />
              <span className="text-xs font-bold text-white">Background Dark</span>
              <span className="text-[10px] text-gray-400 font-mono">#0f0f10</span>
            </div>
            <div className="p-4 rounded-xl bg-[#1A1A1B] border border-white/10 flex flex-col gap-2">
              <div className="h-16 rounded-lg bg-[#1A1A1B]" />
              <span className="text-xs font-bold text-white">Card Base</span>
              <span className="text-[10px] text-gray-400 font-mono">#1A1A1B (70% opacity)</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2">
              <div className="h-16 rounded-lg bg-[#C5A059]" />
              <span className="text-xs font-bold text-white">Accent Gold</span>
              <span className="text-[10px] text-gray-400 font-mono">#C5A059</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2">
              <div className="h-16 rounded-lg bg-emerald-500" />
              <span className="text-xs font-bold text-white">Status Success</span>
              <span className="text-[10px] text-gray-400 font-mono">#10b981</span>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
