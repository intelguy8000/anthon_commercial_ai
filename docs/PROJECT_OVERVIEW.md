# 🤖 LUPIA - Asistente Comercial IA para Loopera

## 📋 RESUMEN EJECUTIVO

**Lupia** es un asistente de IA conversacional diseñado para ayudar a Santiago Lopera (Loopera) en procesos comerciales complejos, comenzando con el piloto de la propuesta para **Estudiarte**.

**Objetivo:** Crear una interfaz web donde Santi pueda refinar propuestas comerciales en tiempo real, recibir guía de negociación, y generar documentos profesionales con asistencia de Claude AI.

---

## 🎯 CASO DE USO PILOTO: ESTUDIARTE

### **Contexto:**
- Cliente: Estudiarte (agencia de viajes educativos)
- Proyecto: Plataforma web de gestión integral
- Inversión: $38M-40M COP
- Desafío: Primera propuesta grande de Loopera, necesita guía experta

### **Problema a Resolver:**
1. Santi no es técnico, puede prometer cosas imposibles
2. Necesita respuestas rápidas a objeciones del cliente
3. Debe mantener coherencia en números/alcance durante negociación
4. Requiere recordatorios de líneas rojas (precio mínimo, límites de soporte, etc.)

### **Solución: Lupia**
Un copiloto IA que:
- Responde preguntas técnicas en lenguaje comercial
- Sugiere respuestas a objeciones
- Actualiza propuesta en tiempo real
- Alerta sobre inconsistencias o riesgos

---

## 🏗️ ARQUITECTURA TÉCNICA

### **Stack Tecnológico:**

```
Frontend:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui (componentes)

Backend/API:
- Anthropic Claude API (Sonnet 3.5)
- Vercel Edge Functions
- Streaming responses

Autenticación:
- NextAuth.js
- Solo email específico de Santi

Storage (Futuro):
- Vercel KV (para historial de conversaciones)
- Supabase (para propuestas guardadas)
```

---

## 🖥️ DISEÑO DE INTERFAZ

### **Layout Principal (3 Paneles):**

```
┌──────────────────────────────────────────────────────────────┐
│  LUPIA - Asistente Comercial   [Usuario: Santiago]  [Logout] │
├────────────────┬─────────────────────┬───────────────────────┤
│                │                     │                       │
│   CHAT AI      │   PREVIEW MARKDOWN  │   CHEAT SHEET        │
│   (40%)        │   (35%)             │   (25%)              │
│                │                     │                       │
│  [Santi escri- │  # PROPUESTA       │  🎯 LÍNEAS ROJAS:    │
│   be mensaje]  │  Cliente: Estudiar │  • Min: $35M COP     │
│                │                     │  • Max soporte: 2h   │
│  Lupia:        │  ## ALCANCE        │                       │
│  "Basado en    │  - Dashboard       │  ⚠️ OBJECIONES:      │
│   el alcance,  │  - Portal QR       │  1. "Es muy caro"    │
│   recomiendo   │  - CRM básico      │     → Script A       │
│   $38M..."     │                     │                       │
│                │  [Actualizado en    │  💡 TIPS:            │
│  [Input box]   │   tiempo real]      │  • Mencionar Chat AI │
│  [Enviar]      │                     │  • SSO como bonus    │
│                │  [📥 Descargar PDF] │                       │
└────────────────┴─────────────────────┴───────────────────────┘
```

### **Componentes Clave:**

1. **Chat AI (Panel Izquierdo)**
   - Input con autocompletado
   - Historial de conversación
   - Botones de acción rápida:
     * "¿Cómo respondo a...?"
     * "Ajusta el precio"
     * "Explícame técnicamente..."
   - Streaming de respuestas (efecto typing)

2. **Preview Markdown (Panel Centro)**
   - Renderizado en tiempo real
   - Resaltado de cambios recientes
   - Scroll automático a secciones editadas
   - Export a PDF con 1 clic

3. **Cheat Sheet (Panel Derecho)**
   - Secciones colapsables:
     * 🎯 Líneas Rojas (no negociables)
     * ⚠️ Objeciones Comunes + Scripts
     * 💡 Tips de Negociación
     * 📊 Calculadora Rápida
   - Siempre visible, sticky

---

## 🤖 PROMPT SYSTEM DE LUPIA

### **System Prompt Base:**

