'use client';

import { useState } from 'react';

const cheatSheets = [
  {
    id: 'red-lines',
    title: 'Líneas Rojas',
    icon: '🚨',
    color: 'red',
    items: [
      { label: 'Precio mínimo', value: '$35M COP (sin consultar a Juan)' },
      { label: 'Soporte máximo', value: '2 horas/mes' },
      { label: 'NO prometer', value: 'App móvil nativa' },
      { label: 'NO incluir', value: 'Facturación DIAN completa' },
      { label: 'NO garantizar', value: 'Integraciones legacy sin análisis' }
    ]
  },
  {
    id: 'numbers',
    title: 'Números Clave',
    icon: '📊',
    color: 'blue',
    items: [
      { label: 'Propuesta actual', value: '$38-40M COP (negociable)' },
      { label: 'ROI esperado', value: '+$180M COP/año en conversiones (+10-15%)' },
      { label: 'Ahorro en tiempo', value: '246 horas/año en transcripción manual' },
      { label: 'Recuperación inversión', value: '2-3 meses' },
      { label: 'Comparación in-house', value: '$360M vs $114.5M (3 años con Loopera)' }
    ]
  },
  {
    id: 'objections',
    title: 'Objeciones',
    icon: '💬',
    color: 'yellow',
    items: [
      {
        label: '"Es muy caro"',
        value: '→ Comparar con costo in-house ($360M vs $114M en 3 años). Enfatizar ROI en 2-3 meses.'
      },
      {
        label: '"¿Por qué no hacerlo interno?"',
        value: '→ Riesgo de dependencia de 1 dev, costos ocultos de mantenimiento, falta de experiencia en UX/infraestructura.'
      },
      {
        label: '"Necesitamos más tiempo"',
        value: '→ Proponer fecha límite razonable pero firme. Ofrecer llamada de aclaración 24-48h antes.'
      },
      {
        label: '"¿Incluye app móvil?"',
        value: '→ NO nativa, pero diseño responsive funciona perfecto en móvil. App nativa = $15-20M adicionales.'
      },
      {
        label: '"¿Qué pasa si quiebran?"',
        value: '→ Código fuente entregado en GitHub. Despliegue en su Azure si prefieren. Garantía de transición.'
      }
    ]
  },
  {
    id: 'closing',
    title: 'Tips de Cierre',
    icon: '✅',
    color: 'green',
    items: [
      { label: '1', value: 'Usar el silencio después de presentar precio' },
      { label: '2', value: 'Preguntar: "¿Qué necesitas para tomar la decisión?"' },
      { label: '3', value: 'Ofrecer sesión de demo en vivo con su data' },
      { label: '4', value: 'Proponer cronograma de implementación concreto' },
      { label: '5', value: 'Crear urgencia: "Podríamos empezar la próxima semana"' }
    ]
  }
];

export default function CheatSheetTabs() {
  const [activeTab, setActiveTab] = useState('red-lines');

  const activeSheet = cheatSheets.find(sheet => sheet.id === activeTab);

  const colorClasses = {
    red: { border: 'border-red-200', bg: 'bg-red-50', text: 'text-red-700', active: 'bg-red-100 border-red-500' },
    blue: { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-700', active: 'bg-blue-100 border-blue-500' },
    yellow: { border: 'border-yellow-200', bg: 'bg-yellow-50', text: 'text-yellow-700', active: 'bg-yellow-100 border-yellow-500' },
    green: { border: 'border-green-200', bg: 'bg-green-50', text: 'text-green-700', active: 'bg-green-100 border-green-500' }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Tabs Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {cheatSheets.map((sheet) => (
          <button
            key={sheet.id}
            onClick={() => setActiveTab(sheet.id)}
            className={`px-4 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all
              flex items-center gap-2 border-2
              ${activeTab === sheet.id
                ? colorClasses[sheet.color as keyof typeof colorClasses].active
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
          >
            <span className="text-lg">{sheet.icon}</span>
            <span>{sheet.title}</span>
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      {activeSheet && (
        <div className={`rounded-xl border-2 p-6 ${colorClasses[activeSheet.color as keyof typeof colorClasses].border}
          ${colorClasses[activeSheet.color as keyof typeof colorClasses].bg}`}>
          <div className="space-y-4">
            {activeSheet.items.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                    font-bold text-sm ${colorClasses[activeSheet.color as keyof typeof colorClasses].bg}
                    ${colorClasses[activeSheet.color as keyof typeof colorClasses].text}`}>
                    {item.label.length <= 2 ? item.label : '•'}
                  </div>
                  <div className="flex-1">
                    {item.label.length > 2 && (
                      <div className="font-semibold text-gray-900 mb-1">{item.label}</div>
                    )}
                    <div className="text-sm text-gray-700 leading-relaxed">{item.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
