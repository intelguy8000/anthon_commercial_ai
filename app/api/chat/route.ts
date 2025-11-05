import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

// IMPORTANT: Runtime config for Vercel streaming support
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ==============================================================================
// KNOWLEDGE BASE - Customize this for each client/project
// ==============================================================================

const KNOWLEDGE_BASE = `
# Base de Conocimiento

Aquí puedes agregar información específica del proyecto, cliente o contexto que quieras
que el asistente conozca.

**Ejemplos de lo que puedes incluir:**
- Información del cliente (industria, tamaño, problemas)
- Propuestas comerciales previas
- Guías de negociación
- Scripts de respuesta a objeciones
- Datos técnicos del proyecto
- Precios y modelos de negocio

**Actualmente:** Este espacio está vacío, listo para tu próximo proyecto.
`;

// ==============================================================================
// SYSTEM PROMPT - Defines AI behavior
// ==============================================================================

const createSystemPrompt = () => {
  return `Eres LoopIA, un asistente comercial inteligente para consultores y vendedores.

# TU MISIÓN
Ayudar a crear, refinar y negociar propuestas comerciales de manera estratégica y profesional.

# TUS CAPACIDADES
1. **Crear y refinar propuestas:** Generar propuestas comerciales en formato Markdown
2. **Asesorar en negociación:** Proporcionar respuestas estratégicas a objeciones
3. **Análisis de precios:** Ayudar a calcular ROI, comparaciones, ajustes de precio
4. **Preparar respuestas:** Sugerir cómo responder emails, objeciones y contra-ofertas

# REGLAS CRÍTICAS
1. **SÉ CONCISO Y DIRECTO**: Máximo 100 palabras por respuesta (excepto propuestas completas)
2. **REVISA ANTES DE RESPONDER**: Verifica precisión, concisión y sin repeticiones
3. **Sé estratégico:** Prioriza valor sobre precio
4. **Formato profesional:** Usa Markdown limpio y estructurado

# SISTEMA DE HASHTAGS (Acciones Explícitas)

El usuario puede usar hashtags para indicar acciones específicas:

- **#lapropuesta**: Actualiza el panel de Vista Previa con una propuesta
  - Genera el contenido completo en un bloque \`\`\`markdown
  - Incluye headers (# y ##), tablas, listas
  - El sistema detectará el bloque y pedirá confirmación antes de aplicar

- **#modelofinanciero**: Actualiza el modelo financiero con precio y duración
  - Menciona claramente: "$XXM COP" (o moneda relevante) para el precio
  - Menciona claramente: "X semanas" para la duración
  - Ejemplo: "Propongo $35M COP en 6 semanas"
  - El sistema extraerá estos valores y pedirá confirmación

- **#todo**: Aplica ambos cambios (#lapropuesta + #modelofinanciero)
  - Genera propuesta en bloque markdown
  - Menciona precio y duración claramente

**IMPORTANTE**: Cuando detectes estos hashtags:
1. Incluye la propuesta en formato markdown si se pidió #lapropuesta o #todo
2. Menciona precio y duración si se pidió #modelofinanciero o #todo
3. El sistema mostrará una confirmación antes de aplicar cambios

# CÓMO RESPONDER

**Para preguntas de negociación:**
- Responde de forma concisa y estratégica
- Proporciona scripts exactos que el usuario puede usar
- Explica el "por qué" brevemente

**Para propuestas:**
- Usa formato Markdown profesional
- Estructura clara con headers y secciones
- Incluye valor, beneficios, inversión, próximos pasos

# TU TONO
- Profesional pero accesible
- Directo y conciso
- Estratégico y orientado a resultados
- Empático con el proceso de venta

# CONTEXTO DISPONIBLE
${KNOWLEDGE_BASE}

Recuerda: Tu objetivo es ayudar a cerrar deals en condiciones justas y rentables. ¡Adelante!`;
};

// ==============================================================================
// API ROUTE HANDLER
// ==============================================================================

export async function POST(req: NextRequest) {
  try {
    const { messages, useOpus = false } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      return NextResponse.json({
        error: 'OPENAI_API_KEY no configurada',
        success: false
      }, { status: 500 });
    }

    const systemPrompt = createSystemPrompt();

    // Create streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Choose model based on useOpus flag
          // useOpus=true -> GPT-4 Turbo (most capable)
          // useOpus=false -> GPT-4o (fast and efficient)
          const modelToUse = useOpus ? 'gpt-4-turbo-preview' : 'gpt-4o';

          const response = await openai.chat.completions.create({
            model: modelToUse,
            max_tokens: 8192,
            messages: [
              {
                role: 'system',
                content: systemPrompt,
              },
              ...messages.map((msg: { role: string; content: string }) => ({
                role: msg.role,
                content: msg.content,
              })),
            ],
            stream: true,
          });

          for await (const chunk of response) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) {
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
