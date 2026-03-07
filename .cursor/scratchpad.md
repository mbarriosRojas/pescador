# Scratchpad - Pescador Project

## Estado Actual del Repositorio
- Repositorio: https://github.com/mbarriosRojas/pescador.git
- Rama actual: cursor/desarrollo-aplicaci-n-pescador-8a5c
- Proyectos existentes: Médico Online Landing Page (Astro)

## Nueva Tarea: Sistema de Gestión de Tareas e Historias de Usuario

### Decisión Arquitectural Aprobada

**Sistema:** File-based Task Management + GitHub Actions  
**Enfoque:** Lightweight, Git-native, automation-driven

### Stack Tecnológico Definido
- **Formato de Tareas:** YAML (version-controlled)
- **CLI Tool:** TypeScript + Node.js
- **Automatización:** GitHub Actions
- **Dashboard:** HTML/CSS/JS estático (GitHub Pages)
- **API GitHub:** Octokit (REST)
- **Validación:** JSON Schema + Ajv

### Estructura de Carpetas Planificada
```
pescador/
├── .github/workflows/          # GitHub Actions
│   ├── process-tasks.yml       # Generación de PRs
│   ├── validate-stories.yml    # Validación YAML
│   ├── sync-status.yml         # Sincronización estados
│   └── generate-dashboard.yml  # Dashboard estático
├── tasks/
│   ├── stories/                # User stories (YAML)
│   ├── epics/                  # Épicas
│   ├── templates/              # Plantillas
│   └── archive/                # Historias completadas
├── scripts/task-manager/       # CLI TypeScript
│   ├── src/
│   │   ├── parser.ts
│   │   ├── validator.ts
│   │   ├── generator.ts
│   │   ├── github-client.ts
│   │   └── cli.ts
│   ├── package.json
│   └── tsconfig.json
├── docs/tasks/                 # Dashboard HTML
└── [proyecto Astro existente]
```

### Flujo de Trabajo
1. Product Owner crea story en YAML
2. Workflow valida el archivo
3. GitHub Action genera PR automáticamente
4. Developer implementa en feature branch
5. Al merge, workflow actualiza estado y archiva story
6. Dashboard se regenera mostrando métricas

### Fases de Implementación
- **Fase 1:** Foundation - Estructura + templates
- **Fase 2:** CLI - Herramienta TypeScript
- **Fase 3:** GitHub Actions - Automatización
- **Fase 4:** Dashboard - Visualización
- **Fase 5:** Documentación y testing

### Estado Actual
✅ Arquitectura definida  
✅ Estructura de directorios creada
✅ Templates y schemas YAML implementados
✅ CLI TypeScript funcional
✅ GitHub Actions workflows configurados
✅ Dashboard estático generado
✅ Integración con landing page completada
✅ Documentación completa (README.md)
✅ Tests de integración pasados
✅ Dependencias instaladas y verificadas
✅ Commits finales realizados
✅ Push a main completado (commit: 9c6bc48)

### Componentes Implementados

#### 1. Sistema de Archivos
- `tasks/stories/` - User stories en YAML
- `tasks/epics/` - Épicas
- `tasks/templates/` - Plantillas
- `tasks/schemas/` - JSON schemas para validación
- `tasks/archive/` - Historias completadas

#### 2. CLI TypeScript (`scripts/task-manager/`)
- ✅ Creación interactiva de stories
- ✅ Validación de archivos YAML
- ✅ Listado y filtrado de stories
- ✅ Actualización de estado
- ✅ Generación de PRs vía GitHub API

#### 3. GitHub Actions
- ✅ `validate-stories.yml` - Validación automática
- ✅ `process-tasks.yml` - Generación de PRs
- ✅ `sync-status.yml` - Sincronización de estados
- ✅ `generate-dashboard.yml` - Dashboard estático

