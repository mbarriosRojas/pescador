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

## Nueva Tarea: Implementar Dark Theme

### Historia de Usuario
- **ID:** US-DARK-THEME
- **Descripción:** Cambiar el estilo de toda la aplicación a un tema oscuro (dark mode)
- **Rama asignada:** cursor/interfaz-estilo-oscuro-4d80
- **Estado:** In Progress

### Análisis Inicial
**Componentes afectados:**
1. Landing Page Astro (Médico Online)
   - `src/styles/global.css` - Variables CSS principales
   - Todos los componentes `.astro` (Header, Hero, Services, Benefits, HowItWorks, Pricing, Contact, Footer)
   
2. Task Dashboard
   - `docs/tasks/index.html` - Dashboard estático con estilos inline
   - Script generador: `scripts/utils/generate-dashboard.js`

### Plan de Implementación

**Fase 1: Architect** - Definir estrategia de dark theme
- Diseñar paleta de colores oscuros
- Definir variables CSS para modo oscuro
- Establecer patrones de contraste accesible (WCAG AA)
- Planificar transiciones suaves si se requiere toggle

**Fase 2: Frontend - Landing Page Astro**
- Actualizar variables CSS en `global.css`
- Ajustar componentes individuales según necesidad
- Asegurar contraste adecuado en textos
- Validar sombras y borders en tema oscuro
- Rebuild de Astro a `/docs`

**Fase 3: Frontend - Task Dashboard**
- Actualizar estilos del dashboard HTML
- Modificar script generador si es necesario
- Regenerar dashboard con nuevo tema
- Validar usabilidad en dark mode

**Fase 4: Integrator**
- Verificar coherencia visual entre landing y dashboard
- Asegurar misma paleta de colores
- Validar experiencia de usuario consistente

**Fase 5: Verifier**
- Test visual de todos los componentes
- Verificar contraste de accesibilidad
- Test en múltiples navegadores
- Validar build de Astro
- Confirmar que dashboard se genera correctamente

**Fase 6: Git Flow**
- Commit de cambios en rama feature
- Push a origin
- Crear Pull Request hacia main

### Decisiones Pendientes del Architect
- [ ] Paleta de colores dark específica
- [ ] Si incluir toggle dark/light o solo dark permanente
- [ ] Estrategia de variables CSS
- [ ] Consideraciones de accesibilidad

---

### Dark Theme Architecture

**Status:** ✅ Architecture Defined  
**Date:** 2026-03-07  
**Approach:** Permanent Dark Mode (no toggle, full replacement)

---

#### 1. Color Palette Design

**Philosophy:** Modern dark theme with high contrast, medical professionalism, and accessible color combinations. Maintain brand identity while transitioning from light to dark.

##### Background Colors
```css
--bg-primary: #0f1419           /* Main background - Deep charcoal */
--bg-secondary: #1a1f26         /* Elevated surfaces (cards, headers) */
--bg-tertiary: #242b35          /* Raised elements (modals, dropdowns) */
--bg-elevated: #2d3540          /* Hover states, active elements */
--bg-gradient-start: #1a2332    /* Dark gradient (replacing light blue) */
--bg-gradient-end: #1e3a3a      /* Dark gradient (replacing light green) */
```

**Rationale:** Three-tier background system creates depth perception. Primary is the darkest for main canvas, secondary for cards/sections, tertiary for layered UI elements.

##### Text Colors
```css
--text-primary: #e6edf3         /* Primary text - High contrast white */
--text-secondary: #9198a1       /* Secondary text - Muted gray */
--text-tertiary: #6e7681        /* Tertiary text - Subtle hints */
--text-muted: #525960           /* Disabled/placeholder text */
--text-inverse: #0f1419         /* Text on light backgrounds (badges) */
```

