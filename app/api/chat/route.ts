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
Incremento conversión 10-15% = \$180M COP adicionales/año
Ahorro operativo: 246 horas/año
ROI: Recuperación en 2-3 meses
\`\`\`

---

## 💡 **2. LA SOLUCIÓN**

### **A. Tablero de Visualización (Dashboard)** 📊

**Vista Ejecutiva:**
- KPIs principales en tiempo real (estudiantes, revenue, conversión)
- Comparativas visuales (por colegio, país, comercial, programa)
- Tendencias y alertas (color coding: qué requiere atención)

**Vista Detallada (Drill-down):**
- Análisis por colegio individual (tasa de éxito, revenue, cancelaciones)
- Performance por comercial/asesor (pipeline, conversión, meta vs real)
- Demanda por programa (destino, margen, estacionalidad)

**Visualizaciones:**
- Gráficos interactivos + mapas de calor + exportación Excel/PDF

---

### **B. Plataforma Web de Autogestión** 🌐

**1. Inscripción con QR**
- Código QR único por evento/colegio
- Padre escanea → formulario web móvil
- Validación automática + confirmación email
- Todo en base de datos centralizada

**2. Documentos y Firmas Digitales**
- Portal upload documentos (pasaporte, visa, etc.)
- **Integración DocuSign** para firmas legales
- Tracking: qué falta por estudiante
- Alertas automáticas de vencimientos

**3. Gestión de Pagos con Trazabilidad**
- Plan de pagos por estudiante (3-4 cuotas)
- Padre sube comprobante → **OCR extrae datos automáticamente**
- Staff valida en panel admin (1-2 min por pago)
- Recordatorios automáticos (7 días antes, día de vencimiento, 3 días después)
- Anti-fraude: detecta duplicados y montos incorrectos

**4. Portal del Padre**
- Estado del proceso del hijo
- Documentos subidos/pendientes
- Plan de pagos actualizado
- Enlaces a redes sociales (Instagram/Facebook de ESTUDIAR)
- Contacto directo con asesor

**5. CRM Básico Interno**
- Base de datos centralizada
- Asignación de asesores
- Workflow de estados
- Historial completo por estudiante

---

### **C. Características Técnicas** 🚀

**Autenticación:**
- Login email/password con roles (Admin, Asesor, Padre)
- 🎁 **BONUS:** Login con Google/Microsoft (SSO) - ¡Sin costo adicional!

**Seguridad:**
- Encriptación SSL/TLS (HTTPS)
- Backups automáticos diarios
- Protección SQL injection, XSS, CSRF
- Cumplimiento Ley 1581/2012 (Habeas Data)
- Rate limiting anti-abuse

**Hosting:**
- **Vercel** (Hosting Enterprise): CDN global, auto-scaling, 99.9% uptime
- **Azure** (Datos): SQL Database + Blob Storage

**Integraciones:**
- DocuSign (firmas digitales)
- AWS SES (emails ilimitados)
- Códigos QR dinámicos
- OCR comprobantes de pago

**💎 Feature Exclusiva: Chat Inteligente AI**
- Solo para Gerencia/CEO
- Consultas instantáneas: *"¿Cuántos estudiantes activos?"*, *"¿Qué colegio tiene mejor conversión?"*
- Respuestas en <3 segundos
- Powered by OpenAI GPT-4
- **¡DIFERENCIADOR ÚNICO vs competencia!**
- Límite: 500 consultas/mes (15-20/día)

---

## 🔄 **3. INTEGRACIÓN DE PAGOS** (Sugerencias)

**IMPORTANTE:** Gestión de pagos es responsabilidad de ESTUDIAR. Recomendamos opciones:

| Opción | Costo Mensual | Automatización | Comisión por Pago |
|--------|---------------|----------------|-------------------|
| **Botón Bancolombia Básico** ⭐ | \$0 | 80% (validación manual) | \$0 |
| API Bancolombia Avanzado | \$50K COP | 100% automático | \$0 |
| PSE via Wompi | \$0 fijo | 100% automático | \$60K-\$210K |

### **Nuestra Recomendación: Botón Bancolombia Básico (Fase 1)**

**FLUJO:**
1. Padre completa inscripción → Sistema genera plan de pagos
2. Padre sube comprobante PSE
3. **OCR extrae monto, fecha, referencia automáticamente**
4. Sistema notifica staff → Validan en 1-2 min
5. Sistema confirma al padre automáticamente

**VENTAJAS:**
- ✅ CERO comisión (ahorro \$271M-\$631M COP/año vs Wompi)
- ✅ Control total sobre pagos grandes
- ✅ Anti-fraude integrado

**TIEMPO STAFF:** 3-4 horas/mes para 200 estudiantes × 3-4 cuotas

**Upgrade Futuro (Opcional):** API Avanzado 100% automático (\$50K COP/mes + \$2M desarrollo)

---

## ⚙️ **4. METODOLOGÍA - 8 SEMANAS**

\`\`\`
Semana 1: Diagnóstico + Diseño
         ├─ Kick-off con equipo
         ├─ Wireframes + mockups aprobados
         └─ Diseño base de datos

Semanas 2-4: Desarrollo Core
         ├─ Dashboard con visualizaciones
         ├─ Portal QR + autenticación
         ├─ Upload documentos + DocuSign
         ├─ CRM básico
         └─ Módulo pagos con validación

Semanas 5-6: Features Avanzadas
         ├─ Chat AI para gerencia
         ├─ SSO Google/Microsoft
         ├─ Notificaciones automáticas
         ├─ OCR comprobantes
         └─ Exportación reportes

Semana 7: Testing + Ajustes
         └─ Testing completo + corrección bugs

Semana 8: Lanzamiento
         ├─ Migración a producción
         ├─ Capacitación (4 horas)
         └─ 2 semanas soporte intensivo
\`\`\`

**NOTA:** Duración sujeta a disponibilidad de ESTUDIAR para validaciones.

---

## 💰 **5. INVERSIÓN**

### **Desarrollo Completo (Pago Único)**

\`\`\`
═══════════════════════════════════════════════════════
Precio Regular:                          \$40,000,000 COP

🎁 PRECIO LANZAMIENTO (Válido hasta 31 enero 2025):
                                         \$38,000,000 COP

AHORRO:                                   \$2,000,000 COP
═══════════════════════════════════════════════════════

Incluye:
✅ Dashboard completo (vista general + drill-down)
✅ Plataforma web autogestión (QR + documentos + pagos)
✅ CRM interno básico
✅ 💎 Chat AI para gerencia
✅ 🎁 SSO Google/Microsoft (bonus)
✅ Integración Botón Bancolombia + OCR
✅ Migración Excel → Azure SQL
✅ Setup infraestructura completa
✅ Capacitación (4 horas) + manual
✅ 2 semanas soporte post-lanzamiento

Contexto de Mercado:
- Consultoras colombianas: \$55M-\$90M COP
- Desarrollo in-house (6 meses): \$96M-\$130M COP
- Nuestra propuesta: \$38M COP (30-50% más económico)

Forma de Pago:
├─ 50% firma: \$19,000,000 COP
├─ 30% semana 4: \$11,400,000 COP
└─ 20% entrega: \$7,600,000 COP
\`\`\`

---

### **Costos Operacionales Mensuales**

**Cliente paga DIRECTO a proveedores (NO a Loopera):**

\`\`\`
1. Infraestructura Azure (Microsoft):
   Azure SQL + Blob Storage + Backup     \$39 USD/mes (~\$160K COP)

2. Servicios Adicionales:
   Dominio .co                           \$1 USD/mes
   DocuSign (10 sobres/mes)              \$25 USD/mes
   OpenAI API (Chat AI)                  \$3 USD/mes
   ─────────────────────────────────────────────────
   SUBTOTAL:                             \$29 USD/mes

3. Hosting Vercel:                       Incluido en anualidad ✅

4. Pasarela Pagos:                       \$0 (Bancolombia Básico) ✅

───────────────────────────────────────────────────────
TOTAL INFRAESTRUCTURA:                   \$68 USD/mes
                                         (~\$279K COP/mes)
\`\`\`

**GESTIÓN AZURE:**
- ESTUDIAR crea cuenta Azure (facturación a su nombre)
- Loopera recibe credenciales admin delegadas
- ESTUDIAR mantiene cuenta "owner" de respaldo
- Al cancelar anualidad: transferencia 100% de accesos

---

### **Anualidad Loopera (Soporte y Mantenimiento)**

\`\`\`
═══════════════════════════════════════════════════════
AÑO 1: \$350 USD/mes (\$4,200 USD/año = ~\$17.2M COP/año)
═══════════════════════════════════════════════════════

Incluye:
✅ Soporte técnico continuo (email/WhatsApp 24-48h)
✅ Monitoreo 24/7 de la plataforma
✅ Resolución bugs ilimitados
✅ Actualizaciones de seguridad
✅ Ajustes menores (hasta 2h/mes acumulables, máx 30 min c/u)
✅ Gestión infraestructura Azure + Vercel
✅ Chat AI operativo + optimización
✅ Vercel Pro si es necesario (nosotros pagamos)

❌ NO INCLUIDO (Cotización: \$75 USD/hora):
- Nuevas features grandes (ej: módulo contabilidad)
- Integraciones adicionales (ej: ERP)
- Rediseño completo de interfaces

═══════════════════════════════════════════════════════
AÑO 2+: \$500 USD/mes + ajuste inflación (máx 10% anual)
═══════════════════════════════════════════════════════

Notificación: 60 días antes de renovación
Ejemplo: Si inflación USD es 3%, año 2 sería \$515 USD/mes

FLEXIBILIDAD:
Si cancelan anualidad, plataforma sigue funcionando
(tienen licencia perpetua). Solo pierden soporte activo.
\`\`\`

---

### **Resumen Financiero Total**

\`\`\`
═══════════════════════════════════════════════════════
INVERSIÓN AÑO 1:
├─ Desarrollo (una vez):                 \$38,000,000 COP
├─ Infraestructura (12 meses):            \$3,348,000 COP
└─ Anualidad Loopera (12 meses):         \$17,220,000 COP
    ─────────────────────────────────────────────────
    TOTAL AÑO 1:                         \$58,568,000 COP

AÑOS SIGUIENTES (solo recurrente):
├─ Infraestructura:                       \$3,348,000 COP/año
└─ Anualidad Loopera:                    \$24,600,000 COP/año
    ─────────────────────────────────────────────────
    TOTAL/AÑO:                           \$27,948,000 COP/año

═══════════════════════════════════════════════════════
TOTAL 3 AÑOS:                           \$114,464,000 COP
═══════════════════════════════════════════════════════

COMPARACIÓN:

Developer in-house (3 años):
- \$8M/mes × 36 meses = ~\$360M COP
- AHORRO: \$245M COP (68% menos)

RETORNO DE INVERSIÓN:
- Incremento 15% conversión = \$180M COP/año adicional
- Inversión año 1: \$58.6M COP
- ROI: 307% primer año
- Recuperación: 2-3 meses
\`\`\`

---

## 🎁 **6. DIFERENCIADORES CLAVE**

1. **💎 Chat AI para Gerencia** - Ninguna consultora local lo ofrece
2. **🎁 SSO Google/Microsoft** - Bonus sin costo (valor: \$500 USD/año)
3. **💰 Hosting optimizado** - Vercel incluido en anualidad
4. **📊 Dashboard para claridad** - No solo genérico, diseñado para identificar qué va bien/mal
5. **💳 Pagos sin comisión** - Ahorro \$271M-\$631M COP/año vs Wompi
6. **⚡ Entrega rápida** - 8 semanas vs 9-11 mercado
7. **🏗️ Stack moderno** - Next.js 14, TypeScript, Azure enterprise

---

## 📊 **7. CASOS DE USO**

### **Escenario 1: CEO reporta a socios**
**HOY:** 3 horas consolidando Excels, respuesta al día siguiente
**CON PLATAFORMA:** Dashboard en celular + Chat AI = 30 segundos

### **Escenario 2: Evento en colegio**
**HOY:** Formularios papel → 2 horas transcribiendo → 40% conversión
**CON PLATAFORMA:** QR escanean → 10 minutos → 70% conversión = +\$138M COP/evento

### **Escenario 3: Validación de pagos**
**HOY:** Screenshot por WhatsApp → buscar 15 min → transcribir manual
**CON PLATAFORMA:** Upload → OCR automático → validar 30 seg → 90% más rápido

---

## 🔮 **8. MÓDULOS OPCIONALES (Futuro)**

**NO incluidos** en \$38M, pero plataforma preparada para soportarlos:

| Módulo | Inversión | Mensualidad | Tiempo |
|--------|-----------|-------------|--------|
| Facturación DIAN | \$8M COP | \$50K COP | 3-4 semanas |
| API Bancolombia Avanzado | \$2M COP | \$50K COP | 1 semana |
| App Móvil Nativa (iOS/Android) | \$25M COP | \$150 USD | 8 semanas |
| Galería Fotos Premium | \$5M COP | \$100 USD | 2 semanas |

**PREGUNTA:** ¿ESTUDIAR requiere facturación electrónica para fase 1? Si SÍ, podemos incluirlo ajustando inversión a \$46M COP.

---

## 📞 **9. PRÓXIMOS PASOS**

\`\`\`
PASO 1: Reunión Validación (1 hora)
        ├─ Revisar propuesta en detalle
        ├─ Aclarar dudas técnicas
        ├─ Ajustar alcance si necesario
        └─ Confirmar precio y términos

PASO 2: Firma Contrato (1-2 días)
        ├─ Contrato servicios + NDA bilateral
        └─ Pago inicial 50% (\$19M COP)

PASO 3: Kick-off (Semana 1)
        ├─ Acceso a Excels actuales
        ├─ Definir KPIs para dashboard
        └─ Wireframes aprobados

PASO 4: Desarrollo (Semanas 2-7)
        ├─ Demos semanales cada viernes
        └─ Validación continua

PASO 5: Lanzamiento (Semana 8)
        ├─ Capacitación (4 horas)
        └─ ¡Claridad total del negocio! 🚀
\`\`\`

**URGENCIA:** Precio lanzamiento \$38M válido hasta **31 enero 2025**. Después: \$40M COP.

---

## 📄 **10. TÉRMINOS CLAVE**

### **Garantías**
- ✅ 30 días post-lanzamiento por niveles (crítico <24h, medio <72h, menor <7 días)
- ✅ 2 semanas soporte intensivo incluido
- ✅ 99.9% uptime (Vercel + Azure)
- ✅ Backups diarios (retención 30 días)

### **Propiedad Intelectual**
- Loopera retiene IP del código base
- ESTUDIAR recibe licencia perpetua y exclusiva
- Protección: Si Loopera cesa, código se transfiere vía escrow

### **Cancelación**
- Durante desarrollo: Conservan trabajo completado, no hay reembolso
- Post-lanzamiento: Pueden cancelar con 30 días aviso, plataforma sigue funcionando

### **Stack Tecnológico**
- Azure SQL + Vercel + Next.js 14 (definido)
- Solo casos EXCEPCIONALES (discontinuación, >48h caído, vulnerabilidad crítica) podemos migrar con notificación 48h y sin costo

---

## 📧 **11. CONTACTO**

**Loopera - Soluciones Tecnológicas**
**Santiago Lopera Mesa**
Consultor en Transformación Digital

📧 **Email:** santiago.lopera@loopera.co
📱 **WhatsApp:** +57 316 288 8832
💼 **LinkedIn:** linkedin.com/in/santiagoloperamesa
📅 **Agendar:** calendly.com/santiago-lopera-loopera/sesion-exploratoria

---

## 🎯 **12. NUESTRA FILOSOFÍA**

> **"Transformar datos dispersos en claridad ejecutiva,
>   automatizar lo repetitivo para enfocarse en crecer"**

Esta propuesta está diseñada para darles:
- ✅ **Claridad:** Ver cómo va todo en tiempo real
- ✅ **Eficiencia:** Automatizar lo manual y tedioso
- ✅ **Escalabilidad:** Crecer de 200 a 500+ estudiantes sin fricción
- ✅ **Retorno:** Recuperar inversión en 2-3 meses

Estamos abiertos a conversar, ajustar y encontrar la mejor solución para ESTUDIAR.

**La tecnología debe servir al negocio, no al revés.**

---

**Vigencia:** 30 días
**Precio lanzamiento hasta:** 31 enero 2025
**Versión:** 3.0 Ejecutiva - Enero 2025

© 2025 Loopera. Confidencial - Solo para ESTUDIAR.
`;