```markdown
Eres Lupia, asistente comercial experto de Loopera, consultora tecnológica colombiana.

CONTEXTO:
- Usuario: Santiago Lopera Mesa (consultor comercial, no técnico)
- Cliente actual: Estudiarte (agencia de viajes educativos)
- Proyecto: Plataforma web de gestión + dashboard + pagos
- Inversión propuesta: $38M COP (mínimo aceptable: $35M COP)
- Desarrolladores: Juan (backend/infra) + socio (frontend)

TU ROL:
1. Asesorar a Santiago en negociación comercial
2. Traducir tecnicismos a lenguaje comercial
3. Sugerir respuestas a objeciones del cliente
4. Alertar sobre promesas imposibles o arriesgadas
5. Mantener coherencia en números/alcance

REGLAS CRÍTICAS:
- NUNCA bajes de $35M COP sin consultar a Juan primero
- NUNCA prometas features no discutidas (ej: app móvil, facturación DIAN)
- SIEMPRE menciona tiempo de desarrollo realista (8-10 semanas)
- SI cliente pide algo fuera de scope → "Déjame consultarlo con el equipo técnico"

TONO:
- Profesional pero cercano
- Confiado en el valor de la propuesta
- Empático con preocupaciones del cliente
- Directo sobre lo que es viable vs no viable

OUTPUTS:
- Respuestas concisas (máx 150 palabras)
- Usa bullets cuando sea posible
- Sugiere scripts exactos cuando Santi pregunte "¿Cómo respondo a X?"
- Actualiza propuesta SOLO cuando Santi lo solicite explícitamente
```

---

## 📚 DOCUMENTACIÓN COMERCIAL (Knowledge Base)

### **Archivos que Lupia debe conocer:**

```
/knowledge-base/
├── propuesta_estudiarte_v2.1.md (Propuesta actual)
├── guia_negociacion.md (Scripts y objeciones)
├── alcance_tecnico.md (Qué se puede/no se puede hacer)
├── precios_mercado.md (Benchmarks Colombia)
└── casos_uso.md (Ejemplos reales de valor)
```

### **Cómo Lupia Accede a Esta Info:**

**Opción A (MVP):** Inyectar en system prompt (si es <8K tokens)
**Opción B (Futuro):** RAG con embeddings + vector search

---

## 🚀 ROADMAP DE DESARROLLO

### **FASE 1: MVP (1-2 días) - Para reunión con Estudiarte**

**Día 1:**
- [ ] Setup Next.js + Tailwind + Shadcn
- [ ] Integrar API Claude con streaming
- [ ] Layout 3 paneles responsive
- [ ] Chat básico funcional
- [ ] Preview markdown estático

**Día 2:**
- [ ] Cheat Sheet con contenido de negociación
- [ ] System prompt de Lupia optimizado
- [ ] Deploy a Vercel (privado)
- [ ] Testing con Santi

**Entregable:** URL privada donde Santi pueda practicar pitch

---

### **FASE 2: Post-Piloto (1 semana)**

- [ ] Export a PDF funcional
- [ ] Historial de conversaciones
- [ ] Autenticación con NextAuth
- [ ] Guardado de propuestas en Supabase
- [ ] Calculadora de pricing dinámica
- [ ] Modo "Práctica de Objeciones"

---

### **FASE 3: Producto Completo (1 mes)**

- [ ] Multi-cliente (templates por industria)
- [ ] Dashboard de métricas (conversiones, win rate)
- [ ] Integración con CRM (futuro)
- [ ] Modo "Role Play" (Lupia simula cliente difícil)
- [ ] Exportación de reportes de reuniones
- [ ] Mobile app (React Native)

---

## 💰 MODELO DE NEGOCIO (Futuro)

### **Pricing Lupia como Producto:**

```
PLAN FREE:
- 1 propuesta/mes
- 50 mensajes con IA
- Templates básicos

PLAN PRO ($50 USD/mes):
- Propuestas ilimitadas
- 500 mensajes/mes
- Todos los templates
- Export PDF ilimitado
- Historial 6 meses

PLAN ENTERPRISE ($200 USD/mes):
- Todo lo de Pro
- White label
- Integración CRM
- Soporte prioritario
- Custom system prompts
```

**Proyección:**
- 10 consultoras usando Lupia = $500-2,000 USD/mes
- 50 consultoras = $2,500-10,000 USD/mes
- **Producto SaaS escalable sin reinventar rueda cada vez**

---

## 🔒 SEGURIDAD Y PRIVACIDAD

### **Consideraciones Críticas:**

1. **Datos Sensibles:**
   - Propuestas contienen info financiera de clientes
   - NUNCA guardar en logs de Anthropic (usar `user_id` anónimo)
   - Encriptar propuestas en storage

2. **Autenticación:**
   - Solo emails autorizados pueden acceder
   - 2FA para Santi
   - Sesiones expiran en 24h

3. **API Keys:**
   - Claude API key en variables de entorno
   - Nunca exponer en frontend
   - Rate limiting (100 requests/hour por usuario)

---

