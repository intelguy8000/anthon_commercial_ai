'use client';

import { useState, useEffect } from 'react';

interface CashFlowProps {
  projectCost: number;
  weeksTimeline: number;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export default function ProjectCashFlow({ projectCost = 38, weeksTimeline = 8, isExpanded = false, onToggleExpand }: CashFlowProps) {
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
    <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-700">📊 Modelo Financiero</h3>
        {onToggleExpand && (
          <button
            onClick={onToggleExpand}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-xs"
            title={isExpanded ? "Cerrar" : "Expandir"}
          >
            {isExpanded ? '✕' : '⛶'}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Summary Section */}
        <div className="mb-4 grid grid-cols-3 gap-2 text-xs">
          <div className="bg-blue-50 rounded p-2 border border-blue-200">
            <div className="text-blue-600 font-medium">Cliente Paga</div>
            <div className="text-lg font-bold text-blue-700">${totalClientPays.toFixed(1)}M</div>
          </div>
          <div className="bg-red-50 rounded p-2 border border-red-200">
            <div className="text-red-600 font-medium">Loopera Gasta</div>
            <div className="text-lg font-bold text-red-700">${totalLooperaSpends.toFixed(1)}M</div>
          </div>
          <div className="bg-green-50 rounded p-2 border border-green-200">
            <div className="text-green-600 font-medium">Margen</div>
            <div className="text-lg font-bold text-green-700">{profitMargin}%</div>
          </div>
        </div>

        {/* Excel-style Table */}
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[140px,1fr,1fr,1fr] bg-gray-100 border-b border-gray-300 text-xs font-semibold text-gray-700">
            <div className="p-2 border-r border-gray-300">Fase</div>
            <div className="p-2 border-r border-gray-300 text-right">Cliente Paga</div>
            <div className="p-2 border-r border-gray-300 text-right">Loopera Gasta</div>
            <div className="p-2 text-right">Balance</div>
          </div>

          {/* Table Rows */}
          {weeks.slice(0, weeksTimeline).map((week, index) => (
            <div
              key={week.week}
              className={`grid grid-cols-[140px,1fr,1fr,1fr] text-xs border-b border-gray-200 hover:bg-gray-50 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <div className="p-2 border-r border-gray-200 font-medium text-gray-900">
                S{week.week}: {week.phase}
              </div>
              <div className="p-2 border-r border-gray-200 text-right font-semibold text-blue-600">
                {week.clientPays > 0 ? `$${week.clientPays.toFixed(1)}M` : '-'}
              </div>
              <div className="p-2 border-r border-gray-200 text-right font-semibold text-red-600">
                {week.looperaSpends > 0 ? `$${week.looperaSpends.toFixed(1)}M` : '-'}
              </div>
              <div className={`p-2 text-right font-bold ${
                week.looperaBalance > 0 ? 'text-green-700' : 'text-red-700'
              }`}>
                {week.looperaBalance > 0 ? '+' : ''}{week.looperaBalance.toFixed(1)}M
              </div>
            </div>
          ))}

          {/* Total Row */}
          <div className="grid grid-cols-[140px,1fr,1fr,1fr] text-xs bg-gray-200 font-bold">
            <div className="p-2 border-r border-gray-300 text-gray-900">TOTAL</div>
            <div className="p-2 border-r border-gray-300 text-right text-blue-700">
              ${totalClientPays.toFixed(1)}M
            </div>
            <div className="p-2 border-r border-gray-300 text-right text-red-700">
              ${totalLooperaSpends.toFixed(1)}M
            </div>
            <div className="p-2 text-right text-green-700">
              +${looperaProfit.toFixed(1)}M
            </div>
          </div>
        </div>

        {/* Post-Project */}
        <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
          <div className="text-xs font-semibold text-purple-700 mb-2">💰 Mensualidad Recurrente</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-purple-600 font-medium">Loopera: </span>
              <span className="font-bold text-purple-900">$350 USD/mes</span>
            </div>
            <div>
              <span className="text-purple-600 font-medium">Cliente: </span>
              <span className="font-bold text-purple-900">$68 USD/mes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