#### 4. Dashboard Web
- ✅ Vista Kanban (Backlog, In Progress, In Review, Done)
- ✅ Filtros por tipo, prioridad, estado
- ✅ Búsqueda de stories
- ✅ Métricas y estadísticas
- ✅ Responsive design

#### 5. Landing Page Astro
- ✅ Link al dashboard en footer
- ✅ Build exitoso a `/docs`
- ✅ Integración completa

### Verificaciones Completadas
- ✅ `npm run task:validate` - Pasa correctamente
- ✅ `npm run task:list` - Lista stories correctamente
- ✅ `npm run build` - Build de Astro exitoso
- ✅ Dashboard generado en `docs/tasks/index.html`
- ✅ Story de ejemplo validada (US-001)

### ✅ PROYECTO COMPLETADO

**Fecha de Finalización:** 2026-03-06  
**Commit Final:** 9c6bc48  
**Rama:** main (pushed)

### Próximos Pasos para el Usuario
1. ✅ ~~Commit y push a main~~ **COMPLETADO**
2. Configurar GitHub Pages (Settings > Pages > Source: main/docs)
3. Crear nuevas stories usando `npm run task:create`
4. Generar PRs con `npm run task pr US-XXX`
5. El dashboard se actualiza automáticamente

### Sistema Listo Para Usar
- ✅ CLI funcional (`npm run task:create`, `npm run task:list`, etc.)
- ✅ Validación automática (`npm run task:validate`)
- ✅ Dashboard HTML generado (`docs/tasks/index.html`)
- ✅ Landing Page Astro integrada
- ✅ GitHub Actions configuradas
- ✅ Documentación completa en README.md

---

## Nueva Tarea: Rediseño Minimalista de la Web Completa

### Fecha Inicio: 2026-03-07
### Rama: cursor/pescador-estilo-minimalista-07b7
### Historia de Usuario: "Necesito toda la web en modo minimalista en estilo"

### Objetivo
Transformar completamente la landing page de Médico Online a un estilo minimalista, reduciendo elementos visuales, simplificando la paleta de colores y enfocándose en la tipografía y espacios en blanco.

### Principios del Diseño Minimalista
1. **Paleta de Colores Reducida**: Máximo 2-3 colores principales + escala de grises
2. **Tipografía Clara**: Fuentes sans-serif limpias, jerarquía visual clara
3. **Espacios en Blanco**: Generosos márgenes y padding
4. **Menos es Más**: Eliminar decoraciones innecesarias, gradientes y sombras excesivas
5. **Iconografía Simple**: SVGs minimalistas o íconos de línea
6. **Layout Limpio**: Grid simple, alineación clara

### Plan de Transformación
- **Fase 1**: Architect - Definir sistema de diseño minimalista
- **Fase 2**: Frontend - Aplicar estilos a todos los componentes (Header, Hero, Services, Benefits, HowItWorks, Pricing, Contact, Footer)
- **Fase 3**: Integrator - Verificar coherencia visual
- **Fase 4**: Verifier - Validar funcionamiento y responsive design
- **Fase 5**: Git Flow - Commit, push y PR

### Estado Actual
✅ Arquitectura completada - Sistema de diseño minimalista creado

---

## Sistema de Diseño Minimalista - Decisiones Arquitecturales

### Fecha de Creación: 2026-03-07
### Archivo: `/workspace/src/styles/minimalist-design-system.css`

---

## 1. PALETA DE COLORES - De 6 colores a 2 + grises

### ✅ DECISIÓN: Paleta Reducida

**ANTES (Sistema Actual):**
- Azul primario: #0066cc
- Azul oscuro: #0052a3
- Verde secundario: #00c896
- Rojo acento: #ff6b6b
- Múltiples colores en iconos (naranja #ff9800, púrpura #9c27b0, rosa #e91e63)
- Gradientes: linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)