## 📊 MÉTRICAS DE ÉXITO (Piloto Estudiarte)

### **KPIs a Medir:**

```
ANTES DE LUPIA:
- Tiempo preparación propuesta: ~20 horas
- Errores en números: 3-5 por propuesta
- Confianza de Santi (subjetivo): 6/10

CON LUPIA (Meta):
- Tiempo preparación: <5 horas (75% reducción)
- Errores en números: 0-1 (90% reducción)
- Confianza de Santi: 9/10
- Cliente cierra: SÍ/NO (métrica final)

Si Estudiarte cierra → Lupia validado ✅
```

---

## 🛠️ GUÍA DE IMPLEMENTACIÓN

### **Setup Inicial (Local):**

```bash
# Clonar repo
git clone https://github.com/intelguy8000/anthon_commercial_ai.git
cd anthon_commercial_ai

# Instalar dependencias
npm install

# Variables de entorno (.env.local)
ANTHROPIC_API_KEY=sk-ant-xxx
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=http://localhost:3000

# Correr desarrollo
npm run dev
```

### **Estructura de Carpetas:**

```
anthon_commercial_ai/
├── app/
│   ├── api/
│   │   ├── chat/route.ts (Claude streaming)
│   │   └── pdf/route.ts (Export PDF)
│   ├── lupia/
│   │   └── page.tsx (UI principal)
│   └── layout.tsx
├── components/
│   ├── chat-panel.tsx
│   ├── markdown-preview.tsx
│   └── cheat-sheet.tsx
├── lib/
│   ├── claude.ts (Cliente Anthropic)
│   ├── prompts.ts (System prompts)
│   └── knowledge-base.ts (Docs)
├── public/
│   └── propuestas/ (PDFs generados)
└── README.md
```

---

## 📝 PRÓXIMOS PASOS INMEDIATOS

### **Para Juan (Ahora):**

1. ✅ Subir esta documentación a GitHub
2. ✅ Copiar archivos comerciales relevantes:
   - `PROPUESTA_ESTUDIARTE_FINAL_V2.md`
   - `GUIA_NEGOCIACION_ESTUDIARTE.md`
   - `ANALISIS_PAGOS_ESTUDIARTE.md`
   - `COSTOS_OPTIMIZADOS_ESTUDIARTE.md`
3. ✅ Crear estructura inicial de Next.js
4. ✅ Integrar API Claude básica

### **Para Santi (Mañana):**

1. Revisar propuesta final
2. Probar Lupia en desarrollo
3. Dar feedback sobre qué necesita en el Cheat Sheet
4. Practicar pitch con Lupia

### **Para Ambos:**

1. Agendar sesión de sync antes de reunión con Estudiarte
2. Definir líneas rojas finales (precio mínimo, límites técnicos)
3. Practicar objeciones comunes

---

## 🎯 VISIÓN A LARGO PLAZO

**Lupia no es solo para Estudiarte. Es el inicio de algo más grande:**

### **Casos de Uso Futuros:**

1. **Consultoras Pequeñas:**
   - Ayudar a freelancers/consultores a competir con grandes agencias
   - Propuestas profesionales sin contratar comerciales

2. **Agencias de Desarrollo:**
   - Estandarizar pricing y alcances
   - Reducir errores costosos en estimaciones

3. **Verticales Específicas:**
   - Lupia para consultorías de marketing
   - Lupia para arquitectos
   - Lupia para contadores

### **Feature Dream List:**

- 🎤 **Modo Voz:** Santi habla con Lupia mientras maneja camino a reunión
- 📊 **Dashboard Analytics:** Ver qué objeciones son más comunes, optimizar scripts
- 🤝 **Modo Colaborativo:** Juan y Santi editando propuesta en tiempo real
- 🎭 **Simulador de Cliente:** Lupia juega rol de cliente difícil para practicar
- 📈 **Win Rate Tracking:** Medir qué propuestas cierran más
- 🌍 **Multi-idioma:** Propuestas en inglés/español automáticamente

---

## 🔥 LLAMADO A LA ACCIÓN

**Este proyecto puede cambiar cómo Loopera (y otras consultoras) venden.**

**Meta inmediata:** Cerrar Estudiarte con ayuda de Lupia.

**Meta 6 meses:** Tener 5 consultoras colombianas pagando por Lupia.

**Meta 1 año:** Lupia es THE tool para consultores en LATAM.

---

**¿Listo para construir esto? Empecemos.** 🚀

---

**Documento creado:** Noviembre 2024
**Versión:** 1.0
**Autores:** Juan + Claude (Sonnet 3.5)
**Cliente piloto:** Estudiarte
**Repo:** github.com/intelguy8000/anthon_commercial_ai
