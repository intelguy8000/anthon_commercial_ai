# 💼 PROPUESTA COMERCIAL - ESTUDIAR
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
```
Incremento conversión 10-15% = $180M COP adicionales/año
Ahorro operativo: 246 horas/año
ROI: Recuperación en 2-3 meses
```

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
| **Botón Bancolombia Básico** ⭐ | $0 | 80% (validación manual) | $0 |
| API Bancolombia Avanzado | $50K COP | 100% automático | $0 |
| PSE via Wompi | $0 fijo | 100% automático | $60K-$210K |

### **Nuestra Recomendación: Botón Bancolombia Básico (Fase 1)**

**FLUJO:**
1. Padre completa inscripción → Sistema genera plan de pagos
2. Padre sube comprobante PSE
3. **OCR extrae monto, fecha, referencia automáticamente**
4. Sistema notifica staff → Validan en 1-2 min
5. Sistema confirma al padre automáticamente

**VENTAJAS:**
- ✅ CERO comisión (ahorro $271M-$631M COP/año vs Wompi)
- ✅ Control total sobre pagos grandes
- ✅ Anti-fraude integrado

**TIEMPO STAFF:** 3-4 horas/mes para 200 estudiantes × 3-4 cuotas

**Upgrade Futuro (Opcional):** API Avanzado 100% automático ($50K COP/mes + $2M desarrollo)

---

## ⚙️ **4. METODOLOGÍA - 8 SEMANAS**

```
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
```

**NOTA:** Duración sujeta a disponibilidad de ESTUDIAR para validaciones.

---

## 💰 **5. INVERSIÓN**

### **Desarrollo Completo (Pago Único)**

```
═══════════════════════════════════════════════════════
Precio Regular:                          $40,000,000 COP

🎁 PRECIO LANZAMIENTO (Válido hasta 31 enero 2025):
                                         $38,000,000 COP

AHORRO:                                   $2,000,000 COP
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
- Consultoras colombianas: $55M-$90M COP
- Desarrollo in-house (6 meses): $96M-$130M COP
- Nuestra propuesta: $38M COP (30-50% más económico)

Forma de Pago:
├─ 50% firma: $19,000,000 COP
├─ 30% semana 4: $11,400,000 COP
└─ 20% entrega: $7,600,000 COP
```

---

### **Costos Operacionales Mensuales**

**Cliente paga DIRECTO a proveedores (NO a Loopera):**

```
1. Infraestructura Azure (Microsoft):
   Azure SQL + Blob Storage + Backup     $39 USD/mes (~$160K COP)

2. Servicios Adicionales:
   Dominio .co                           $1 USD/mes
   DocuSign (10 sobres/mes)              $25 USD/mes
   OpenAI API (Chat AI)                  $3 USD/mes
   ─────────────────────────────────────────────────
   SUBTOTAL:                             $29 USD/mes

3. Hosting Vercel:                       Incluido en anualidad ✅

4. Pasarela Pagos:                       $0 (Bancolombia Básico) ✅

───────────────────────────────────────────────────────
TOTAL INFRAESTRUCTURA:                   $68 USD/mes
                                         (~$279K COP/mes)
```

**GESTIÓN AZURE:**
- ESTUDIAR crea cuenta Azure (facturación a su nombre)
- Loopera recibe credenciales admin delegadas
- ESTUDIAR mantiene cuenta "owner" de respaldo
- Al cancelar anualidad: transferencia 100% de accesos

---

### **Anualidad Loopera (Soporte y Mantenimiento)**

```
═══════════════════════════════════════════════════════
AÑO 1: $350 USD/mes ($4,200 USD/año = ~$17.2M COP/año)
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

❌ NO INCLUIDO (Cotización: $75 USD/hora):
- Nuevas features grandes (ej: módulo contabilidad)
- Integraciones adicionales (ej: ERP)
- Rediseño completo de interfaces

═══════════════════════════════════════════════════════
AÑO 2+: $500 USD/mes + ajuste inflación (máx 10% anual)
═══════════════════════════════════════════════════════

Notificación: 60 días antes de renovación
Ejemplo: Si inflación USD es 3%, año 2 sería $515 USD/mes

FLEXIBILIDAD:
Si cancelan anualidad, plataforma sigue funcionando
(tienen licencia perpetua). Solo pierden soporte activo.
```