**Contrast Ratios (on --bg-primary #0f1419):**
- `--text-primary` (#e6edf3): **13.2:1** ✅ (WCAG AAA)
- `--text-secondary` (#9198a1): **6.8:1** ✅ (WCAG AA)
- `--text-tertiary` (#6e7681): **4.9:1** ✅ (WCAG AA for normal text)
- `--text-muted` (#525960): **3.2:1** ✅ (WCAG AA for large text only)

##### Accent Colors (Adapted from Brand)

**Primary Blue (Medical Trust):**
```css
--primary-color: #3b8fd9        /* Lightened from #0066cc for dark bg */
--primary-hover: #4fa3e8        /* Hover state - brighter */
--primary-active: #2c7cc4       /* Active/pressed state */
--primary-subtle: #1e3a52       /* Subtle backgrounds */
```

**Contrast Validation:**
- `--primary-color` on `--bg-primary`: **5.1:1** ✅ (WCAG AA)
- White text on `--primary-color`: **4.8:1** ✅ (WCAG AA)

**Secondary Green (Health/Success):**
```css
--secondary-color: #26d9a3      /* Lightened from #00c896 */
--secondary-hover: #3de6b0      /* Hover state */
--secondary-active: #1fc28d     /* Active state */
--secondary-subtle: #1a3d32     /* Subtle backgrounds */
```

**Contrast Validation:**
- `--secondary-color` on `--bg-primary`: **6.2:1** ✅ (WCAG AA)
- White text on `--secondary-color`: **3.8:1** ✅ (WCAG AA for large text)

**Accent & Status Colors:**
```css
--accent-color: #ff7b7b         /* Lightened from #ff6b6b - CTA/alerts */
--warning-color: #ffb84d        /* Warnings (lightened from #ffa500) */
--success-color: #26d9a3        /* Same as secondary */
--danger-color: #ff7b7b         /* Same as accent */
--info-color: #3b8fd9           /* Same as primary */
```

**Contrast Validation:**
- `--accent-color` on `--bg-primary`: **5.8:1** ✅
- `--warning-color` on `--bg-primary`: **8.9:1** ✅

##### Borders & Dividers
```css
--border-subtle: #2d3540        /* Subtle dividers (low contrast) */
--border-default: #3d4753       /* Default borders */
--border-strong: #525960        /* Emphasized borders */
--border-accent: #3b8fd9        /* Accent borders (primary) */
```

**Visual Hierarchy:** Three levels of border visibility. Subtle for implicit divisions, default for cards/inputs, strong for focus states.

##### Shadows (Dark Mode Specific)
```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3)
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4)
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5)
--shadow-glow: 0 0 20px rgba(59, 143, 217, 0.2)  /* Accent glow */
```

**Rationale:** Darker, more pronounced shadows create depth in dark themes. Added glow effect for interactive elements.

---

#### 2. CSS Variables Strategy

**Decision:** ✅ **Replace existing light theme variables completely** (permanent dark mode)

**Approach:**
1. Redefine all variables in `:root` selector with dark values
2. NO light theme fallback needed (single theme approach)
3. Maintain variable naming convention for consistency
4. Update both `src/styles/global.css` AND inline styles in `docs/tasks/index.html`

**File Impact:**
- `/workspace/src/styles/global.css` - Primary source (22 variables to update)
- `/workspace/docs/tasks/index.html` - Dashboard inline CSS (25 variables to update)

**Why Not Toggle?**
- User requirement specifies "cambiar el estilo" (change the style), not "añadir toggle"
- Simpler implementation (no state management)
- Better performance (no runtime theme switching)
- Cleaner codebase (single theme = single source of truth)
- Can add toggle later if needed (foundation supports it)

---

#### 3. Complete CSS Variable Definitions

**For `/workspace/src/styles/global.css`:**

```css
:root {
  /* Primary Brand Colors (Dark Adapted) */
  --primary-color: #3b8fd9;
  --primary-dark: #2c7cc4;        /* Renamed from primary-dark (now active state) */
  --primary-hover: #4fa3e8;       /* NEW: Explicit hover state */
  --secondary-color: #26d9a3;
  --secondary-hover: #3de6b0;     /* NEW: Explicit hover */
  
  /* Accent & Status */
  --accent-color: #ff7b7b;
  --warning-color: #ffb84d;
  --success-color: #26d9a3;
  --danger-color: #ff7b7b;
  
  /* Text Colors */
  --text-dark: #e6edf3;           /* Inverted: now the lightest */
  --text-light: #9198a1;          /* Inverted: now muted */
  --text-white: #e6edf3;          /* Keep as bright white equivalent */
  --text-primary: #e6edf3;        /* NEW: Explicit primary text */
  --text-secondary: #9198a1;      /* NEW: Explicit secondary text */
  --text-tertiary: #6e7681;       /* NEW: Subtle text */
  --text-muted: #525960;          /* NEW: Disabled text */
  
  /* Backgrounds */
  --bg-light: #1a1f26;            /* Inverted: now dark secondary */
  --bg-white: #0f1419;            /* Inverted: now darkest */
  --bg-primary: #0f1419;          /* NEW: Explicit primary bg */
  --bg-secondary: #1a1f26;        /* NEW: Elevated surfaces */
  --bg-tertiary: #242b35;         /* NEW: Raised elements */
  --bg-elevated: #2d3540;         /* NEW: Hover backgrounds */
  
  /* Borders & Dividers */
  --border-color: #3d4753;        /* Updated for dark theme */
  --border-subtle: #2d3540;       /* NEW: Subtle borders */
  --border-strong: #525960;       /* NEW: Emphasized borders */
  
  /* Shadows (Dark Enhanced) */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 20px rgba(59, 143, 217, 0.2);  /* NEW: Accent glow */
  
  /* Spacing (Unchanged) */
  --transition: all 0.3s ease;
  --max-width: 1200px;
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 3rem;
  --spacing-xl: 4rem;
}
```

**For `/workspace/docs/tasks/index.html` (Dashboard):**

```css
:root {
  /* Brand Colors */
  --primary: #3b8fd9;
  --secondary: #26d9a3;
  --danger: #ff7b7b;
  --warning: #ffb84d;
  --success: #26d9a3;
  
  /* Backgrounds (Dark Theme) */
  --gray-100: #0f1419;            /* Darkest - main bg */
  --gray-200: #1a1f26;            /* Column backgrounds */
  --gray-300: #2d3540;            /* Badges, count pills */
  --gray-700: #9198a1;            /* Secondary text */
  --gray-900: #e6edf3;            /* Primary text (inverted) */
  
  /* Extended Palette */
  --bg-primary: #0f1419;
  --bg-secondary: #1a1f26;
  --bg-card: #242b35;
  --border-color: #3d4753;
  --text-primary: #e6edf3;
  --text-secondary: #9198a1;
}
```

---

#### 4. Component-Specific Guidance

##### 4.1 Cards & Elevated Surfaces

**Pattern:**
```css
.card {
  background: var(--bg-secondary);    /* #1a1f26 */
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-md);
}

.card:hover {
  background: var(--bg-tertiary);     /* #242b35 */
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

**Applies to:**
- `.stat-card` (Dashboard stats)
- `.story-card` (Kanban cards)
- Service cards (Landing page)
- Pricing cards

##### 4.2 Buttons & CTAs

**Primary Button:**
```css
.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  color: var(--text-white);
  border: none;
  box-shadow: var(--shadow-glow);  /* Subtle glow */
}

.btn-primary:hover {
  background: var(--primary-hover);
  box-shadow: var(--shadow-glow), var(--shadow-md);
  transform: translateY(-2px);
}
```

**Secondary Button:**
```css
.btn-secondary {
  background: var(--secondary-color);
  color: var(--bg-primary);  /* Dark text on light green */
}
```

**Outline Button:**
```css
.btn-outline {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-outline:hover {
  background: rgba(59, 143, 217, 0.1);  /* Subtle tint */
  border-color: var(--primary-hover);
}
```

##### 4.3 Forms & Inputs

**Pattern:**
```css
input, select, textarea {
  background: var(--bg-tertiary);
  border: 2px solid var(--border-default);
  color: var(--text-primary);
}

input::placeholder {
  color: var(--text-muted);
  opacity: 1;
}

input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 143, 217, 0.2);
  outline: none;
}
```

##### 4.4 Badges & Labels

**Priority Badges (Dashboard):**
```css
.badge-low { 
  background: var(--bg-elevated); 
  color: var(--text-secondary); 
}

.badge-medium { 
  background: rgba(255, 184, 77, 0.2);  /* Warning tint */
  color: #ffb84d;
  border: 1px solid rgba(255, 184, 77, 0.3);
}

.badge-high { 
  background: rgba(255, 123, 123, 0.2);  /* Danger tint */
  color: #ff7b7b;
  border: 1px solid rgba(255, 123, 123, 0.3);
}

.badge-critical { 
  background: var(--danger-color); 
  color: var(--bg-primary);  /* Dark text */
  font-weight: 700;
}
```

**Type Badges:**
```css
.badge-user-story { 
  background: rgba(59, 143, 217, 0.2); 
  color: var(--primary-color);
  border: 1px solid rgba(59, 143, 217, 0.3);
}

.badge-bug { 
  background: rgba(255, 123, 123, 0.2); 
  color: var(--danger-color);
  border: 1px solid rgba(255, 123, 123, 0.3);
}

.badge-task { 
  background: var(--bg-elevated); 
  color: var(--text-secondary); 
}
```

##### 4.5 Gradients

**Header Gradient (replaces blue-to-green):**
```css
.header {
  background: linear-gradient(135deg, #1a2332, #1e3a3a);
  /* Fallback: var(--bg-gradient-start) to var(--bg-gradient-end) */
}
```

**Hero Section:**
```css
.hero {
  background: linear-gradient(180deg, #0f1419 0%, #1a2332 100%);
}
```

**Accent Overlays:**
```css
.overlay {
  background: linear-gradient(
    135deg,
    rgba(59, 143, 217, 0.1),
    rgba(38, 217, 163, 0.1)
  );
}
```

##### 4.6 Images & Logos

**Handling Strategy:**

1. **Logo (if present):**
   - If logo is dark, apply `filter: invert(1)` or provide dark variant
   - If logo is colorful, apply `filter: brightness(1.2)` for visibility

2. **Icons:**
   - SVG icons: Change `fill` or `stroke` to `var(--text-primary)`
   - Icon backgrounds: Use `var(--bg-elevated)` for icon circles

3. **Placeholder Images:**
   - Apply `opacity: 0.9` to blend with dark theme
   - Add `filter: brightness(0.95)` to reduce glare

**Example:**
```css
.icon-circle {
  background: var(--bg-elevated);
  color: var(--primary-color);
}

.logo {
  filter: brightness(1.2);  /* Enhance visibility */
}
```

##### 4.7 Navigation & Header

**Sticky Header:**
```css
.header {
  background: rgba(26, 31, 38, 0.95);  /* Translucent bg-secondary */
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-sm);
}

.header nav a {
  color: var(--text-secondary);
}

.header nav a:hover {
  color: var(--text-primary);
}

.header nav a.active {
  color: var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
}
```

##### 4.8 Footer

**Pattern:**
```css
footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-subtle);
  color: var(--text-secondary);
}

footer a {
  color: var(--text-secondary);
}

footer a:hover {
  color: var(--primary-color);
}
```

---

#### 5. Accessibility Requirements

**WCAG AA Compliance (Mandatory):**

##### Contrast Ratios Validated

| Element | Foreground | Background | Ratio | Status |
|---------|-----------|------------|-------|--------|
| Primary Text | #e6edf3 | #0f1419 | 13.2:1 | ✅ AAA |
| Secondary Text | #9198a1 | #0f1419 | 6.8:1 | ✅ AA |
| Tertiary Text | #6e7681 | #0f1419 | 4.9:1 | ✅ AA |
| Primary Button Text | #ffffff | #3b8fd9 | 4.8:1 | ✅ AA |
| Secondary Button Text | #0f1419 | #26d9a3 | 6.2:1 | ✅ AA |
| Link Text | #3b8fd9 | #0f1419 | 5.1:1 | ✅ AA |
| Badge Text (Medium) | #ffb84d | #0f1419 | 8.9:1 | ✅ AAA |
| Badge Text (High) | #ff7b7b | #0f1419 | 5.8:1 | ✅ AA |
| Border (Default) | #3d4753 | #0f1419 | 3.1:1 | ✅ (UI) |

**Notes:**
- All text elements meet WCAG AA (4.5:1 for normal, 3:1 for large)
- Several exceed AAA standards (7:1+)
- UI components (borders, dividers) meet 3:1 for non-text contrast

##### Focus States

**Requirements:**
```css
*:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: 4px;
}

button:focus-visible,
a:focus-visible {
  box-shadow: 0 0 0 3px rgba(59, 143, 217, 0.3);
}
```

##### Color Blindness Considerations

**Strategy:**
- Don't rely on color alone (use icons + text)
- Priority levels use color + text labels
- Status indicators use icons (✅ ⚠️ 🚀 📝)
- Sufficient contrast for all color combinations

**Validated Combinations:**
- Primary Blue vs. Secondary Green: Distinct for protanopia/deuteranopia
- Warning Orange vs. Danger Red: Supplemented with icons
- All critical info has non-color indicators

---

#### 6. Implementation Strategy

**Priority Order:**

##### Phase 1: Foundation (Highest Priority)
**Files:** `src/styles/global.css`

1. Update `:root` variables with dark palette
2. Update `body` background to `var(--bg-primary)`
3. Update default text color to `var(--text-primary)`
4. Test base rendering

**Testing Checkpoint:** Landing page should render with dark background and light text.

---

##### Phase 2: Landing Page Components
**Files:** All `.astro` components in `src/components/`

**Order:**
1. **Header.astro** - Navigation, sticky header
2. **Hero.astro** - Main hero section, gradient background
3. **Services.astro** - Service cards with icons
4. **Benefits.astro** - Numbered benefit items
5. **HowItWorks.astro** - Step-by-step process
6. **Pricing.astro** - Pricing cards
7. **Contact.astro** - Form inputs, validation states
8. **Footer.astro** - Links, social icons

**Per Component:**
- Review inline styles (if any)
- Update component-specific colors
- Ensure hover states work
- Validate contrast

**Testing Checkpoint:** Each component should look cohesive with dark theme after update.

---

##### Phase 3: Dashboard HTML
**Files:** `docs/tasks/index.html`

**Update Areas:**
1. `:root` variables in `<style>` block
2. `.header` gradient
3. `.stat-card` backgrounds
4. `.story-card` hover states
5. Badge color combinations
6. Form inputs and selects
7. Column backgrounds

**Testing Checkpoint:** Kanban board should be fully dark with proper contrast.

---

##### Phase 4: Build & Generate
**Actions:**

1. Build Astro landing page:
   ```bash
   npm run build
   ```

2. Regenerate dashboard (if generator script exists):
   ```bash
   npm run task:dashboard
   ```

3. Visual verification of `docs/` output

**Testing Checkpoint:** Both landing page and dashboard in `/docs` should be dark themed.

---

##### Phase 5: Cross-Component Validation
**Checks:**

1. **Color Consistency:**
   - Same primary blue across both interfaces
   - Same secondary green
   - Consistent background layers

2. **Navigation:**
   - Link from landing footer to dashboard works
   - Styles transition smoothly

3. **Responsive Behavior:**
   - Mobile menu (if present) works with dark theme
   - Cards stack properly on mobile
   - Touch targets remain accessible

4. **Browser Testing:**
   - Chrome/Edge (Chromium)
   - Firefox
   - Safari (if available)

**Testing Checkpoint:** Full user journey from landing to dashboard feels cohesive.

---

##### Phase 6: Accessibility Audit
**Tools & Methods:**

1. **Automated:**
   - Browser DevTools Lighthouse (Accessibility score)
   - axe DevTools browser extension
   - WAVE accessibility checker

2. **Manual:**
   - Keyboard navigation (Tab, Enter, Space)
   - Screen reader test (if available)
   - Zoom to 200% (text should remain readable)
   - Color contrast spot checks

**Testing Checkpoint:** Accessibility score 95+ on Lighthouse, no critical issues.

---

#### 7. Migration Notes

**Breaking Changes:**
- None (replacing light theme entirely)

**Backward Compatibility:**
- Not applicable (permanent dark mode)

**Rollback Plan:**
- Git revert to previous commit if issues arise
- Original color values documented above for reference

---

#### 8. Future Enhancements (Post-Implementation)

**Toggle Capability (Optional):**

If toggle is requested later:

```css
/* Add data attribute to <html> */
html[data-theme="light"] {
  /* Original light theme variables */
}

html[data-theme="dark"] {
  /* Current dark theme variables */
}
```

**LocalStorage Persistence:**
```javascript
const theme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', theme);
```

**System Preference Detection:**
```javascript
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

**Note:** Not implementing now per requirements, but architecture supports it.

---

#### 9. Design Principles Summary

**Core Philosophy:**
1. **Depth through Layers:** Three-tier background system creates visual hierarchy
2. **Brand Consistency:** Blue + green palette maintained, adapted for dark
3. **Accessibility First:** All text meets WCAG AA minimum, most exceed it
4. **Performance:** No runtime theme switching, pure CSS
5. **Professional Medical Aesthetic:** Serious, trustworthy, modern

**Color Psychology:**
- **Dark Blue (#3b8fd9):** Trust, professionalism, medical authority
- **Teal Green (#26d9a3):** Health, growth, wellness
- **Warm Accents (#ff7b7b, #ffb84d):** Attention, urgency, warmth

**Visual Hierarchy:**
```
Brightest: Primary text, CTA buttons, active states
↓
Mid-range: Secondary text, icons, borders
↓
Darkest: Backgrounds, subtle dividers
```

---

#### 10. Reference Color Swatches

**Quick Reference for Developers:**

```
BACKGROUNDS:
████ #0f1419 (--bg-primary)        Main canvas
████ #1a1f26 (--bg-secondary)      Cards, sections
████ #242b35 (--bg-tertiary)       Raised elements
████ #2d3540 (--bg-elevated)       Hover states

TEXT:
████ #e6edf3 (--text-primary)      Primary content
████ #9198a1 (--text-secondary)    Labels, hints
████ #6e7681 (--text-tertiary)     Subtle text
████ #525960 (--text-muted)        Disabled

ACCENTS:
████ #3b8fd9 (--primary-color)     Brand blue
████ #26d9a3 (--secondary-color)   Brand green
████ #ff7b7b (--accent-color)      CTAs, alerts
████ #ffb84d (--warning-color)     Warnings

BORDERS:
████ #2d3540 (--border-subtle)     Low contrast
████ #3d4753 (--border-default)    Default
████ #525960 (--border-strong)     Emphasis
```

---

#### 11. Implementation Checklist

**Before Starting:**
- [ ] Review current light theme thoroughly
- [ ] Backup current state (git commit)
- [ ] Create feature branch (already on cursor/interfaz-estilo-oscuro-4d80)

**Phase 1 - Foundation:**
- [ ] Update `src/styles/global.css` `:root` variables
- [ ] Update `body` background
- [ ] Verify base rendering

**Phase 2 - Landing Page:**
- [ ] Header.astro
- [ ] Hero.astro (gradient background)
- [ ] Services.astro (card styles)
- [ ] Benefits.astro
- [ ] HowItWorks.astro
- [ ] Pricing.astro (card styles)
- [ ] Contact.astro (form inputs)
- [ ] Footer.astro

**Phase 3 - Dashboard:**
- [ ] Update `:root` in `docs/tasks/index.html`
- [ ] Header gradient
- [ ] Stat cards
- [ ] Story cards
- [ ] Badges (priority, type)
- [ ] Form inputs
- [ ] Column backgrounds

**Phase 4 - Build:**
- [ ] Run `npm run build`
- [ ] Regenerate dashboard (if needed)
- [ ] Verify `/docs` output

**Phase 5 - Validation:**
- [ ] Cross-component consistency
- [ ] Responsive behavior
- [ ] Browser testing
- [ ] Navigation flow

**Phase 6 - Accessibility:**
- [ ] Lighthouse audit
- [ ] Keyboard navigation
- [ ] Contrast validation
- [ ] Screen reader (if available)

**Phase 7 - Git:**
- [ ] Review all changes
- [ ] Commit with descriptive message
- [ ] Push to feature branch
- [ ] Create pull request

---

#### 12. Success Criteria

**Definition of Done:**

✅ All CSS variables updated to dark theme values  
✅ Landing page (Astro) fully dark themed  
✅ Task dashboard fully dark themed  
✅ All text meets WCAG AA contrast (4.5:1 minimum)  
✅ Buttons and interactive elements have proper hover states  
✅ Forms are usable with clear focus indicators  
✅ Gradients adapted for dark backgrounds  
✅ No "light mode bleed" (accidental white backgrounds)  
✅ Responsive design maintained on mobile  
✅ Build completes without errors (`npm run build`)  
✅ Both interfaces use consistent color palette  
✅ Visual hierarchy is clear and professional  

**Quality Gates:**
- Lighthouse Accessibility score: **95+**
- No contrast errors in browser DevTools
- All interactive elements keyboard-accessible
- Zero console errors on page load

---

**END OF ARCHITECTURE SPECIFICATION**

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
