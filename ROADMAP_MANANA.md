# 🚀 ROADMAP MAÑANA - LUPIA MVP

## ✅ LO QUE YA ESTÁ LISTO

- ✅ Propuesta Estudiarte (versión final HTML + MD)
- ✅ Guía de negociación completa
- ✅ Documentación técnica (PROJECT_OVERVIEW.md)
- ✅ Repo inicializado con estructura
- ✅ Knowledge base con 4 documentos comerciales

---

## 🎯 OBJETIVO MAÑANA

Crear **Lupia MVP** - Interfaz web donde Santi puede:
1. Chatear con Claude AI sobre la propuesta
2. Ver preview de la propuesta en tiempo real
3. Tener cheat sheet de negociación visible

**Tiempo estimado:** 2-3 horas

---

## 📋 PASOS A SEGUIR (EN ORDEN)

### **PASO 1: Setup Next.js (10 min)**

```bash
cd /Users/juanus/anthon_commercial_ai

# Crear app Next.js
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Cuando pregunte:
# ✓ TypeScript? Yes
# ✓ ESLint? Yes
# ✓ Tailwind CSS? Yes
# ✓ App Router? Yes
# ✓ Import alias? No

# Instalar dependencias adicionales
npm install @anthropic-ai/sdk
npm install react-markdown
npm install gray-matter
```

---

### **PASO 2: Configurar Variables de Entorno (2 min)**

```bash
# Crear archivo .env.local
cat > .env.local << 'EOF'
ANTHROPIC_API_KEY=sk-ant-api03-tu-key-aqui
EOF
```

**IMPORTANTE:** Pedir a Juan su API key de Anthropic

---

### **PASO 3: Crear Estructura de Carpetas (1 min)**

```bash
mkdir -p app/api/chat
mkdir -p components
mkdir -p lib
```

---

### **PASO 4: Crear API Route para Chat (5 min)**

**Archivo:** `app/api/chat/route.ts`

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  // Leer propuesta desde knowledge-base
  const propuestaPath = path.join(process.cwd(), 'knowledge-base', 'PROPUESTA_ESTUDIARTE_EJECUTIVA.md');
  const guiaPath = path.join(process.cwd(), 'knowledge-base', 'GUIA_NEGOCIACION_ESTUDIARTE.md');

  const propuesta = fs.readFileSync(propuestaPath, 'utf-8');
  const guia = fs.readFileSync(guiaPath, 'utf-8');

  const systemPrompt = `Eres Lupia, asistente comercial experto de Loopera.

CONTEXTO DEL CLIENTE ACTUAL: Estudiarte
- Agencia de viajes educativos en Colombia
- 85+ colegios, 1,200 estudiantes/año
- Necesitan: Dashboard + Portal web + CRM + Pagos
- Presupuesto estimado: $38M-40M COP
- Línea roja: NO bajar de $35M COP

TU ROL:
1. Ayudar a Santiago (consultor comercial) en negociación
2. Sugerir respuestas a objeciones del cliente
3. Alertar si promete algo técnicamente imposible
4. Mantener coherencia en números y alcance

CONOCIMIENTO TÉCNICO:
${propuesta}

GUÍA DE NEGOCIACIÓN:
${guia}

REGLAS:
- NUNCA bajar de $35M sin consultar a Juan
- NUNCA prometer features no discutidas (app móvil, etc.)
- SIEMPRE validar viabilidad técnica antes de prometer
- Respuestas concisas (máx 150 palabras)

Si cliente pregunta algo fuera de scope:
"Déjame consultarlo con el equipo técnico y te confirmo en 24h"`;

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const stream = await anthropic.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      ...history,
      { role: 'user', content: message }
    ],
  });

  const encoder = new TextEncoder();

  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

---

### **PASO 5: Crear Componente de Chat (10 min)**

**Archivo:** `components/chat-panel.tsx`

```typescript
'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const text = decoder.decode(value);
        assistantMessage += text;

        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];

          if (lastMessage?.role === 'assistant') {
            lastMessage.content = assistantMessage;
          } else {
            newMessages.push({ role: 'assistant', content: assistantMessage });
          }

          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Chat con Lupia</h2>
        <p className="text-sm text-gray-600">Asistente comercial para Estudiarte</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
              msg.role === 'user'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <p className="text-sm text-gray-600">Lupia está escribiendo...</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Escribe tu pregunta..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### **PASO 6: Crear Preview de Propuesta (5 min)**

**Archivo:** `components/proposal-preview.tsx`

```typescript
'use client';

import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';