---

### **Resumen Financiero Total**

```
═══════════════════════════════════════════════════════
INVERSIÓN AÑO 1:
├─ Desarrollo (una vez):                 $38,000,000 COP
├─ Infraestructura (12 meses):            $3,348,000 COP
└─ Anualidad Loopera (12 meses):         $17,220,000 COP
    ─────────────────────────────────────────────────
    TOTAL AÑO 1:                         $58,568,000 COP

AÑOS SIGUIENTES (solo recurrente):
├─ Infraestructura:                       $3,348,000 COP/año
└─ Anualidad Loopera:                    $24,600,000 COP/año
    ─────────────────────────────────────────────────
    TOTAL/AÑO:                           $27,948,000 COP/año

═══════════════════════════════════════════════════════
TOTAL 3 AÑOS:                           $114,464,000 COP
═══════════════════════════════════════════════════════

COMPARACIÓN:

Developer in-house (3 años):
- $8M/mes × 36 meses = ~$360M COP
- AHORRO: $245M COP (68% menos)

RETORNO DE INVERSIÓN:
- Incremento 15% conversión = $180M COP/año adicional
- Inversión año 1: $58.6M COP
- ROI: 307% primer año
- Recuperación: 2-3 meses
```

---

## 🎁 **6. DIFERENCIADORES CLAVE**

1. **💎 Chat AI para Gerencia** - Ninguna consultora local lo ofrece
2. **🎁 SSO Google/Microsoft** - Bonus sin costo (valor: $500 USD/año)
3. **💰 Hosting optimizado** - Vercel incluido en anualidad
4. **📊 Dashboard para claridad** - No solo genérico, diseñado para identificar qué va bien/mal
5. **💳 Pagos sin comisión** - Ahorro $271M-$631M COP/año vs Wompi
6. **⚡ Entrega rápida** - 8 semanas vs 9-11 mercado
7. **🏗️ Stack moderno** - Next.js 14, TypeScript, Azure enterprise

---

## 📊 **7. CASOS DE USO**

### **Escenario 1: CEO reporta a socios**
**HOY:** 3 horas consolidando Excels, respuesta al día siguiente
**CON PLATAFORMA:** Dashboard en celular + Chat AI = 30 segundos

### **Escenario 2: Evento en colegio**
**HOY:** Formularios papel → 2 horas transcribiendo → 40% conversión
**CON PLATAFORMA:** QR escanean → 10 minutos → 70% conversión = +$138M COP/evento

### **Escenario 3: Validación de pagos**
**HOY:** Screenshot por WhatsApp → buscar 15 min → transcribir manual
**CON PLATAFORMA:** Upload → OCR automático → validar 30 seg → 90% más rápido

---

## 🔮 **8. MÓDULOS OPCIONALES (Futuro)**

**NO incluidos** en $38M, pero plataforma preparada para soportarlos:

| Módulo | Inversión | Mensualidad | Tiempo |
|--------|-----------|-------------|--------|
| Facturación DIAN | $8M COP | $50K COP | 3-4 semanas |
| API Bancolombia Avanzado | $2M COP | $50K COP | 1 semana |
| App Móvil Nativa (iOS/Android) | $25M COP | $150 USD | 8 semanas |
| Galería Fotos Premium | $5M COP | $100 USD | 2 semanas |

**PREGUNTA:** ¿ESTUDIAR requiere facturación electrónica para fase 1? Si SÍ, podemos incluirlo ajustando inversión a $46M COP.

---

## 📞 **9. PRÓXIMOS PASOS**

```
PASO 1: Reunión Validación (1 hora)
        ├─ Revisar propuesta en detalle
        ├─ Aclarar dudas técnicas
        ├─ Ajustar alcance si necesario
        └─ Confirmar precio y términos

PASO 2: Firma Contrato (1-2 días)
        ├─ Contrato servicios + NDA bilateral
        └─ Pago inicial 50% ($19M COP)

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
```

**URGENCIA:** Precio lanzamiento $38M válido hasta **31 enero 2025**. Después: $40M COP.

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
