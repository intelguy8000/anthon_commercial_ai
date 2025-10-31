'use client';

import { useState, useEffect } from 'react';

interface CashFlowProps {
  projectCost: number;
  weeksTimeline: number;
}

export default function ProjectCashFlow({ projectCost = 38, weeksTimeline = 8 }: CashFlowProps) {
  // Estructura de pagos del cliente
  const payment1 = projectCost * 0.5; // 50% al firmar
  const payment2 = projectCost * 0.3; // 30% semana 4
  const payment3 = projectCost * 0.2; // 20% entrega

  // Costos mensuales cliente (Azure, etc)
  const monthlyClientCosts = 0.279; // $279K COP

  // Gastos Loopera estimados
  const setupCost = 2; // Millones
  const weeklyDevCost = (projectCost - setupCost - 5) / weeksTimeline; // Distribuido
  const finalCost = 5; // Millones para entrega/soporte

  const weeks = [
    {
      week: 1,
      phase: 'Kick-off',
      clientPays: payment1,
      clientSpends: 0,
      looperaSpends: setupCost,
      looperaBalance: payment1 - setupCost,
      color: 'blue'
    },
    {
      week: 2,
      phase: 'Desarrollo',
      clientPays: 0,
      clientSpends: 0,
      looperaSpends: weeklyDevCost,
      looperaBalance: -weeklyDevCost,
      color: 'purple'
    },
    {
      week: 3,
      phase: 'Desarrollo',
      clientPays: 0,
      clientSpends: 0,
      looperaSpends: weeklyDevCost,
      looperaBalance: -weeklyDevCost,
      color: 'purple'
    },
    {
      week: 4,
      phase: 'Milestone 1',
      clientPays: payment2,
      clientSpends: monthlyClientCosts,
      looperaSpends: weeklyDevCost,
      looperaBalance: payment2 - weeklyDevCost,
      color: 'green'
    },
    {
      week: 5,
      phase: 'Features',
      clientPays: 0,
      clientSpends: 0,
      looperaSpends: weeklyDevCost,
      looperaBalance: -weeklyDevCost,
      color: 'orange'
    },
    {
      week: 6,
      phase: 'Features',
      clientPays: 0,
      clientSpends: 0,
      looperaSpends: weeklyDevCost,
      looperaBalance: -weeklyDevCost,
      color: 'orange'
    },
    {
      week: 7,
      phase: 'Testing',
      clientPays: 0,
      clientSpends: 0,
      looperaSpends: weeklyDevCost,
      looperaBalance: -weeklyDevCost,
      color: 'yellow'
    },
    {
      week: 8,
      phase: 'Entrega',
      clientPays: payment3,
      clientSpends: monthlyClientCosts,
      looperaSpends: finalCost,
      looperaBalance: payment3 - finalCost,
      color: 'red'
    }
  ];

  const totalClientPays = payment1 + payment2 + payment3;
  const totalLooperaSpends = setupCost + (weeklyDevCost * 6) + finalCost;
  const looperaProfit = totalClientPays - totalLooperaSpends;
  const profitMargin = ((looperaProfit / totalClientPays) * 100).toFixed(0);

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Modelo Financiero del Proyecto</h3>
        <p className="text-xs text-gray-500 mt-1">Flujo de caja semana a semana • Total: ${projectCost}M COP</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white">
          <div className="text-xs opacity-90 mb-1">Cliente Paga</div>
          <div className="text-xl font-bold">${totalClientPays.toFixed(1)}M</div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-3 text-white">
          <div className="text-xs opacity-90 mb-1">Loopera Gasta</div>
          <div className="text-xl font-bold">${totalLooperaSpends.toFixed(1)}M</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-3 text-white">
          <div className="text-xs opacity-90 mb-1">Margen</div>
          <div className="text-xl font-bold">{profitMargin}%</div>
        </div>
      </div>

      {/* Weekly Breakdown */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="space-y-2">
          {weeks.slice(0, weeksTimeline).map((week) => (
            <div key={week.week} className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full bg-${week.color}-500 flex items-center justify-center text-white text-xs font-bold`}>
                    S{week.week}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{week.phase}</div>
                  </div>
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded ${
                  week.looperaBalance > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {week.looperaBalance > 0 ? '+' : ''}{week.looperaBalance.toFixed(1)}M
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500 mb-1">Cliente paga</div>
                  <div className="font-semibold text-blue-600">
                    {week.clientPays > 0 ? `+$${week.clientPays.toFixed(1)}M` : '-'}
                  </div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500 mb-1">Loopera gasta</div>
                  <div className="font-semibold text-red-600">
                    {week.looperaSpends > 0 ? `-$${week.looperaSpends.toFixed(1)}M` : '-'}
                  </div>
                </div>
              </div>

              {week.clientSpends > 0 && (
                <div className="mt-2 text-xs text-gray-600 bg-yellow-50 rounded p-2">
                  💰 Cliente también paga: ${week.clientSpends}M COP (Azure + servicios)
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Post-Project Recurring */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs font-semibold text-gray-700 mb-2">Mensualidad Post-Proyecto:</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-purple-50 rounded-lg p-2 border border-purple-200">
            <div className="text-purple-600 font-medium">Loopera Cobra</div>
            <div className="text-lg font-bold text-purple-700">$350 USD/mes</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-2 border border-orange-200">
            <div className="text-orange-600 font-medium">Cliente Gasta</div>
            <div className="text-lg font-bold text-orange-700">$68 USD/mes</div>
            <div className="text-xs text-orange-600">(Azure + servicios)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
