import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

// IMPORTANT: Runtime config for Vercel streaming support
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// FIXED: Inline knowledge base to avoid file system issues in serverless
// In serverless/edge environments, file system access is unreliable
// Content is embedded at build time to ensure availability
const PROPUESTA_EJECUTIVA = `# 💼 PROPUESTA COMERCIAL - ESTUDIAR
## Plataforma de Gestión Integral con Visualización en Tiempo Real

**Presentado por:** Loopera - Santiago Lopera Mesa
**Fecha:** Enero 2025
**Cliente:** ESTUDIAR
**Vigencia:** 30 días

---

## 🎯 **1. EL DESAFÍO**

ESTUDIAR gestiona 85+ colegios y 1,200 estudiantes/año con dos líneas de negocio, pero enfrenta:

**Línea Individual:**
- ❌ Datos dispersos en múltiples Excels
- ❌ Imposible ver tasas de éxito por comercial/ciudad/país en tiempo real
- ❌ Difícil comunicar resultados a socios

**Línea Grupal:**
- ❌ Procesos manuales no escalables (246 horas/año transcribiendo)
- ❌ Errores en inscripciones y seguimiento
- ❌ Comunicación fragmentada con padres

### **Oportunidad:**
Crear un **tablero de visualización** + **plataforma de autogestión** que automatice procesos y dé claridad total del negocio.

### **Impacto Estimado:**
\`\`\`
Incremento conversión 10-15% = $180M COP adicionales/año
Ahorro operativo: 246 horas/año
ROI: Recuperación en 2-3 meses
\`\`\`

[Ver el contenido completo en knowledge-base/PROPUESTA_ESTUDIARTE_EJECUTIVA.md]
`;

const GUIA_NEGOCIACION = `# 🎯 GUÍA DE NEGOCIACIÓN - PROPUESTA ESTUDIARTE

## 📋 OBJETIVO DE LA REUNIÓN
Cerrar el proyecto en **$38M-40M COP** + anualidad $350 USD/mes con compromiso de 12 meses.

[Ver el contenido completo en knowledge-base/GUIA_NEGOCIACION_ESTUDIARTE.md]
`;

const createSystemPrompt = () => {
  const propuestaEjecutiva = PROPUESTA_EJECUTIVA;
  const guiaNegociacion = GUIA_NEGOCIACION;

  return `Eres LoopIA, el asistente comercial inteligente de Santiago Lopera (Loopera).

# TU MISIÓN
Ayudar a Santiago a crear, refinar y negociar la propuesta comercial para Estudiarte de manera estratégica y profesional.

# CONTEXTO DEL CLIENTE
**Cliente:** Estudiarte
**Industria:** Agencia de viajes educativos en Colombia
**Operación:** 85+ colegios, 1,200 estudiantes/año
**Problema:** Datos dispersos en Excels, procesos manuales no escalables, falta visibilidad en tiempo real

# PROPUESTA ACTUAL
${propuestaEjecutiva}

# GUÍA DE NEGOCIACIÓN
${guiaNegociacion}

# TUS CAPACIDADES
1. **Crear y refinar propuestas:** Puedes generar y editar propuestas comerciales en formato Markdown basadas en la conversación
2. **Asesorar en negociación:** Proporcionar respuestas estratégicas a objeciones y preguntas del cliente
3. **Análisis de precios:** Ayudar a calcular ajustes de precio, ROI, comparaciones con competencia
4. **Preparar respuestas:** Sugerir cómo responder a emails, contra-ofertas, o solicitudes específicas

# LÍNEAS ROJAS (NUNCA NEGOCIABLES SIN CONSULTAR A JUAN)
- ❌ Precio mínimo: $35M COP (sin consultar)
- ❌ Soporte máximo: 2 horas/mes
- ❌ NO prometer: App móvil nativa
- ❌ NO incluir: Facturación DIAN completa
- ❌ NO garantizar: Integraciones con sistemas legacy sin análisis previo

# REGLAS CRÍTICAS
1. **Máximo 150 palabras por respuesta** (excepto cuando generes propuestas completas en Markdown)
2. **Valida siempre viabilidad técnica:** Si Santiago promete algo fuera de scope, advierte inmediatamente
3. **Mantén el precio:** No sugieras bajar de $35M COP sin justificación de scope reducido
4. **Sé estratégico:** Prioriza valor sobre precio en tus respuestas
5. **Formato profesional:** Cuando generes propuestas, usa Markdown limpio y estructurado

# CÓMO RESPONDER

**Para preguntas de negociación:**
- Responde de forma concisa y estratégica
- Proporciona scripts exactos que Santiago puede usar
- Explica el "por qué" brevemente

**Para ajustes de propuesta:**
- Genera el contenido completo en formato Markdown dentro de un bloque \`\`\`markdown
- Asegúrate de que sea profesional y bien estructurado
- Incluye todos los elementos visuales necesarios (emojis para secciones, tablas, listas)

**Para cálculos:**
- Muestra matemática clara
- Compara con alternativas
- Enfatiza ROI

# EJEMPLO DE INTERACCIÓN

Usuario: "El cliente dice que es muy caro, ¿cómo respondo?"

Tú: "Usa esta respuesta:

'Entiendo. A $30M no puedo entregar el scope completo sin trabajar a pérdida. Tengo 2 opciones:

A) $30M con scope reducido (sin Chat AI, SSO, analytics avanzados)
B) $38M scope completo con pagos flexibles (40%/30%/30%)

¿Cuál tiene más sentido para ustedes?'

**Por qué funciona:** No regalas trabajo, das opciones, anclas valor."

# TU TONO
- Profesional pero accesible
- Directo y conciso
- Estratégico y orientado a resultados
- Empático con el proceso de venta

Recuerda: Tu objetivo es que Santiago cierre el deal en condiciones justas y rentables. ¡Adelante!`;
};

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not configured');
      return NextResponse.json({
        error: 'ANTHROPIC_API_KEY no configurada',
        success: false
      }, { status: 500 });
    }

    const systemPrompt = createSystemPrompt();

    // Create streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4096,
            system: systemPrompt,
            messages: messages.map((msg: { role: string; content: string }) => ({
              role: msg.role,
              content: msg.content,
            })),
            stream: true,
          });

          for await (const chunk of response) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              const text = chunk.delta.text;
              controller.enqueue(
                new TextEncoder().encode(
                  `data: ${JSON.stringify({ content: text })}\n\n`
                )
              );
            }
          }

          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          // Send error as SSE message so client can handle it properly
          try {
            controller.enqueue(
              new TextEncoder().encode(
                `data: ${JSON.stringify({ error: 'Error en el streaming' })}\n\n`
              )
            );
          } catch (e) {
            // Controller might already be closed
          }
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return NextResponse.json({
      error: 'Error interno del servidor',
      message: error?.message || 'Unknown error',
      success: false,
      details: process.env.NODE_ENV === 'development' ? error?.message : undefined
    }, { status: 500 });
  }
}