export default function ProposalPreview() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/knowledge-base/PROPUESTA_ESTUDIARTE_EJECUTIVA.md')
      .then(res => res.text())
      .then(text => setContent(text));
  }, []);

  return (
    <div className="h-full overflow-y-auto bg-white p-6">
      <div className="max-w-3xl mx-auto prose prose-sm">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
```

---

### **PASO 7: Crear Cheat Sheet (5 min)**

**Archivo:** `components/cheat-sheet.tsx`

```typescript
'use client';

export default function CheatSheet() {
  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-4">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Cheat Sheet</h3>

      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <h4 className="font-bold text-red-900 text-sm mb-2">🚨 LÍNEAS ROJAS</h4>
          <ul className="text-xs text-red-800 space-y-1">
            <li>• Precio mínimo: $35M COP</li>
            <li>• Tiempo mínimo: 8 semanas</li>
            <li>• No prometer facturación DIAN</li>
            <li>• No prometer app móvil</li>
            <li>• Soporte: máx 2h/mes</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h4 className="font-bold text-gray-900 text-sm mb-2">💬 TOP 5 OBJECIONES</h4>

          <div className="space-y-2 text-xs">
            <div>
              <p className="font-semibold text-gray-800">1. "Es muy caro"</p>
              <p className="text-gray-600">→ Mostrar ROI: recuperación en 2-3 meses</p>
            </div>

            <div>
              <p className="font-semibold text-gray-800">2. "¿Por qué no in-house?"</p>
              <p className="text-gray-600">→ Developer: $8M/mes × 6 = $48M + prestaciones</p>
            </div>

            <div>
              <p className="font-semibold text-gray-800">3. "Necesitamos más tiempo"</p>
              <p className="text-gray-600">→ Precio lanzamiento válido hasta 31 enero</p>
            </div>

            <div>
              <p className="font-semibold text-gray-800">4. "¿Incluye app móvil?"</p>
              <p className="text-gray-600">→ Web es responsive. App nativa: +$25M</p>
            </div>

            <div>
              <p className="font-semibold text-gray-800">5. "¿Qué si quiebran?"</p>
              <p className="text-gray-600">→ Código vía escrow + licencia perpetua</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <h4 className="font-bold text-green-900 text-sm mb-2">💡 TIPS DE CIERRE</h4>
          <ul className="text-xs text-green-800 space-y-1">
            <li>• Mencionar Chat AI (único)</li>
            <li>• SSO es bonus gratis</li>
            <li>• Ahorro $631M/año en pagos</li>
            <li>• 8 semanas vs 9-11 mercado</li>
            <li>• Demos semanales (ven progreso)</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h4 className="font-bold text-blue-900 text-sm mb-2">📊 NÚMEROS CLAVE</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Inversión: $38M (hasta 31 ene)</li>
            <li>• Incremento: +$180M/año</li>
            <li>• ROI: 307% primer año</li>
            <li>• Ahorro: $245M vs in-house</li>
            <li>• Tiempo: 8 semanas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
```

---

### **PASO 8: Crear Página Principal (5 min)**

**Archivo:** `app/page.tsx`

```typescript
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">LUPIA</h1>
        <p className="text-2xl mb-8">Asistente Comercial IA para Loopera</p>
        <Link
          href="/lupia"
          className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition"
        >
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}
```

---

### **PASO 9: Crear Interfaz Lupia (10 min)**

**Archivo:** `app/lupia/page.tsx`

```typescript
'use client';

import ChatPanel from '@/components/chat-panel';
import ProposalPreview from '@/components/proposal-preview';
import CheatSheet from '@/components/cheat-sheet';

export default function LupiaPage() {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-red-600 text-white p-4">
        <h1 className="text-2xl font-bold">LUPIA - Asistente Comercial</h1>
        <p className="text-sm opacity-90">Cliente: ESTUDIAR | Proyecto: Plataforma Gestión Integral</p>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Panel Izquierdo: Chat */}
        <div className="w-2/5 border-r border-gray-200">
          <ChatPanel />
        </div>

        {/* Panel Centro: Preview */}
        <div className="w-2/5 border-r border-gray-200">
          <ProposalPreview />
        </div>

        {/* Panel Derecho: Cheat Sheet */}
        <div className="w-1/5">
          <CheatSheet />
        </div>
      </div>
    </div>
  );
}
```

---

### **PASO 10: Exponer Knowledge Base Públicamente (2 min)**

```bash
# Copiar knowledge-base a public para que sea accesible
cp -r knowledge-base public/
```

---

### **PASO 11: Correr en Desarrollo (1 min)**

```bash
npm run dev
```

**Abrir:** http://localhost:3000

**Probar:**
1. Click "Iniciar Sesión"
2. Ver 3 paneles funcionando
3. Escribir en chat: "¿Cómo respondo si dicen que es muy caro?"
4. Ver respuesta de Lupia en tiempo real

---

### **PASO 12: Deploy a Vercel (5 min)**

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Cuando pregunte:
# ✓ Setup and deploy? Yes
# ✓ Which scope? Personal
# ✓ Link to existing project? No
# ✓ Project name? lupia-estudiarte
# ✓ Directory? ./
# ✓ Override settings? No

# Deploy a producción
vercel --prod
```

**IMPORTANTE:** Agregar `ANTHROPIC_API_KEY` en Vercel Dashboard:
1. Ir a https://vercel.com/dashboard
2. Proyecto → Settings → Environment Variables
3. Agregar: `ANTHROPIC_API_KEY` = tu-key

---

## 🎯 CHECKLIST FINAL

- [ ] Next.js instalado y corriendo
- [ ] API key de Anthropic configurada
- [ ] Chat funcional con streaming
- [ ] Preview de propuesta visible
- [ ] Cheat Sheet con tips
- [ ] Deploy en Vercel funcionando
- [ ] URL compartida con Santi

---

## 🚨 SI ALGO FALLA

**Error: Module not found '@anthropic-ai/sdk'**
```bash
npm install @anthropic-ai/sdk
```

**Error: API key not found**
```bash
# Verificar .env.local existe
cat .env.local

# Reiniciar servidor
npm run dev
```

**Error: Cannot read knowledge-base**
```bash
# Asegurar que archivos existen
ls -la knowledge-base/
cp -r knowledge-base public/
```

---

## ⏱️ TIEMPO TOTAL ESTIMADO

- Setup: 15 min
- Código: 30 min
- Testing: 10 min
- Deploy: 10 min

**TOTAL: 65 minutos** ✅

---

## 📞 CONTACTO SI NECESITAS AYUDA

Juan está disponible por WhatsApp para resolver dudas técnicas durante la implementación.

---

**¡Éxito mañana construyendo Lupia!** 🚀
