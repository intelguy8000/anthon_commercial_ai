const fs = require('fs');
const path = require('path');

// Read knowledge base files
const propuesta = fs.readFileSync(
  path.join(__dirname, '../knowledge-base/PROPUESTA_ESTUDIARTE_EJECUTIVA.md'),
  'utf-8'
);

const guia = fs.readFileSync(
  path.join(__dirname, '../knowledge-base/GUIA_NEGOCIACION_ESTUDIARTE.md'),
  'utf-8'
);

// Escape content for template literals
const escapeProp = (str) => str.replace(/`/g, '\\`').replace(/\$/g, '\\$');

// Read current route.ts
const routePath = path.join(__dirname, '../app/api/chat/route.ts');
let routeContent = fs.readFileSync(routePath, 'utf-8');

// Replace the placeholders with full content
const fullPropuesta = escapeProp(propuesta);
const fullGuia = escapeProp(guia);

// Find and replace the constants
routeContent = routeContent.replace(
  /const PROPUESTA_EJECUTIVA = `[\s\S]*?`;/,
  `const PROPUESTA_EJECUTIVA = \`${fullPropuesta}\`;`
);

routeContent = routeContent.replace(
  /const GUIA_NEGOCIACION = `[\s\S]*?`;/,
  `const GUIA_NEGOCIACION = \`${fullGuia}\`;`
);

// Write back
fs.writeFileSync(routePath, routeContent, 'utf-8');

console.log('✅ Knowledge base embedded successfully!');
console.log(`   Propuesta: ${propuesta.length} chars`);
console.log(`   Guía: ${guia.length} chars`);
console.log(`   Total: ${(propuesta.length + guia.length) / 1024} KB`);
