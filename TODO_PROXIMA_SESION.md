# ⚡ TODO - PRÓXIMA SESIÓN

## 🔴 ARREGLOS URGENTES (15 minutos)

### 1. Aumentar límite de tokens (5 min)
**Archivo**: `app/api/chat/route.ts` línea ~1365

```typescript
// CAMBIAR ESTO:
max_tokens: 4096,

// POR ESTO:
max_tokens: 8192,
```

**Por qué**: Las propuestas completas necesitan más de 4096 tokens y se están cortando.

---

### 2. Arreglar actualización del mensaje (10 min)
**Archivo**: `components/ChatPanel.tsx`

**Problema**: `lastAssistantMessageRef.current` no se actualiza correctamente.

**Solución rápida**:
```typescript
// Línea ~40 - CAMBIAR:
const lastAssistantMessageRef = useRef<string>('');

// POR:
const [lastAssistantMessage, setLastAssistantMessage] = useState('');

// Línea ~169 - CAMBIAR:
lastAssistantMessageRef.current = assistantMessage;

// POR:
setLastAssistantMessage(assistantMessage);

// Línea ~218 - CAMBIAR:
const assistantMessage = lastAssistantMessageRef.current;

// POR:
const assistantMessage = lastAssistantMessage;
```

---

## 🧪 TESTING (5 minutos)

Una vez hechos los cambios:

1. Refresh de la página
2. Enviar: `actualiza #lapropuesta con una propuesta breve de 1000 palabras`
3. **NO presionar Stop**
4. Esperar a que termine
5. Verificar en consola:
   ```
   🔍 Procesando hashtags: { hasProposal: true, messageLength: >5000 }
   📄 Propuesta extraída: >3000 caracteres
   ```
6. Verificar que aparece **banner amarillo**
7. Click "✓ Aplicar"
8. Confirmar que Vista Previa se actualiza

---

## 📋 CHECKLIST COMPLETO

- [ ] Aumentar max_tokens a 8192
- [ ] Cambiar lastAssistantMessageRef a useState
- [ ] Commit y push
- [ ] Refresh página en navegador
- [ ] Test con propuesta breve (1000 palabras)
- [ ] Verificar logs en consola
- [ ] Verificar banner amarillo aparece
- [ ] Aplicar cambios
- [ ] Verificar Vista Previa actualiza
- [ ] Test con propuesta completa
- [ ] Exportar PDF y verificar múltiples páginas

---

## 🐛 SI AÚN NO FUNCIONA

### Debugging adicional:

Agregar más logs en `ChatPanel.tsx` línea ~220:

```typescript
console.log('🔍 Procesando hashtags:', {
  hasProposal,
  hasFinancial,
  messageLength: assistantMessage.length,
  firstChars: assistantMessage.substring(0, 100) // Ver primeros 100 chars
});

// Después de extracción línea ~250:
console.log('📄 Propuesta extraída:', {
  length: pendingProposal?.length,
  firstChars: pendingProposal?.substring(0, 100)
});

// Antes de setPendingAction línea ~255:
console.log('✅ Llamando setPendingAction:', {
  type: pendingProposal && pendingFinancial ? 'both' : pendingProposal ? 'proposal' : 'financial',
  hasProposal: !!pendingProposal,
  hasFinancial: !!pendingFinancial
});
```

Esto ayudará a ver exactamente dónde falla.

---

## 📞 CONTACTO

Si necesitas ayuda, revisar:
- `BUGS_Y_ESTADO.md` - Documentación completa
- Console del navegador - Logs de debugging
- Terminal - Errores del servidor

**Última actualización**: 31 Oct 2025
