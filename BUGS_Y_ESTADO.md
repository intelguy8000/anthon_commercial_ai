# 🐛 BUGS CONOCIDOS Y ESTADO DEL PROYECTO

**Fecha**: 31 Octubre 2025
**Proyecto**: LoopIA - Asistente Comercial para Estudiarte

---

## 🔴 BUGS CRÍTICOS ACTUALES

### 1. **Propuesta incompleta en el chat**
**Síntoma**: Cuando se usa `#lapropuesta`, la IA genera la propuesta pero se corta antes de completar.

**Posibles causas**:
- El modelo Sonnet 4.5 tiene un límite de tokens de salida (max_tokens: 4096)
- La propuesta completa requiere más de 4096 tokens
- El sistema se detiene automáticamente al alcanzar el límite

**Solución propuesta**:
```typescript
// En app/api/chat/route.ts línea ~1365
const response = await anthropic.messages.create({
  model: modelToUse,
  max_tokens: 4096, // ← AUMENTAR A 8192
  system: systemPrompt,
  messages: messages.map(...),
  stream: true,
});
```

**Alternativa**: Usar solo Opus para propuestas (tiene más capacidad de salida)

---

### 2. **Vista Previa no actualiza**
**Síntoma**: Cuando termina la generación, no aparece el banner amarillo de confirmación y la vista previa permanece vacía.

**Debugging realizado**:
- ✅ Extracción de markdown mejorada con 4 estrategias de fallback
- ✅ Logs de consola agregados
- ✅ Contador de caracteres en header

**Problema identificado**:
El código de extracción está en `finally` block pero parece que `lastAssistantMessageRef.current` no se está actualizando correctamente durante el streaming.

**Ubicación del código**:
- `components/ChatPanel.tsx` líneas 169 (actualización del ref) y 220-260 (extracción)

**Solución propuesta**:
```typescript
// Cambiar de useRef a useState para forzar re-render
const [lastAssistantMessage, setLastAssistantMessage] = useState('');

// En el streaming (línea ~169):
if (parsed.content) {
  assistantMessage += parsed.content;
  setLastAssistantMessage(assistantMessage); // ← Usar setState
  setMessages((prev) => {
    // ...
  });
}

// En finally (línea ~218):
const assistantMessage = lastAssistantMessage; // ← Leer del state
```

---

### 3. **Banner de confirmación no aparece**
**Síntoma**: Después de la generación, no se muestra el banner amarillo con "✓ Aplicar" y "✕ Cancelar".

**Causa probable**:
El `setPendingAction()` se ejecuta pero el componente no renderiza porque:
1. La extracción falló y `pendingProposal` es undefined
2. O el contenido no tiene headers `#` o `##`

**Verificación necesaria**:
Revisar la consola del navegador para estos logs:
```
🔍 Procesando hashtags: { hasProposal: true, messageLength: XXXX }
📄 Propuesta extraída: XXXX caracteres
```

Si dice "⚠️ No se pudo extraer markdown" → la extracción está fallando

---

## 📊 ESTADO ACTUAL DEL CÓDIGO

### ✅ Funcionalidades que SÍ funcionan:

1. **Chat básico**
   - ✅ Mensajes se envían y reciben correctamente
   - ✅ Streaming funciona
   - ✅ Persistencia en localStorage (0.9% usado)
   - ✅ Botón Stop funciona
   - ✅ LoopAI Pro (Opus) se activa correctamente

2. **Modelo Financiero**
   - ✅ Cálculos de cash flow funcionan
   - ✅ Visualización responsive
   - ✅ Timeline está conectado