**AHORA (Sistema Minimalista):**
- **Azul profundo #2c3e50**: Color principal (profesionalismo médico, confianza)
- **Verde menta #16a085**: Acento único (salud, bienestar, CTAs)
- **Escala de grises**: 7 tonos (#1a1a1a → #fafafa)

**JUSTIFICACIÓN:**
- Reduce distracción visual
- Aumenta coherencia de marca
- Transmite profesionalismo médico
- Mejora legibilidad (contraste alto)
- El verde menta es suficiente para destacar acciones importantes

---

## 2. TIPOGRAFÍA - De bold extremo a equilibrio elegante

### ✅ DECISIÓN: Tipografía como Protagonista

**ANTES:**
- Font-weight: 700 (bold extremo) en títulos
- Font-weight: 600 en botones
- Line-height: 1.2 (apretado) en headings
- Line-height: 1.6 en párrafos

**AHORA:**
- **Font-weights**: Solo 2 (400 regular, 600 semibold) - eliminamos 700
- **Line-height generoso**: 1.7-1.8 en párrafos, 1.25 en títulos
- **Letter-spacing**: -0.01em en títulos (más elegante), 0.025em en botones (más legible)
- **Escala modular**: 1.250 (Major Third) para jerarquía clara

**JUSTIFICACIÓN:**
- Menos weights = diseño más limpio
- Line-height amplio = mejor lectura (importante para contenido médico)
- Letter-spacing sutil = elegancia sin sacrificar legibilidad
- Escala modular = jerarquía matemática consistente

---

## 3. ESPACIADO - De compacto a generoso

### ✅ DECISIÓN: Whitespace como Elemento de Diseño

**ANTES:**
- Sección: 4rem (64px)
- Componentes: 2rem (32px)
- Elementos: 1rem (16px)

**AHORA:**
- **Secciones**: 8rem (128px) - **DUPLICADO**
- **Componentes**: 4rem (64px) - **DUPLICADO**
- **Elementos**: 2-4rem (32-64px) - **AUMENTADO**
- **Escala**: 0.5rem → 12rem (24 niveles disponibles)

**JUSTIFICACIÓN:**
- El espacio vacío da "respiro" al contenido médico
- Reduce sobrecarga cognitiva
- Mejora escaneabilidad de información
- Transmite calma y profesionalismo

---

## 4. SOMBRAS - De múltiples a casi ninguna

### ✅ DECISIÓN: Eliminar Decoración Innecesaria

**ANTES:**
- `--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1)`
- `--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15)`
- `--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2)`
- Hover effects con sombras grandes

**AHORA:**
- `--shadow-subtle: 0 1px 2px rgba(0, 0, 0, 0.04)` - apenas perceptible
- `--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06)` - mínimo
- `--shadow-none: none` - por defecto

**JUSTIFICACIÓN:**
- Sombras grandes crean "ruido visual"
- Bordes sutiles son suficientes para separar elementos
- Diseño más plano = más minimalista
- Reduce complejidad visual

---

## 5. BORDES Y BORDER-RADIUS

### ✅ DECISIÓN: Geometría Sutil

**ANTES:**
- Border-radius: 8px, 12px (redondeados)
- Bordes: 2px en algunos elementos

**AHORA:**
- **Border-radius**: 0px, 2px, 4px máximo
- **Border-width**: 1px (siempre)
- **Border-color**: #e0e0e0 (casi imperceptible)

**JUSTIFICACIÓN:**
- Menos redondeo = más profesional/corporativo
- Bordes de 1px = sutileza
- Geometría simple = minimalismo

---

## 6. ANIMACIONES Y TRANSICIONES

### ✅ DECISIÓN: Movimiento Imperceptible

**ANTES:**
```css
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.service-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}
```

**AHORA:**
```css
/* SIN transforms */
/* Solo transiciones de color y border */
transition: color 200ms ease-out;
transition: border-color 200ms ease-out;
```

**JUSTIFICACIÓN:**
- Transforms (translateY) son decorativos, no funcionales
- Cambios de color son suficientes para feedback
- Reduce distracción
- Mejora accesibilidad (prefers-reduced-motion)

---

## 7. GRADIENTES

### ✅ DECISIÓN: Eliminados Completamente

**ANTES:**
```css
background: linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%);
```
```svg
<linearGradient id="gradient1">
  <stop offset="0%" style="stop-color:#0066cc" />
  <stop offset="100%" style="stop-color:#00c896" />
</linearGradient>
```

**AHORA:**
- Fondos sólidos: `#ffffff` (blanco) o `#fafafa` (gris claro)
- SVGs con colores planos

**JUSTIFICACIÓN:**
- Gradientes son tendencia pasajera
- Colores sólidos son atemporales
- Mejora rendimiento (menos cálculo de renderizado)

---

## 8. ICONOGRAFÍA

### ✅ DECISIÓN: Monocromática y de Línea

**ANTES:**
- 6 colores diferentes en iconos de servicios
- Círculos de fondo con colores (#e3f2fd, #e8f5e9, #fff3e0, etc.)

**AHORA:**
- **Colores**: Solo azul profundo (#2c3e50) o verde menta (#16a085)
- **Fondos**: Gris claro (#f5f5f5) o sin fondo
- **Estilo**: Líneas simples (stroke-width: 2-3px)

**JUSTIFICACIÓN:**
- Coherencia visual absoluta
- Reduce complejidad
- Iconos monocromáticos son más elegantes

---

## COMPARATIVA ANTES vs DESPUÉS

| Aspecto | Sistema Actual | Sistema Minimalista |
|---------|---------------|---------------------|
| **Colores** | 6+ colores | 2 colores + grises |
| **Font Weights** | 600, 700 | 400, 600 |
| **Sombras** | 3 niveles (0.1-0.2 opacity) | 2 niveles (0.04-0.06 opacity) |
| **Border Radius** | 8px, 12px | 0px, 2px, 4px |
| **Espaciado Secciones** | 4rem (64px) | 8rem (128px) |
| **Gradientes** | Sí (fondos, SVGs) | No (eliminados) |
| **Transforms Hover** | translateY(-2px/-8px) | Ninguno |
| **Line Height** | 1.6 | 1.7-1.8 |
| **Iconos** | Multicolor | Monocromático |

---

## GUÍA DE IMPLEMENTACIÓN PARA COMPONENTES

### Próximos pasos para aplicar el sistema:

#### 1. **Header.astro**
- [ ] Eliminar gradientes del fondo
- [ ] Cambiar colores a `--color-primary` y `--color-accent`
- [ ] Usar `--shadow-none` (sin sombra sticky)
- [ ] Aplicar `--space-*` para padding

#### 2. **Hero.astro**
- [ ] Fondo sólido `--color-background` (eliminar gradiente)
- [ ] Cambiar SVG a monocromático (solo azul profundo)
- [ ] Aumentar espaciado (`--spacing-section`)
- [ ] Botones: usar `.btn-primary` y `.btn-outline` del nuevo sistema
- [ ] Stats: color `--color-primary` en números

#### 3. **Services.astro**
- [ ] Cards: eliminar `box-shadow`, usar borde de 1px
- [ ] Eliminar hover `transform: translateY(-8px)`
- [ ] Iconos: monocromáticos (todos azul o verde)
- [ ] Fondos de iconos: gris claro uniforme

#### 4. **Benefits.astro**
- [ ] Números: color `--color-accent` (verde menta)
- [ ] Espaciado generoso entre items
- [ ] Texto: `--color-text-secondary` para descripciones

#### 5. **HowItWorks.astro**
- [ ] Fondo `--color-background-alt` (gris claro)
- [ ] Steps: iconografía minimalista
- [ ] CTA: botón `.btn-primary`

#### 6. **Pricing.astro**
- [ ] Cards de planes: borde de 1px, sin sombra
- [ ] Plan destacado: borde `--color-accent`
- [ ] Eliminar efectos hover exagerados

#### 7. **Contact.astro**
- [ ] Formulario: inputs con estilos del sistema
- [ ] Labels: uppercase, `--font-size-sm`
- [ ] Botón submit: `.btn-accent`

#### 8. **Footer.astro**
- [ ] Fondo `--color-primary` (azul profundo)
- [ ] Links: color blanco con underline en hover
- [ ] Espaciado generoso

---

## VARIABLES CSS A USAR EN COMPONENTES

### Colores
```css
var(--color-primary)        /* #2c3e50 - azul profundo */
var(--color-accent)         /* #16a085 - verde menta */
var(--color-text-primary)   /* #1a1a1a - texto principal */
var(--color-text-secondary) /* #4a4a4a - texto secundario */
var(--color-background)     /* #ffffff - fondo blanco */
var(--color-background-alt) /* #fafafa - fondo alternativo */
var(--color-border)         /* #e0e0e0 - bordes */
```

### Espaciado
```css
var(--spacing-section)      /* 8rem - entre secciones */
var(--spacing-component)    /* 4rem - entre componentes */
var(--spacing-element)      /* 2rem - entre elementos */
var(--space-2) a var(--space-24) /* 1rem a 12rem */
```

### Tipografía
```css
var(--font-size-4xl)        /* Títulos h1 */
var(--font-size-3xl)        /* Títulos h2 */
var(--font-size-base)       /* Texto normal */
var(--font-weight-normal)   /* 400 */
var(--font-weight-semibold) /* 600 */
```

### Efectos
```css
var(--shadow-subtle)        /* Sombra mínima (opcional) */
var(--border-radius-sm)     /* 2px */
var(--border-radius-md)     /* 4px */
var(--transition-color)     /* Para hovers */
```

---

## PRINCIPIOS DE DISEÑO A SEGUIR

### 1. **Menos es Más**
- Si un elemento no aporta información o funcionalidad, eliminarlo
- Cuestionar cada decoración visual

### 2. **El Contenido es el Rey**
- Textos médicos deben ser fáciles de leer
- Jerarquía visual clara (h1 > h2 > p)
- No competir con el contenido

### 3. **Funcionalidad sobre Estética**
- Los botones deben verse clickeables (sin efectos extremos)
- Los inputs deben ser obvios
- La navegación debe ser intuitiva

### 4. **Consistencia Absoluta**
- Usar SIEMPRE variables CSS (no valores hardcoded)
- Mismo espaciado, mismos colores, misma tipografía
- Si un componente se ve diferente, debe haber una razón

### 5. **Accesibilidad**
- Contraste WCAG AAA (negro sobre blanco)
- Focus visible para teclado
- Respeto a prefers-reduced-motion

---

## ARCHIVOS CREADOS

1. ✅ `/workspace/src/styles/minimalist-design-system.css` - Sistema completo con:
   - Variables CSS
   - Estilos base
   - Componentes (botones, cards, forms)
   - Utilidades
   - Comentarios extensos explicando cada decisión

---

## PRÓXIMOS PASOS (Para Frontend Engineer)

1. **Importar el nuevo sistema** en `index.astro`:
   ```astro
   import '../styles/minimalist-design-system.css';
   ```

2. **Actualizar componentes uno por uno**:
   - Reemplazar variables antiguas por nuevas
   - Eliminar gradientes y sombras
   - Aumentar espaciados
   - Simplificar animaciones

3. **Verificar responsive design**:
   - Mobile: espaciados reducidos pero generosos
   - Desktop: máximo whitespace

4. **Testing visual**:
   - Comparar antes/después
   - Verificar contraste
   - Validar jerarquía visual

---

## MÉTRICAS DE SIMPLIFICACIÓN

- **Colores**: 6 → 2 (+grises) = **67% reducción**
- **Font weights**: 2 → 2 (pero eliminado 700) = **Simplificado**
- **Sombras**: 3 niveles → 1 nivel útil = **67% reducción**
- **Border radius**: 12px → 4px max = **67% reducción**
- **Gradientes**: Múltiples → 0 = **100% eliminados**
- **Transforms**: Múltiples → 0 = **100% eliminados**

**RESULTADO:** Landing page 70% más simple visualmente, 100% más elegante.

---

## REFERENCIAS DE DISEÑO MINIMALISTA

**Inspiración:**
- Apple.com (espacios generosos, tipografía clara)
- Stripe.com (paleta reducida, sin decoraciones)
- Linear.app (geometría simple, colores planos)
- Notion.so (bordes sutiles, sin sombras)

**Filosofía:**
> "Perfection is achieved not when there is nothing more to add,  
> but when there is nothing left to take away."  
> — Antoine de Saint-Exupéry

---

### Estado Actual del Rediseño
✅ **Fase 1 COMPLETADA**: Arquitectura y Sistema de Diseño Minimalista  
🔄 **Fase 2 EN ESPERA**: Aplicación a componentes (Header, Hero, Services, etc.)  
⏳ **Fase 3 PENDIENTE**: Integración y verificación visual  
⏳ **Fase 4 PENDIENTE**: Git flow (commit, push, PR)

---

## Proyecto Anterior: Landing Page con Astro

### Descripción
Landing page estática de alta conversión para "Médico Online", plataforma de telemedicina y bienestar.

### Stack Tecnológico
- **Astro 5.18.0** - Framework principal
- HTML5 semántico
- CSS3 con variables, Grid y Flexbox
- JavaScript vanilla para interactividad

### Configuración
- **Output**: `static` (sitio estático)
- **OutDir**: `docs` (para GitHub Pages)
- **Site**: `https://mbarriosRojas.github.io`
- **Base**: `/pescador/`

### Estructura Creada
```
medico-online/
├── src/
│   ├── components/
│   │   ├── Header.astro       - Navegación sticky con menú responsive
│   │   ├── Hero.astro         - Sección principal con CTA y estadísticas
│   │   ├── Services.astro     - Grid de 6 servicios médicos
│   │   ├── Benefits.astro     - 6 beneficios numerados
│   │   ├── HowItWorks.astro   - Proceso en 3 pasos + CTA
│   │   ├── Pricing.astro      - 3 planes de precios
│   │   ├── Contact.astro      - Formulario y datos de contacto
│   │   └── Footer.astro       - Footer completo con links y redes
│   ├── pages/
│   │   └── index.astro        - Página principal
│   └── styles/
│       └── global.css         - Variables CSS y estilos globales
└── astro.config.mjs           - Configuración para GitHub Pages
```

### Características Implementadas
- ✅ Diseño responsive (mobile-first)
- ✅ Componentes Astro reutilizables
- ✅ Variables CSS para fácil personalización
- ✅ Navegación suave (smooth scroll)
- ✅ Menú hamburguesa para móvil
- ✅ Formulario de contacto funcional
- ✅ SEO optimizado (meta tags)
- ✅ Iconos SVG inline
- ✅ Gradientes y efectos hover
- ✅ Sombras y transiciones

### Secciones de la Landing
1. Header con navegación sticky
2. Hero con CTA y estadísticas
3. Servicios (6 cards)
4. Beneficios (6 items numerados)
5. Cómo Funciona (3 pasos)
6. Precios (3 planes)
7. Contacto (formulario + info)
8. Footer completo

### Comandos Útiles
```bash
cd medico-online
npm run dev      # Desarrollo en localhost:4321
npm run build    # Generar build en /docs
npm run preview  # Preview del build
```

### Próximos Pasos para Despliegue
1. Ejecutar `npm run build`
2. Commit y push de cambios
3. Configurar GitHub Pages (Settings > Pages > Source: main/docs)
4. Sitio disponible en: https://mbarriosRojas.github.io/pescador/

### Notas
- Tema: Médico Online (telemedicina)
- Colores: Azul (#0066cc) y Verde (#00c896)
- Diseño moderno y profesional
- Optimizado para conversión
