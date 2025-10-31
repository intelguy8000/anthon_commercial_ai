'use client';

export default function CheatSheet() {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-primary">
        <h2 className="text-xl font-bold text-white">📋 Cheat Sheet</h2>
        <p className="text-sm text-white/80 mt-1">Guía rápida de negociación</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {/* Líneas Rojas */}
        <section className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <h3 className="text-lg font-bold text-red-700 mb-3">🚨 Líneas Rojas (NO negociables)</h3>
          <ul className="space-y-2 text-sm text-red-900">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Precio mínimo:</strong> $35M COP (sin consultar a Juan)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Soporte máximo:</strong> 2 horas/mes</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>NO prometer:</strong> App móvil nativa</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>NO incluir:</strong> Facturación DIAN (solo reportes)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>NO garantizar:</strong> Integraciones con sistemas legacy sin análisis</span>
            </li>
          </ul>
        </section>

        {/* Números Clave */}
        <section className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h3 className="text-lg font-bold text-blue-700 mb-3">📊 Números Clave</h3>
          <div className="space-y-3 text-sm text-blue-900">
            <div>
              <p className="font-semibold">Propuesta actual:</p>
              <p>$38-40M COP (precio negociable)</p>
            </div>
            <div>
              <p className="font-semibold">ROI esperado:</p>
              <p>+$180M COP/año en conversiones (+10-15%)</p>
            </div>
            <div>
              <p className="font-semibold">Ahorro en tiempo:</p>
              <p>246 horas/año en transcripción manual</p>
            </div>
            <div>
              <p className="font-semibold">Recuperación inversión:</p>
              <p>2-3 meses</p>
            </div>
            <div>
              <p className="font-semibold">Comparación in-house:</p>
              <p>$360M vs $114.5M (3 años con Loopera)</p>
            </div>
          </div>
        </section>

        {/* Objeciones Comunes */}
        <section className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <h3 className="text-lg font-bold text-yellow-700 mb-3">💬 Objeciones Comunes</h3>
          <div className="space-y-4 text-sm text-yellow-900">
            <div>
              <p className="font-semibold">❓ "Es muy caro"</p>
              <p className="text-xs mt-1">
                → Comparar con costo in-house ($360M vs $114M en 3 años).
                Enfatizar ROI en 2-3 meses.
              </p>
            </div>
            <div>
              <p className="font-semibold">❓ "¿Por qué no hacerlo interno?"</p>
              <p className="text-xs mt-1">
                → Riesgo de dependencia de 1 dev, costos ocultos de mantenimiento,
                falta de experiencia en UX/infraestructura.
              </p>
            </div>
            <div>
              <p className="font-semibold">❓ "Necesitamos más tiempo"</p>
              <p className="text-xs mt-1">
                → Proponer fecha límite razonable pero firme. Ofrecer llamada de
                aclaración 24-48h antes.
              </p>
            </div>
            <div>
              <p className="font-semibold">❓ "¿Incluye app móvil?"</p>
              <p className="text-xs mt-1">
                → NO nativa, pero diseño responsive funciona perfecto en móvil.
                App nativa = $15-20M adicionales.
              </p>
            </div>
            <div>
              <p className="font-semibold">❓ "¿Qué pasa si quiebran?"</p>
              <p className="text-xs mt-1">
                → Código fuente entregado en GitHub. Despliegue en su Azure si
                prefieren. Garantía de transición.
              </p>
            </div>
          </div>
        </section>

        {/* Tips de Cierre */}
        <section className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <h3 className="text-lg font-bold text-green-700 mb-3">✅ Tips de Cierre</h3>
          <ul className="space-y-2 text-sm text-green-900">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <span>Usar el silencio después de presentar precio</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <span>Preguntar: "¿Qué necesitas para tomar la decisión?"</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <span>Ofrecer sesión de demo en vivo con su data</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">4.</span>
              <span>Proponer cronograma de implementación concreto</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">5.</span>
              <span>Crear urgencia: "Podríamos empezar la próxima semana"</span>
            </li>
          </ul>
        </section>

        {/* Respaldo Técnico */}
        <section className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
          <h3 className="text-lg font-bold text-purple-700 mb-3">🔧 Respaldo Técnico</h3>
          <div className="space-y-2 text-sm text-purple-900">
            <p><strong>Stack:</strong> Next.js, TypeScript, Azure SQL, OpenAI</p>
            <p><strong>Hosting:</strong> Azure (99.95% uptime)</p>
            <p><strong>Seguridad:</strong> SSL, encriptación, backups diarios</p>
            <p><strong>Mantenimiento:</strong> Incluido primer año</p>
            <p><strong>Soporte:</strong> Email 24-48h, llamadas emergencia</p>
          </div>
        </section>
      </div>
    </div>
  );
}
