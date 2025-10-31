'use client';

interface TimelineCompactProps {
  weeksTotal: number;
}

export default function TimelineCompact({ weeksTotal = 8 }: TimelineCompactProps) {
  const phases = [
    { name: 'Kick-off', weeks: 1, color: 'bg-purple-300', icon: '🚀' },
    { name: 'Desarrollo Core', weeks: 3, color: 'bg-purple-500', icon: '⚙️' },
    { name: 'Features', weeks: 2, color: 'bg-purple-600', icon: '✨' },
    { name: 'Testing', weeks: 1, color: 'bg-purple-700', icon: '🧪' },
    { name: 'Lanzamiento', weeks: 1, color: 'bg-purple-900', icon: '🎉' },
    { name: 'Soporte', weeks: 2, color: 'bg-purple-400', icon: '🛠️' }
  ];

  const adjustedPhases = phases.map((phase, index) => {
    const ratio = weeksTotal / 8;
    return {
      ...phase,
      adjustedWeeks: Math.max(1, Math.round(phase.weeks * ratio))
    };
  });

  const totalWeeksWithSupport = adjustedPhases.reduce((sum, p) => sum + p.adjustedWeeks, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Timeline</h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Semana 1</span>
          <span>→</span>
          <span>Semana {totalWeeksWithSupport}</span>
          <span className="ml-2 text-gray-400">({weeksTotal} desarrollo + 2 soporte)</span>
        </div>
      </div>

      {/* Single Line Timeline */}
      <div className="relative px-4">
        {/* Línea horizontal */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700"></div>

        {/* Eventos/Fases */}
        <div className="relative flex justify-between items-start">
          {adjustedPhases.map((phase, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              {/* Círculo del evento */}
              <div className={`w-10 h-10 ${phase.color} rounded-full flex items-center justify-center
                border-4 border-white shadow-md hover:scale-110 transition-transform z-10`}>
                <span className="text-lg">{phase.icon}</span>
              </div>

              {/* Label */}
              <div className="mt-2 text-center">
                <div className="text-xs font-semibold text-gray-700 whitespace-nowrap">{phase.name}</div>
                <div className="text-xs text-gray-500">{phase.adjustedWeeks}sem</div>
              </div>

              {/* Tooltip en hover */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2
                opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                <div className="bg-gray-900 text-white text-xs rounded-lg py-1.5 px-3 whitespace-nowrap">
                  {phase.name}: {phase.adjustedWeeks} semana{phase.adjustedWeeks > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