3. **Vista Previa**
   - ✅ Estilos de Loopera aplicados (#EA2839 rojo, Calibri font)
   - ✅ Scroll funciona correctamente
   - ✅ Contador de caracteres visible
   - ✅ Exportación a PDF multi-página implementada

### ⚠️ Funcionalidades PARCIALES:

1. **Sistema de Hashtags**
   - ✅ Detección de hashtags (#lapropuesta, #modelofinanciero, #todo)
   - ❌ Extracción de contenido markdown (falla intermitentemente)
   - ❌ Banner de confirmación (no aparece)
   - ❌ Aplicación de cambios a paneles (nunca se ejecuta)

2. **Generación de propuestas**
   - ⚠️ Se genera pero incompleta (se corta en ~30-40%)
   - ⚠️ Falta aumentar max_tokens

---

## 🔧 ARCHIVOS CLAVE Y UBICACIONES

### 1. **ChatPanel.tsx** (Principal problema)
**Ruta**: `/Users/juanus/anthon_commercial_ai/components/ChatPanel.tsx`

**Secciones importantes**:
- **Línea 40**: `lastAssistantMessageRef` - useRef que guarda el mensaje
- **Línea 117**: `detectHashtags()` - Función que busca #lapropuesta, etc.
- **Línea 169**: Actualización del ref durante streaming (⚠️ PROBLEMA AQUÍ)
- **Línea 210-260**: Bloque finally que extrae markdown (⚠️ PROBLEMA AQUÍ)
- **Línea 414-452**: Banner de confirmación UI (nunca se muestra)

**Cambios recientes**:
- Agregado `lastAssistantMessageRef` para tracking
- Mejorado regex de extracción con 4 estrategias
- Agregado console.log para debugging

### 2. **route.ts** (API)
**Ruta**: `/Users/juanus/anthon_commercial_ai/app/api/chat/route.ts`

**Secciones importantes**:
- **Línea 1344-1425**: POST handler principal
- **Línea 1365**: `max_tokens: 4096` ← AUMENTAR A 8192
- **Línea 1257-1342**: System prompt con instrucciones de hashtags
- **Línea 1307-1328**: Instrucciones específicas de hashtags

### 3. **PreviewPanel.tsx**
**Ruta**: `/Users/juanus/anthon_commercial_ai/components/PreviewPanel.tsx`

**Estado**: ✅ Funcionando correctamente
- Estilos aplicados
- Scroll funciona
- PDF multi-página implementado
- Solo falta recibir el contenido desde ChatPanel

### 4. **page.tsx**
**Ruta**: `/Users/juanus/anthon_commercial_ai/app/page.tsx`

**Estado**: ✅ Callbacks conectados
- `onProposalUpdate` conectado a `setProposalContent`
- `onFinancialUpdate` conectado a `setProjectCost` y `setWeeksTimeline`

---

## 🎯 PLAN DE ACCIÓN PARA PRÓXIMA SESIÓN

### Prioridad 1: Arreglar generación incompleta
```typescript
// app/api/chat/route.ts línea ~1365
const response = await anthropic.messages.create({
  model: modelToUse,
  max_tokens: 8192, // Aumentar de 4096
  system: systemPrompt,
  messages: messages.map(...),
  stream: true,
});
```

### Prioridad 2: Arreglar extracción de markdown
**Opción A**: Cambiar de useRef a useState
```typescript
// components/ChatPanel.tsx línea ~40
const [lastAssistantMessage, setLastAssistantMessage] = useState('');

// Línea ~169 durante streaming:
setLastAssistantMessage(assistantMessage);

// Línea ~218 en finally:
const assistantMessage = lastAssistantMessage;
```

**Opción B**: Leer directamente del estado de messages
```typescript
// En finally block:
setMessages((prev) => {
  const lastMsg = prev[prev.length - 1];
  if (lastMsg?.role === 'assistant') {
    const assistantMessage = lastMsg.content;
    // Extraer markdown aquí
  }
  return prev;
});
```

### Prioridad 3: Debugging
Agregar más logs para entender dónde falla:
```typescript
console.log('🔍 lastAssistantMessageRef:', lastAssistantMessageRef.current?.length);
console.log('📝 Contenido extraído:', pendingProposal?.substring(0, 100));
console.log('✅ setPendingAction llamado:', { type, hasProposal: !!pendingProposal });
```

---

## 🧪 TESTING CHECKLIST

Cuando se arreglen los bugs, probar en este orden:

1. **Test básico de generación**
   - [ ] Enviar: `escribe una propuesta breve de 500 palabras`
   - [ ] Verificar que se complete sin cortarse
   - [ ] Confirmar que tiene >2000 caracteres

2. **Test de hashtag simple**
   - [ ] Enviar: `actualiza #lapropuesta con una propuesta corta`
   - [ ] Verificar en consola: `🔍 Procesando hashtags`
   - [ ] Verificar en consola: `📄 Propuesta extraída: XXXX caracteres`
   - [ ] Confirmar que aparece banner amarillo
   - [ ] Click en "✓ Aplicar"
   - [ ] Verificar que Vista Previa se actualiza

3. **Test de propuesta completa**
   - [ ] Enviar: `actualiza #lapropuesta con la propuesta completa de Loopera`
   - [ ] NO presionar Stop
   - [ ] Esperar a que complete (~30-60 segundos con Sonnet)
   - [ ] Verificar que tiene >15,000 caracteres en consola
   - [ ] Aplicar y verificar Vista Previa completa
   - [ ] Exportar PDF y verificar múltiples páginas

4. **Test de modelo financiero**
   - [ ] Enviar: `actualiza #modelofinanciero con $35M en 6 semanas`
   - [ ] Verificar extracción: precio=35, weeks=6
   - [ ] Aplicar cambios
   - [ ] Confirmar que Modelo Financiero muestra $35.0M y timeline de 6 semanas

---

## 📝 NOTAS IMPORTANTES

### System Prompt
El system prompt incluye instrucciones sobre hashtags (líneas 1307-1328 en route.ts):
- Explica qué es #lapropuesta, #modelofinanciero, #todo
- Indica que debe generar markdown en bloques ```markdown
- Indica que debe mencionar precio ($XXM) y semanas claramente

### Estilos Loopera
Basados en `/Users/juanus/Downloads/layout.html`:
- Color principal: #EA2839 (rojo Loopera)
- Color secundario: #0065BD (azul para highlights)
- Font: Calibri, Arial
- Headers con línea inferior roja
- Tablas con header rojo
- Texto justificado

### Modelos Claude
- **Sonnet 4.5**: `claude-sonnet-4-5-20250929` (rápido, económico, max_tokens actual: 4096)
- **Opus 4.1**: `claude-opus-4-20250514` (más potente, 5x más caro, max_tokens puede ser mayor)

---

## 🚀 COMANDOS ÚTILES

### Limpiar localStorage del chat
```javascript
// En consola del navegador:
localStorage.removeItem('loopia-chat-history');
// O:
localStorage.clear();
```

### Ver contenido capturado en consola
```javascript
// Los logs que deben aparecer:
🔍 Procesando hashtags: { hasProposal: true, messageLength: 15234 }
📄 Propuesta extraída: 12500 caracteres
```

### Reiniciar dev server
```bash
# Terminal:
# Ctrl+C para detener
npm run dev
```

### Verificar deploy en Vercel
El código se pushea automáticamente a:
- Repo: `https://github.com/intelguy8000/anthon_commercial_ai.git`
- Vercel autodeploy configurado

---

## 📚 RECURSOS

### Documentación Claude
- Modelos: Usuario ya tiene acceso con API key "lupia"
- Límites: https://docs.anthropic.com/en/docs/about-claude/models

### Layout de referencia
- `/Users/juanus/Downloads/layout.html` - Estilos oficiales de Loopera

### Propuesta base
- Embedded en `route.ts` líneas 15-1255
- Contiene PROPUESTA_EJECUTIVA y GUIA_NEGOCIACION completas

---

## ✅ ÚLTIMA ACTUALIZACIÓN

**Commit más reciente**: `802df6f` - "Add debugging and improve markdown extraction"

**Cambios pusheados**:
- ✅ Mejoras en extracción de markdown (4 estrategias)
- ✅ Logs de debugging agregados
- ✅ Contador de caracteres en Vista Previa
- ✅ Estilos Loopera aplicados
- ✅ PDF multi-página implementado

**Por hacer**:
- ❌ Aumentar max_tokens a 8192
- ❌ Arreglar actualización del ref durante streaming
- ❌ Verificar que banner de confirmación aparece
- ❌ Testing completo del flujo hashtags

---

**Estado general**: Sistema 70% funcional. Chat y UI funcionan bien. Sistema de hashtags necesita debugging adicional en la extracción de contenido.
