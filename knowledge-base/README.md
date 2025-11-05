# 📚 Knowledge Base

Esta carpeta está diseñada para almacenar documentación específica de cada proyecto/cliente.

## 🎯 Propósito

El asistente LoopIA puede utilizar archivos de esta carpeta como contexto para:
- Propuestas comerciales previas
- Guías de negociación
- Información del cliente
- Scripts de venta
- Análisis de costos
- Modelos de pricing

## 📂 Cómo Usar

1. **Crea archivos Markdown** (.md) con la información relevante
2. **Actualiza `app/api/chat/route.ts`** para incluir ese contenido en `KNOWLEDGE_BASE`
3. El asistente usará ese contexto en todas las conversaciones

## 📝 Ejemplo de Estructura

```
knowledge-base/
├── README.md (este archivo)
├── PROPUESTA_CLIENTE_A.md
├── GUIA_NEGOCIACION_CLIENTE_A.md
├── COSTOS_PROYECTO_X.md
└── SCRIPTS_RESPUESTAS.md
```

## ⚙️ Integración con el Código

Para que el asistente use estos archivos, edita el archivo:

**`app/api/chat/route.ts`** líneas 16-31

Reemplaza el contenido de `KNOWLEDGE_BASE` con tu información específica.

## 🧹 Estado Actual

**Limpio y listo** para tu próximo proyecto. No hay archivos de proyectos previos.

---

**Tip:** Puedes versionar diferentes bases de conocimiento por rama de Git para mantener
contextos separados por cliente.
