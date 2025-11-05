# 🤖 Lupia - Asistente Comercial IA

> **Copiloto inteligente para procesos comerciales complejos**

[![Status](https://img.shields.io/badge/status-pilot-yellow)](https://github.com/intelguy8000/anthon_commercial_ai)
[![License](https://img.shields.io/badge/license-Private-red)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-blue)](https://openai.com)

---

## 📖 ¿Qué es Lupia?

**Lupia** es un asistente de IA conversacional diseñado para ayudar a consultores comerciales en la creación, refinamiento y negociación de propuestas complejas.

### **Problema que Resuelve:**

Los consultores comerciales (especialmente no-técnicos) enfrentan desafíos al:
- ✅ Estimar correctamente alcances técnicos
- ✅ Responder objeciones en tiempo real
- ✅ Mantener coherencia en números/pricing
- ✅ Negociar sin regalar el proyecto

**Lupia actúa como tu copiloto experto**, guiándote a través de cada paso.

---

## 🎯 Caso de Uso Piloto: Estudiarte

**Cliente:** Agencia de viajes educativos en Colombia
**Proyecto:** Plataforma web de gestión integral
**Inversión:** $38M-40M COP
**Desafío:** Primera propuesta grande de Loopera

**Ver documentación completa:** [`docs/PROJECT_OVERVIEW.md`](docs/PROJECT_OVERVIEW.md)

---

## 🚀 Quick Start

### **Requisitos:**
- Node.js 18+
- Cuenta OpenAI con API key

### **Instalación:**

```bash
# Clonar repositorio
git clone https://github.com/intelguy8000/anthon_commercial_ai.git
cd anthon_commercial_ai

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus keys

# Correr en desarrollo
npm run dev
```

Abrir [http://localhost:3000/lupia](http://localhost:3000/lupia)

---

## 🏗️ Arquitectura

```
┌──────────────────────────────────────────────────────┐
│  LUPIA - Interfaz Web                                │
├────────────────┬─────────────────┬──────────────────┤
│  Chat AI       │  Preview Live   │  Cheat Sheet     │
│  (GPT-4)       │  (Markdown)     │  (Tips/Scripts)  │
└────────────────┴─────────────────┴──────────────────┘
         │                 │                 │
         └─────────────────┴─────────────────┘
                          │
                ┌─────────▼─────────┐
                │  OpenAI API       │
                │  (Streaming)      │
                └───────────────────┘
```

### **Stack:**
- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **AI:** OpenAI GPT-4 / GPT-4 Turbo
- **Deploy:** Vercel
- **Auth:** NextAuth.js (futuro)

---

## 📁 Estructura del Proyecto

```
anthon_commercial_ai/
├── app/                    # Next.js App Router
│   ├── api/
│   │   ├── chat/          # Endpoint streaming OpenAI
│   │   └── pdf/           # Generación de PDFs
│   └── lupia/             # UI principal
├── components/            # Componentes React
│   ├── chat-panel.tsx
│   ├── markdown-preview.tsx
│   └── cheat-sheet.tsx
├── lib/                   # Lógica de negocio
│   ├── openai.ts          # Cliente OpenAI
│   ├── prompts.ts         # System prompts
│   └── knowledge-base.ts  # Base de conocimiento
├── knowledge-base/        # Documentación comercial
│   ├── PROPUESTA_ESTUDIARTE_FINAL_V2.md
│   ├── GUIA_NEGOCIACION_ESTUDIARTE.md
│   ├── ANALISIS_PAGOS_ESTUDIARTE.md
│   └── COSTOS_OPTIMIZADOS_ESTUDIARTE.md
├── docs/                  # Documentación técnica
│   └── PROJECT_OVERVIEW.md
└── README.md
```

---

## 🎨 Features

### **✅ Fase 1 (MVP - Activa)**
- [x] Chat conversacional con GPT-4
- [x] Preview de propuesta en Markdown
- [x] Cheat Sheet con tips de negociación
- [ ] Streaming de respuestas
- [ ] Export a PDF

### **🚧 Fase 2 (Post-Piloto)**
- [ ] Historial de conversaciones
- [ ] Autenticación segura
- [ ] Guardado de propuestas
- [ ] Calculadora de pricing dinámica
- [ ] Modo "Práctica de Objeciones"

### **💡 Fase 3 (Roadmap)**
- [ ] Multi-cliente (templates por industria)
- [ ] Dashboard de métricas
- [ ] Modo "Role Play" (IA simula cliente)
- [ ] Integración con CRM
- [ ] App móvil

---

## 📚 Documentación

- **[Project Overview](docs/PROJECT_OVERVIEW.md)** - Visión completa del proyecto
- **[Guía de Negociación](knowledge-base/GUIA_NEGOCIACION_ESTUDIARTE.md)** - Scripts y objeciones
- **[Propuesta Estudiarte](knowledge-base/PROPUESTA_ESTUDIARTE_FINAL_V2.md)** - Caso de uso piloto

---

## 🔒 Seguridad

Este repositorio es **PRIVADO** y contiene información sensible de clientes.

**Políticas:**
- ✅ API keys en variables de entorno (nunca en código)
- ✅ Datos de clientes encriptados
- ✅ Acceso restringido solo a equipo Loopera
- ✅ No guardar conversaciones en logs de OpenAI

---

## 🧪 Testing

```bash
# Correr tests unitarios
npm test

# Correr tests E2E
npm run test:e2e

# Lint
npm run lint
```

---

## 🚀 Deploy

### **Vercel (Recomendado):**

```bash
# Deploy a producción
vercel --prod

# Deploy preview
vercel
```

### **Variables de Entorno (Vercel):**

```
OPENAI_API_KEY=sk-xxx
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=https://lupia.vercel.app
```

---

## 📊 Métricas de Éxito

### **Piloto Estudiarte:**

| Métrica | Antes | Con Lupia | Mejora |
|---------|-------|-----------|--------|
| Tiempo prep propuesta | 20h | <5h | 75% ↓ |
| Errores en números | 3-5 | 0-1 | 90% ↓ |
| Confianza del consultor | 6/10 | 9/10 | 50% ↑ |
| **Cierre de deal** | - | **Meta: SÍ** | - |

---

## 🛠️ Troubleshooting

### **Error: API Key inválida**
```bash
# Verificar que la key esté configurada
echo $ANTHROPIC_API_KEY
```

### **Error: Puerto 3000 ocupado**
```bash
# Usar puerto alternativo
PORT=3001 npm run dev
```

### **Streaming no funciona**
- Verificar que el navegador soporte SSE (Server-Sent Events)
- Chrome/Edge/Safari soportados
- Firefox puede requerir configuración

---

## 🤝 Contribuir

Este es un proyecto privado. Solo el equipo de Loopera puede contribuir.

### **Workflow:**
1. Crear branch desde `main`: `git checkout -b feature/nueva-feature`
2. Hacer commits descriptivos
3. Push y crear PR
4. Revisión de Juan o Santi
5. Merge a `main`

---

## 📝 Changelog

### **v0.1.0 (MVP) - Noviembre 2024**
- ✅ Setup inicial Next.js + OpenAI
- ✅ Documentación completa del proyecto
- ✅ Knowledge base con caso Estudiarte
- 🚧 UI en desarrollo

---

## 👥 Equipo

- **Juan** - Tech Lead / Backend / Infraestructura
- **Santiago Lopera** - Product Owner / Commercial Lead
- **ChatGPT (OpenAI)** - AI Copilot

---

## 📞 Contacto

**Loopera - Soluciones Tecnológicas**

📧 Email: santiago.lopera@loopera.co
🌐 Web: [loopera.co](https://www.loopera.co)
📅 Agendar: [calendly.com/santiago-lopera-loopera](https://calendly.com/santiago-lopera-loopera/sesion-exploratoria)

---

## 📄 Licencia

Privado - © 2024 Loopera. Todos los derechos reservados.

---

## 🎯 Visión

**Lupia no es solo para Estudiarte.**

Es el inicio de una plataforma que ayudará a consultores en todo LATAM a competir con grandes agencias, cerrando deals que antes parecían imposibles.

**Next stop:** Convertir Lupia en el copiloto comercial #1 para consultores tech en Colombia.

---

**Built with ❤️ by Loopera** 🚀
