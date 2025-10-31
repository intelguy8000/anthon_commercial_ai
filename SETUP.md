# 🚀 Setup Lupia MVP

## Paso 1: Configurar API Key de Anthropic

1. Ve a https://console.anthropic.com/settings/keys
2. Crea una nueva API key
3. Abre el archivo `.env.local` en la raíz del proyecto
4. Reemplaza `your_anthropic_api_key_here` con tu API key real

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
```

## Paso 2: Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:3000

## Paso 3: Probar funcionalidades

### Chat AI con memoria
- Escribe mensajes en el panel izquierdo
- Lupia recordará todo el contexto de la conversación
- Prueba preguntas como:
  - "¿Cuál es el precio de la propuesta?"
  - "El cliente dice que es caro, ¿cómo respondo?"
  - "Genera la propuesta completa en markdown"

### Vista Previa Markdown
- Cuando Lupia genere contenido en markdown, aparecerá automáticamente en el panel central
- Puedes exportar a PDF usando el botón "Exportar PDF"

### Cheat Sheet
- Panel derecho muestra:
  - Líneas rojas de negociación
  - Números clave del proyecto
  - Respuestas a objeciones comunes
  - Tips de cierre

## Estructura de archivos creada

```
anthon_commercial_ai/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API endpoint de Claude
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal (3 paneles)
├── components/
│   ├── ChatPanel.tsx             # Chat con memoria
│   ├── PreviewPanel.tsx          # Vista previa + PDF export
│   └── CheatSheet.tsx            # Guía de negociación
├── knowledge-base/               # Documentación del cliente
│   ├── PROPUESTA_ESTUDIARTE_EJECUTIVA.md
│   ├── GUIA_NEGOCIACION_ESTUDIARTE.md
│   └── ...
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── .env.local                    # Variables de entorno (NO COMMIT)
```

## Próximos pasos

### Para desarrollo local
- Edita componentes en `components/`
- Ajusta el system prompt en `app/api/chat/route.ts`
- Modifica estilos en `app/globals.css` o con Tailwind

### Para deploy a Vercel
```bash
# 1. Instala Vercel CLI
npm i -g vercel

# 2. Login a Vercel
vercel login

# 3. Deploy
vercel

# 4. Configura environment variables en Vercel dashboard
# ANTHROPIC_API_KEY=tu_key
```

## Troubleshooting

### Error: ANTHROPIC_API_KEY no configurada
- Verifica que `.env.local` existe y tiene la API key
- Reinicia el servidor (`npm run dev`)

### Error: Cannot find module
- Ejecuta `npm install` de nuevo
- Borra `.next/` y reinicia

### Chat no responde
- Revisa la consola del navegador (F12)
- Verifica que la API key sea válida
- Chequea que tienes créditos en tu cuenta de Anthropic
