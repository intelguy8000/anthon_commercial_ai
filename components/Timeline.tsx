'use client';

import { useState } from 'react';

const milestones = [
  {
    week: 1,
    title: 'Diagnóstico + Diseño',
    tasks: ['Kick-off con equipo', 'Wireframes + mockups aprobados', 'Diseño base de datos'],
    status: 'pending',
    color: 'blue'
  },
  {
    week: '2-4',
    title: 'Desarrollo Core',
    tasks: ['Dashboard con visualizaciones', 'Portal QR + autenticación', 'Upload documentos + DocuSign', 'CRM básico', 'Módulo pagos con validación'],
    status: 'pending',
    color: 'purple'
  },
  {
    week: '5-6',
    title: 'Features Avanzadas',
    tasks: ['Chat AI para gerencia', 'SSO Google/Microsoft', 'Notificaciones automáticas', 'OCR comprobantes', 'Exportación reportes'],
    status: 'pending',
    color: 'green'
  },
  {
    week: 7,
    title: 'Testing + Ajustes',
    tasks: ['Testing completo + corrección bugs'],
    status: 'pending',
    color: 'orange'
  },
  {
    week: 8,
    title: 'Lanzamiento',
    tasks: ['Migración a producción', 'Capacitación (4 horas)', '2 semanas soporte intensivo'],
    status: 'pending',
    color: 'red'
  }
];

export default function Timeline() {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900">Timeline de Desarrollo</h3>
        <p className="text-sm text-gray-500 mt-1">8 semanas desde kick-off hasta lanzamiento</p>
      </div>

      {/* Timeline Visual */}
      <div className="relative">
        {/* Línea de tiempo */}
        <div className="absolute top-10 left-0 right-0 h-1 bg-gray-200"></div>
        <div className="absolute top-10 left-0 h-1 bg-gradient-to-r from-blue-500 to-red-500" style={{ width: '0%' }}></div>

        <div className="relative grid grid-cols-5 gap-4">
          {milestones.map((milestone, index) => {
            const colorClasses = {
              blue: 'bg-blue-500 hover:bg-blue-600',
              purple: 'bg-purple-500 hover:bg-purple-600',
              green: 'bg-green-500 hover:bg-green-600',
              orange: 'bg-orange-500 hover:bg-orange-600',
              red: 'bg-red-500 hover:bg-red-600'
            };

            const bgColors = {
              blue: 'bg-blue-50 border-blue-200',
              purple: 'bg-purple-50 border-purple-200',
              green: 'bg-green-50 border-green-200',
              orange: 'bg-orange-50 border-orange-200',
              red: 'bg-red-50 border-red-200'
            };

            return (
              <div key={index} className="relative">
                {/* Punto en timeline */}
                <button
                  onClick={() => setSelectedMilestone(selectedMilestone === index ? null : index)}
                  className={`relative z-10 w-full flex flex-col items-center cursor-pointer group`}
                >
                  <div className={`w-20 h-20 rounded-full ${colorClasses[milestone.color as keyof typeof colorClasses]}
                    flex items-center justify-center text-white shadow-lg transform transition-all
                    group-hover:scale-110 group-hover:shadow-xl`}>
                    <div className="text-center">
                      <div className="text-xs font-medium opacity-90">Semana</div>
                      <div className="text-2xl font-bold">{milestone.week}</div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <div className="text-sm font-semibold text-gray-900">{milestone.title}</div>
                  </div>
                </button>

                {/* Detalles expandidos */}
                {selectedMilestone === index && (
                  <div className={`absolute top-full mt-4 left-1/2 transform -translate-x-1/2 w-64
                    ${bgColors[milestone.color as keyof typeof bgColors]}
                    border-2 rounded-xl p-4 shadow-xl z-20 animate-fadeIn`}>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4
                      ${bgColors[milestone.color as keyof typeof bgColors]} border-t-2 border-l-2 rotate-45"></div>

                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Tareas:</h4>
                    <ul className="space-y-2">
                      {milestone.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-2 text-xs text-gray-700">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Resumen debajo */}
      <div className="mt-12 grid grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">8</div>
          <div className="text-sm text-gray-600 mt-1">Semanas totales</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">5</div>
          <div className="text-sm text-gray-600 mt-1">Fases principales</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">2</div>
          <div className="text-sm text-gray-600 mt-1">Semanas soporte post-launch</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
