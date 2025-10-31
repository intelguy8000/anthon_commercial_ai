'use client';

import { useState } from 'react';

export default function FinancialModel() {
  const [projectCost, setProjectCost] = useState(38);
  const [conversionIncrease, setConversionIncrease] = useState(15);
  const [yearlyCost, setYearlyCost] = useState(17.2);

  const additionalRevenue = (1200 * 1.5 * conversionIncrease / 100);
  const totalRevenue = additionalRevenue * 1000000;
  const roi = ((totalRevenue - (projectCost * 1000000)) / (projectCost * 1000000) * 100).toFixed(0);
  const breakEvenMonths = Math.ceil((projectCost * 1000000) / (totalRevenue / 12));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Modelo Financiero</h3>
          <p className="text-sm text-gray-500 mt-1">Ajusta las variables para ver el impacto</p>
        </div>
        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
          Resetear
        </button>
      </div>

      {/* Variables ajustables */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <label className="block text-sm font-semibold text-blue-900 mb-3">
            Costo del Proyecto
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="30"
              max="45"
              value={projectCost}
              onChange={(e) => setProjectCost(Number(e.target.value))}
              className="flex-1"
            />
            <div className="text-2xl font-bold text-blue-700">${projectCost}M</div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <label className="block text-sm font-semibold text-green-900 mb-3">
            Aumento Conversión
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="5"
              max="25"
              value={conversionIncrease}
              onChange={(e) => setConversionIncrease(Number(e.target.value))}
              className="flex-1"
            />
            <div className="text-2xl font-bold text-green-700">{conversionIncrease}%</div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <label className="block text-sm font-semibold text-purple-900 mb-3">
            Costo Anual Soporte
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="15"
              max="25"
              step="0.1"
              value={yearlyCost}
              onChange={(e) => setYearlyCost(Number(e.target.value))}
              className="flex-1"
            />
            <div className="text-2xl font-bold text-purple-700">${yearlyCost}M</div>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="text-sm font-medium opacity-90 mb-2">Revenue Adicional</div>
          <div className="text-3xl font-bold">${additionalRevenue.toFixed(0)}M</div>
          <div className="text-xs opacity-75 mt-2">COP/año</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="text-sm font-medium opacity-90 mb-2">ROI Primer Año</div>
          <div className="text-3xl font-bold">{roi}%</div>
          <div className="text-xs opacity-75 mt-2">Retorno sobre inversión</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="text-sm font-medium opacity-90 mb-2">Break-even</div>
          <div className="text-3xl font-bold">{breakEvenMonths}</div>
          <div className="text-xs opacity-75 mt-2">meses</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="text-sm font-medium opacity-90 mb-2">Costo Total 3 Años</div>
          <div className="text-3xl font-bold">${(projectCost + (yearlyCost * 3)).toFixed(0)}M</div>
          <div className="text-xs opacity-75 mt-2">vs $360M in-house</div>
        </div>
      </div>

      {/* Comparación visual */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Comparación 3 Años</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Con Loopera</span>
              <span className="font-semibold text-gray-900">${(projectCost + (yearlyCost * 3)).toFixed(1)}M COP</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${((projectCost + (yearlyCost * 3)) / 360 * 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Developer In-house</span>
              <span className="font-semibold text-gray-900">$360M COP</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-red-600" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-green-600">Ahorro Total:</span>
            <span className="text-xl font-bold text-green-600">
              ${(360 - (projectCost + (yearlyCost * 3))).toFixed(0)}M COP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
