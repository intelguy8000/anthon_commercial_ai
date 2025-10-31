import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Load knowledge base files
const loadKnowledgeBase = () => {
  const kbPath = path.join(process.cwd(), 'knowledge-base');

  try {
    const propuestaEjecutiva = fs.readFileSync(
      path.join(kbPath, 'PROPUESTA_ESTUDIARTE_EJECUTIVA.md'),
      'utf-8'
    );

    const guiaNegociacion = fs.readFileSync(
      path.join(kbPath, 'GUIA_NEGOCIACION_ESTUDIARTE.md'),
      'utf-8'
    );

    return { propuestaEjecutiva, guiaNegociacion };
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    return { propuestaEjecutiva: '', guiaNegociacion: '' };
  }
};

const createSystemPrompt = () => {
  const { propuestaEjecutiva, guiaNegociacion } = loadKnowledgeBase();

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
          controller.error(error);
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
