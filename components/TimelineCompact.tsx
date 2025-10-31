'use client';

interface TimelineCompactProps {
  weeksTotal: number;
}

export default function TimelineCompact({ weeksTotal = 8 }: TimelineCompactProps) {
  const phases = [
    { name: 'Kick-off', weeks: 1, color: 'bg-blue-500', icon: '🚀' },
    { name: 'Desarrollo Core', weeks: 3, color: 'bg-purple-500', icon: '⚙️' },
    { name: 'Features', weeks: 2, color: 'bg-green-500', icon: '✨' },
    { name: 'Testing', weeks: 1, color: 'bg-orange-500', icon: '🧪' },
    { name: 'Lanzamiento', weeks: 1, color: 'bg-red-500', icon: '🎉' }
  ];

  const adjustedPhases = phases.map((phase, index) => {
    const ratio = weeksTotal / 8;
    return {
      ...phase,
      adjustedWeeks: Math.max(1, Math.round(phase.weeks * ratio))
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Timeline de Desarrollo</h3>
          <p className="text-xs text-gray-500 mt-1">Duración total: {weeksTotal} semanas</p>
        </div>
        <div className="px-3 py-1.5 bg-gray-100 rounded-full text-sm font-semibold text-gray-700">
          {adjustedPhases.reduce((sum, p) => sum + p.adjustedWeeks, 0)} semanas
        </div>
      </div>

      {/* Timeline horizontal */}
      <div className="relative">
        <div className="flex items-center gap-2">
          {adjustedPhases.map((phase, index) => {
            const width = (phase.adjustedWeeks / weeksTotal) * 100;
            return (
              <div
                key={index}
                className="relative group cursor-pointer"
                style={{ width: `${width}%` }}
              >
                {/* Barra de fase */}
                <div className={`h-12 ${phase.color} rounded-lg flex items-center justify-center
                  hover:shadow-lg transition-all duration-200 hover:scale-105`}>
                  <span className="text-2xl">{phase.icon}</span>
                </div>

                {/* Tooltip en hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                  opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
                    <div className="font-semibold">{phase.name}</div>
                    <div className="text-gray-300">{phase.adjustedWeeks} semana{phase.adjustedWeeks > 1 ? 's' : ''}</div>
                  </div>
                  <div className="w-2 h-2 bg-gray-900 transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
                </div>

                {/* Label abajo */}
                <div className="text-center mt-2">
                  <div className="text-xs font-semibold text-gray-700">{phase.name}</div>
                  <div className="text-xs text-gray-500">{phase.adjustedWeeks}sem</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicador de progreso */}
        <div className="mt-4 bg-gray-100 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 h-full w-0
            transition-all duration-1000 ease-out" style={{ width: '0%' }}></div>
        </div>

        {/* Info adicional */}
        <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
          <div className="bg-blue-50 rounded-lg p-2 text-center border border-blue-200">
            <div className="font-semibold text-blue-700">Inicio</div>
            <div className="text-blue-600">Semana 1</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-2 text-center border border-purple-200">
            <div className="font-semibold text-purple-700">Entrega</div>
            <div className="text-purple-600">Semana {weeksTotal}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-2 text-center border border-green-200">
            <div className="font-semibold text-green-700">Soporte</div>
            <div className="text-green-600">+2 semanas</div>
          </div>
        </div>
      </div>
    </div>
  );
}