const GUIA_NEGOCIACION = `# 🎯 GUÍA DE NEGOCIACIÓN - PROPUESTA ESTUDIARTE

## 📋 OBJETIVO DE LA REUNIÓN
Cerrar el proyecto en **\$38M-40M COP** + anualidad \$350 USD/mes con compromiso de 12 meses.

---

## 🧠 MENTALIDAD ANTES DE ENTRAR

### ✅ Lo Que DEBES Recordar:
1. **No estás pidiendo un favor, estás ofreciendo valor enorme**
2. Tu plataforma puede generar \$120-180M COP/año adicional para ellos
3. \$40M es 33% descuento sobre precio mercado (\$60M)
4. Eres profesional, no "el desarrollador barato"
5. Si no acepta precio justo, NO ES EL CLIENTE CORRECTO

### ❌ Lo Que NO Debes Pensar:
1. "Es mi primer cliente, debo aceptar lo que ofrezcan"
2. "Si no acepto, perderé la oportunidad"
3. "Tal vez \$30M sí alcanza si trabajamos más duro"
4. "Puedo recuperar en la mensualidad"

### 🎯 Tu Límite:
- **IDEAL:** \$40M COP
- **ACEPTABLE:** \$38M COP (con early-bird)
- **MÍNIMO ABSOLUTO:** \$35M COP (solo con scope reducido)
- **LÍNEA ROJA:** NO bajar de \$35M con scope completo

---

## 📖 ESTRUCTURA DE LA PRESENTACIÓN

### FASE 1: EMPATÍA Y CONTEXTO (3-5 minutos)

**ABRE CON ESTO:**

\`\`\`
"Santiago, antes que nada, gracias por la confianza de
considerarnos para este proyecto.

Quiero empezar reconociendo los desafíos que enfrentan:

1. Operación manual con 85+ colegios
2. Falta de visibilidad en tiempo real de cómo va el negocio
3. Procesos que no escalan (Excel, WhatsApp, transcripción manual)
4. Difícil comunicar resultados a socios/inversionistas

Hemos analizado su operación a fondo y entendemos que
no buscan solo 'un sistema', buscan CLARIDAD y EFICIENCIA.

¿Estoy en lo correcto?"
\`\`\`

**POR QUÉ FUNCIONA:**
- Demuestras que entiendes SU dolor, no solo vendes tecnología
- Cliente se siente escuchado
- Estableces que esto NO es sobre "comprar software" sino resolver problemas

---

### FASE 2: VISIÓN DE VALOR (5-7 minutos)

**PRESENTA EL IMPACTO:**

\`\`\`
"Déjenme mostrarles qué cambia con esta plataforma:

HOY (Sin plataforma):
- Evento en colegio con 50 padres
- 30 llenan formulario en papel
- 2 horas transcribiendo a Excel
- Envían links de pago días después
- Solo 12 completan (40% conversión)
- 3 días de proceso

CON LA PLATAFORMA:
- 50 padres escanean QR en el evento
- Llenan formulario en 3 minutos
- Sistema guarda automáticamente
- Reciben link de pago al instante
- 35 completan pago (70% conversión)
- 10 minutos de proceso

IMPACTO REAL:
✅ 23 ventas más por evento = \$138M COP adicional/año
✅ 2.9 horas ahorradas por evento × 85 eventos = 246 horas/año
✅ 75% más conversión
✅ Cero errores de transcripción

Y esto es solo UN módulo. El dashboard les da visibilidad
ejecutiva que hoy NO tienen."
\`\`\`

**PAUSA AQUÍ Y PREGUNTA:**
\`\`\`
"¿Esto tiene sentido para ustedes? ¿Ven el valor?"
\`\`\`

**ESPERA RESPUESTA.** No sigas hasta que confirmen.

---

### FASE 3: PRESENTACIÓN DE SOLUCIÓN (8-10 minutos)

**USA LA PROPUESTA COMO GUÍA VISUAL**

Muestra:
1. Dashboard (con ejemplos visuales si tienes mockups)
2. Portal QR (muestra un QR de ejemplo)
3. Módulo pagos (explica las opciones)
4. Chat AI (haz una demo si puedes)
5. SSO como "bonus regalo"

**LENGUAJE CLAVE:**

\`\`\`
"Esto no es un dashboard genérico. Está diseñado
específicamente para que vean:
- Qué colegio está funcionando vs cuál necesita atención
- Qué comercial cierra más vs cuál necesita apoyo
- Qué programa se vende solo vs cuál está estancado

Es como tener un GPS de su negocio. Siempre saben
dónde están y hacia dónde van."
\`\`\`

---

### FASE 4: INVERSIÓN (MOMENTO CRÍTICO - 5 minutos)

**AQUÍ ES DONDE SE DEFINE TODO. LEE ESTO TEXTUALMENTE:**

\`\`\`
"Ahora hablemos de la inversión.

Hice un análisis detallado de lo que requiere este proyecto:

[ABRE LAPTOP Y MUESTRA DESGLOSE]

Este scope involucra:
- ~600 horas de desarrollo especializado
- Integración con Azure, DocuSign, OpenAI, Bancolombia
- Dashboard multi-rol con visualizaciones en tiempo real
- CRM completo con workflow automatizado
- Módulo de pagos con trazabilidad de 3-4 cuotas
- Chat AI exclusivo para gerencia
- SSO empresarial
- Migración de toda su data actual a la nube
- Capacitación a su equipo
- 2 semanas de soporte intensivo post-lanzamiento

En el mercado colombiano, este tipo de proyecto se cotiza
entre \$55M-\$90M COP dependiendo de la consultora.

[PAUSA - DEJA QUE ABSORBAN EL NÚMERO]

Como valoramos construir una relación a largo plazo,
y vemos el potencial de trabajo futuro en mantenimiento
y nuevas features, nuestra propuesta es:

**\$40,000,000 COP**

Esto incluye TODO lo que acabo de mencionar.

ADEMÁS, si firmamos antes del [fecha 15 días], tenemos
un precio de lanzamiento:

**\$38,000,000 COP**

[PAUSA - NO HABLES - DEJA QUE PROCESEN]

Contexto para que lo evalúen:
- Un desarrollador in-house cuesta \$8M-10M/mes
- Por 6 meses serían \$48M-\$60M COP
- Sin garantía de entrega, sin experiencia en integraciones
- Ustedes tendrían que gestionar el proyecto

Con nosotros:
- Precio fijo: \$38M COP
- Entrega garantizada en 8 semanas
- Equipo especializado
- Toda la gestión de nuestra parte
- Código probado y documentado

¿Les hace sentido esta inversión?"
\`\`\`

---

## 🎭 OBJECIONES COMUNES Y CÓMO RESPONDER

### OBJECIÓN 1: "Es muy caro, nuestro presupuesto era \$25-30M"

**❌ NO DIGAS:**
- "Bueno, podemos bajar a \$30M"
- "Es que así es el mercado"
- "No puedo hacer nada"

**✅ DI ESTO:**

\`\`\`
"Entiendo perfectamente. Déjenme ser transparente con ustedes.

A \$30M COP, matemáticamente no puedo entregarles el
scope completo que definimos. Estaría trabajando a pérdida.

Pero sí tengo dos opciones para ustedes:

OPCIÓN A: Ajustamos el scope a su presupuesto
Por \$30M COP puedo ofrecer un MVP con:
✅ Dashboard básico (sin drill-down avanzado)
✅ Portal inscripciones (sin QR automático)
✅ CRM simplificado
✅ Upload documentos (sin DocuSign, solo PDFs)
✅ Módulo pagos básico

ELIMINAMOS:
❌ Chat AI
❌ SSO
❌ Notificaciones automáticas
❌ DocuSign
❌ Analytics avanzados

OPCIÓN B: Mantenemos scope completo a \$38M
Y estructuramos un plan de pago cómodo:
- 40% al firmar: \$15.2M COP
- 30% semana 4: \$11.4M COP
- 30% entrega: \$11.4M COP

¿Cuál de las dos opciones tiene más sentido para ustedes?"
\`\`\`

**POR QUÉ FUNCIONA:**
- No regalas tu trabajo
- Das opciones (sensación de control al cliente)
- Anclaje: Ahora \$38M se ve "razonable" vs perder features
- Flexibilidad en pagos es concesión real sin bajar precio

---

### OBJECIÓN 2: "Tenemos otra propuesta por \$30M"

**❌ NO DIGAS:**
- "Nosotros somos mejores"
- "Ellos son malos"
- "Ok, entonces les igualo el precio"

**✅ DI ESTO:**

\`\`\`
"Perfecto, eso es parte de un proceso responsable de
toma de decisiones. Es inteligente comparar opciones.

¿Puedo preguntarles qué incluye esa propuesta?

[ESCUCHA ATENTAMENTE]

Entiendo. Déjenme mostrarles la comparación lado a lado:

[SACA PAPEL Y HAZ TABLA EN VIVO]

| Feature | Nuestra Propuesta | Otra Propuesta |
|---------|-------------------|----------------|
| Chat AI | ✅ Incluido | ¿? |
| SSO | ✅ Incluido | ¿? |
| DocuSign | ✅ Incluido | ¿? |
| Soporte post-lanzamiento | ✅ 2 semanas | ¿? |
| Tiempo entrega | 8 semanas | ¿? |
| Garantía | ✅ 30 días | ¿? |

La pregunta no es solo el precio, es qué obtienen por ese precio.

Si la otra propuesta incluye TODO lo que nosotros ofrecemos
y es más barata, deberían ir con ellos. Sería irresponsable
de mi parte decir lo contrario.

Pero si hay diferencias, comparen valor total, no solo precio.

¿Tiene sentido?"
\`\`\`

**POR QUÉ FUNCIONA:**
- No entras en competencia de precio
- Los haces pensar en valor, no costo
- Demuestras confianza en tu propuesta
- Identificas si es objeción real o táctica de negociación

---

### OBJECIÓN 3: "Necesito pensarlo / consultarlo con mi socio"

**❌ NO DIGAS:**
- "Ok, avísame cuando decidas"
- "¿Cuándo tendrás respuesta?"
- "Te doy más descuento si decides hoy"

**✅ DI ESTO:**

\`\`\`
"Por supuesto, es una decisión importante y debe ser
consultada. Es la actitud correcta.

Para que tengas toda la información en la conversación
con tu socio, déjame resumir los puntos clave:

1. INVERSIÓN: \$38M COP (precio lanzamiento válido 15 días)
   Mercado: \$55M-\$90M COP

2. RETORNO: Aumento conversión 10-15% = \$120-180M COP/año
   ROI: Recuperan inversión en 2-3 meses

3. ENTREGA: 8 semanas
   Soporte: 2 semanas intensivo incluido

4. RIESGO: Garantía 30 días de bugs críticos

¿Hay algo que no haya cubierto que tu socio pueda preguntar?
Prefiero aclararlo ahora para que tengas todas las respuestas.

[ESCUCHA]

¿Cuándo esperarías tener esa conversación? Pregunto porque
el precio de \$38M es válido por 15 días. Después vuelve a \$40M.

¿Te parece si agendamos un follow-up para [fecha específica]?
Así si surge alguna duda, la aclaramos juntos."
\`\`\`

**POR QUÉ FUNCIONA:**
- Facilitas su decisión dándoles munición
- Identificas objeciones ocultas
- Mantienes urgencia (15 días)
- Agendar follow-up evita que te ghosteen

---

### OBJECIÓN 4: "¿Y si empezamos con algo más pequeño?"

**❌ NO DIGAS:**
- "No, tiene que ser todo o nada"
- "No trabajo por fases"

**✅ DI ESTO:**

\`\`\`
"Me gusta esa aproximación. Tiene sentido validar antes
de la inversión completa.

Propongo esto:

FASE 1 (MVP - 6 semanas): \$28M COP
✅ Dashboard ejecutivo básico
✅ Portal inscripciones con QR
✅ CRM simplificado
✅ Módulo pagos con validación manual
✅ Upload documentos

FASE 2 (Premium - 3 semanas): \$15M COP
✅ Chat AI
✅ SSO
✅ DocuSign
✅ Analytics avanzados
✅ Notificaciones automáticas

TOTAL FASES: \$43M COP

Vs.

TODO JUNTO (8 semanas): \$38M COP

AHORRO haciendo todo junto: \$5M COP

¿Por qué es más barato junto?
- No repetimos setup de infraestructura
- No hay re-onboarding
- Desarrollo más eficiente

Mi recomendación: Vayan con todo junto. Ahorran \$5M
y tienen solución completa en 8 semanas.

Pero si prefieren validar primero, respeto esa decisión.

¿Qué tiene más sentido para ustedes?"
\`\`\`

**POR QUÉ FUNCIONA:**
- Muestras flexibilidad
- Haces que "todo junto" se vea como mejor negocio
- Anclas precio más alto (\$43M) para que \$38M se vea bien
- Respetas su proceso de decisión

---

### OBJECIÓN 5: "No tenemos el dinero ahora mismo"

**❌ NO DIGAS:**
- "Entonces no podemos trabajar juntos"
- "Paga lo que puedas"

**✅ DI ESTO:**

\`\`\`
"Entiendo perfectamente. El flujo de caja es crítico
para cualquier negocio.

Déjame preguntarte: ¿El tema es el monto total o
la estructura de pagos?

[ESCUCHA]

Tengo algunas opciones:

OPCIÓN A: Pago diferido (sin intereses)
- 30% firma: \$11.4M COP
- 30% semana 4: \$11.4M COP
- 20% entrega: \$7.6M COP
- 20% mes 1 operación: \$7.6M COP
Total: \$38M COP en 4 meses

OPCIÓN B: Desarrollo + Mensualidad
- Setup: \$25M COP (pago único)
- Mensualidad: \$500 USD/mes × 24 meses
Total: \$25M + \$12,000 USD (~\$50M COP)
Beneficio: Cuotas menores, soporte garantizado 2 años

OPCIÓN C: Esperamos a su próximo ciclo de caja
- ¿Cuándo tienen mejor liquidez?
- Podemos reservar el precio de \$38M por 30-60 días
- Comenzamos cuando estén listos

¿Cuál de estas opciones se ajusta mejor a su situación?"
\`\`\`

**POR QUÉ FUNCIONA:**
- Muestras empatía real
- Ofreces soluciones, no presionas
- Opción B aumenta tu ingreso total
- Mantienes el precio, solo ajustas términos

---

## 🎯 TÉCNICAS AVANZADAS DE NEGOCIACIÓN

### TÉCNICA 1: Anclaje
**Siempre menciona primero el precio de mercado (\$60M-\$90M) antes de tu precio (\$38M).**

Hace que tu precio se vea como ganga.

---

### TÉCNICA 2: Concesión Recíproca
**Si das algo, pide algo a cambio.**

Ejemplo:
\`\`\`
"Puedo bajar a \$36M, pero necesitaría que:
- Firmen esta semana
- Paguen 50% de entrada (vs 40%)
- Nos den testimonio en video para portafolio
- Nos refieran a 2 empresas de su red

¿Les funciona?"
\`\`\`

---

### TÉCNICA 3: Precio Falso Alto (Decoy)
**Presenta 3 opciones donde la del medio es la que quieres vender.**

\`\`\`
OPCIÓN 1: MVP - \$30M COP
(Scope reducido, sin AI, sin SSO)

OPCIÓN 2: COMPLETO - \$38M COP ⭐ RECOMENDADO
(Todo incluido, mejor value)

OPCIÓN 3: ENTERPRISE - \$55M COP
(Todo + App móvil + 3 meses soporte + Capacitación extra)
\`\`\`

Cliente elegirá opción 2 el 70% del tiempo.

---

### TÉCNICA 4: Romper el Precio
**No digas "\$38M COP". Di:**

\`\`\`
"La inversión es \$38M COP, que distribuido en 8 semanas
son \$4.75M por semana.

O visto de otra forma:
- Dashboard: \$12M
- Portal QR: \$8M
- CRM: \$10M
- Integraciones: \$5M
- AI + SSO (bonus): \$3M

¿Cuál de estos componentes es más valioso para ustedes?"
\`\`\`

Hace que el precio se sienta más pequeño.

---

### TÉCNICA 5: Pregunta de Cierre
**Después de presentar precio, pregunta:**

\`\`\`
"¿Esto está dentro de su rango de presupuesto
o estamos lejos?"
\`\`\`

Si dicen "estamos lejos", preguntas:
\`\`\`
"¿Qué tan lejos? ¿Es tema de \$2M o de \$10M?"
\`\`\`

Esto te da información para negociar.

---

## 🚀 CÓMO CERRAR LA VENTA

### SEÑALES DE COMPRA (Cuando decir "¿Firmamos?")

Cliente está listo si:
- ✅ Hace preguntas de implementación ("¿Cuándo empezamos?")
- ✅ Pregunta por detalles operativos ("¿Necesitan acceso a nuestros servidores?")
- ✅ Pide contrato o términos de pago
- ✅ Consulta con su equipo en frente tuyo
- ✅ Dice "Ok, me gusta"

### CIERRE SUAVE:
\`\`\`
"¿Tiene sentido para ustedes avanzar con esto?"
\`\`\`

### CIERRE DIRECTO:
\`\`\`
"¿Qué necesitas para decir sí hoy?"
\`\`\`

### CIERRE CON URGENCIA:
\`\`\`
"El precio de \$38M es válido hasta [fecha].
¿Quieres que prepare el contrato para firmarlo
esta semana?"
\`\`\`

### CIERRE ASUMIENDO VENTA:
\`\`\`
"Perfecto. Voy a preparar el contrato y el cronograma
de trabajo. ¿Prefieres que te lo envíe hoy en la tarde
o mañana en la mañana?"
\`\`\`

---

## ⚠️ ERRORES FATALES QUE DEBES EVITAR

### ❌ ERROR 1: Bajar el precio sin resistencia
\`\`\`
Cliente: "Es caro"
Tú: "Ok, les dejo en \$30M"
\`\`\`
**NUNCA hagas esto.** Destruye tu credibilidad.

---

### ❌ ERROR 2: Hablar demasiado
Después de decir el precio: **CÁLLATE.**

El primero en hablar pierde. Deja que procesen.

---

### ❌ ERROR 3: Justificarte en exceso
\`\`\`
"Sé que es caro pero es que... es mucho trabajo...
y tenemos que comer... y..."
\`\`\`
**NO.** Suenas inseguro.

Di el precio con confianza y para.

---

### ❌ ERROR 4: Aceptar "te aviso después" sin follow-up
\`\`\`
Cliente: "Te aviso la próxima semana"
Tú: "Ok, perfecto"
\`\`\`

**SIEMPRE agenda fecha específica:**
\`\`\`
"Perfecto. ¿Te parece si hablamos el martes a las 10am?
Te mando invitación de calendario."
\`\`\`

---

### ❌ ERROR 5: Negociar contigo mismo
\`\`\`
"Mi precio es \$40M... pero podría hacer \$38M...
bueno, pensándolo bien, \$35M también funciona..."
\`\`\`

**NUNCA.** Un precio, una oferta.

---

## 📞 GUIÓN DE CIERRE FINAL

**Cuando sientas que están listos:**

\`\`\`
"Santiago, déjame resumir para confirmar que estamos
alineados:

INVERSIÓN:
✅ \$38,000,000 COP (precio lanzamiento hasta [fecha])
✅ Forma de pago: 50% firma, 30% semana 4, 20% entrega

ENTREGA:
✅ 8 semanas
✅ Entregas semanales (ves progreso cada semana)
✅ 2 semanas soporte intensivo incluido

INCLUYE:
✅ Dashboard ejecutivo + detallado
✅ Portal QR + CRM
✅ Módulo pagos con trazabilidad
✅ Chat AI exclusivo gerencia
✅ SSO Google/Microsoft (bonus)
✅ Integración DocuSign
✅ Migración datos
✅ Capacitación completa

MENSUALIDAD:
✅ \$350 USD/mes (año 1)
✅ Incluye soporte, hosting, updates

¿Estoy dejando algo por fuera?

[ESPERA CONFIRMACIÓN]

Perfecto. ¿Qué necesitas de mi parte para que
podamos arrancar esta misma semana?"
\`\`\`

---

## 🎬 CHECKLIST PRE-REUNIÓN

### 30 minutos antes:
- [ ] Revisé toda la propuesta
- [ ] Tengo calculadora a mano
- [ ] Tengo respuestas a objeciones
- [ ] Sé mi precio mínimo (\$35M con scope reducido)
- [ ] Tengo calendario listo para agendar follow-up
- [ ] Respiro profundo y recuerdo: ofrezco valor, no pido limosna

### Durante reunión:
- [ ] Escucho 70%, hablo 30%
- [ ] Hago preguntas antes de presentar
- [ ] Presento valor antes de precio
- [ ] Digo precio con confianza y me callo
- [ ] Manejo objeciones sin bajar precio
- [ ] Cierro con pregunta específica

### Post-reunión:
- [ ] Envío resumen por email en 24h
- [ ] Incluyo próximos pasos claros
- [ ] Agendo follow-up específico
- [ ] Agradezco su tiempo

---

## 📧 EMAIL DE SEGUIMIENTO (Enviar máximo 24h después)

**Subject:** Resumen Propuesta Estudiarte - Plataforma de Gestión

\`\`\`
Hola Santiago,

Gracias por tu tiempo hoy. Fue muy productivo entender
a profundidad los desafíos que enfrentan.

RESUMEN DE NUESTRA PROPUESTA:

Inversión:
→ \$38,000,000 COP (precio válido hasta [fecha])
→ Pago: 50% firma / 30% semana 4 / 20% entrega

Entrega:
→ 8 semanas desarrollo
→ 2 semanas soporte post-lanzamiento

Incluye: [lista bullet points]

Mensualidad:
→ \$350 USD/mes año 1 (soporte + hosting + updates)

PRÓXIMOS PASOS:

Si deciden avanzar:
1. Confirmas por email
2. Te envío contrato para revisión legal
3. Firmamos
4. Pago inicial 50% (\$19M)
5. Kick-off semana siguiente

¿Tienes alguna pregunta que no haya cubierto?

Quedo atento.

Juan
[Teléfono]
[Email]
\`\`\`

---

## 💪 AFIRMACIONES ANTES DE ENTRAR

**Lee esto en voz alta antes de la reunión:**

1. "Ofrezco valor real que transformará su negocio"
2. "Mi precio es justo y está basado en costos reales"
3. "Si no acepta mi precio, no es el cliente correcto"
4. "Tengo confianza en lo que construyo"
5. "Merrezco ganar bien por mi trabajo"
6. "Esta es una relación gana-gana o no es nada"
7. "Estoy aquí para resolver problemas, no para ser barato"

---

## 🎯 OBJETIVO FINAL

**ESCENARIO IDEAL:**
- Cierras a \$38M COP
- Con anualidad \$350 USD/mes × 12 meses
- Cliente feliz, tú rentable
- Relación a largo plazo

**ESCENARIO ACEPTABLE:**
- Cierras a \$35M COP con scope reducido
- O \$38M con términos de pago flexibles
- Cliente consciente de qué obtiene

**ESCENARIO RECHAZO:**
- Cliente quiere \$30M con scope completo
- Rechazas con elegancia
- Mantienes puerta abierta: "Si cambia presupuesto, con gusto retomamos"

---

## ✅ RESUMEN EN 3 PUNTOS

1. **VALOR PRIMERO, PRECIO DESPUÉS**
   No hables de \$38M hasta que entiendan el impacto

2. **CONFIANZA Y FIRMEZA**
   Di el precio, cállate, maneja objeciones sin regalar trabajo

3. **OPCIONES, NO DESCUENTOS**
   Si no pueden pagar, ajusta scope o términos, no precio

---

**¡Vas a cerrar esto! 🚀**

**Recuerda: El cliente correcto paga el precio justo.**
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
1. **SÉ CONCISO Y DIRECTO**: Máximo 100 palabras por respuesta (excepto propuestas completas en Markdown)
2. **REVISA ANTES DE RESPONDER**: Verifica que tu respuesta sea precisa, concisa y sin repeticiones
3. **Valida siempre viabilidad técnica:** Si Santiago promete algo fuera de scope, advierte inmediatamente
4. **Mantén el precio:** No sugieras bajar de $35M COP sin justificación de scope reducido
5. **Sé estratégico:** Prioriza valor sobre precio en tus respuestas
6. **Formato profesional:** Cuando generes propuestas, usa Markdown limpio y estructurado
7. **CONFIRMACIÓN ANTES DE CAMBIOS**: Si discutes ajustes al modelo financiero, timeline o propuesta, SIEMPRE pide confirmación explícita antes de recomendar actualizarlos. Una cosa es discutir una idea, otra es ejecutar el cambio.

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
    const { messages, useOpus = false } = await req.json();

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
          // Choose model based on useOpus flag
          const modelToUse = useOpus ? 'claude-opus-4-20250514' : 'claude-sonnet-4-5-20250929';

          const response = await anthropic.messages.create({
            model: modelToUse,
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
