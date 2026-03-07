# Guía Rápida: Variables CSS Minimalistas

**Sistema de Diseño Minimalista - Médico Online**  
**Referencia rápida para desarrollo**

---

## 🎨 COLORES - Copiar y Pegar

```css
/* ✅ COLORES PRINCIPALES */
var(--color-primary)        /* #2c3e50 - Azul profundo */
var(--color-accent)         /* #16a085 - Verde menta */

/* ✅ TEXTOS */
var(--color-text-primary)   /* #1a1a1a - Texto principal */
var(--color-text-secondary) /* #4a4a4a - Subtítulos */
var(--color-text-tertiary)  /* #9e9e9e - Placeholders */

/* ✅ FONDOS */
var(--color-background)     /* #ffffff - Blanco puro */
var(--color-background-alt) /* #fafafa - Gris claro */
var(--color-white)          /* #ffffff - Para cards */

/* ✅ BORDES */
var(--color-border)         /* #e0e0e0 - Bordes sutiles */
```

---

## 📐 ESPACIADO - Copiar y Pegar

```css
/* ✅ ESPACIADO SEMÁNTICO (usar estos primero) */
var(--spacing-section)      /* 8rem (128px) - Padding de secciones */
var(--spacing-component)    /* 4rem (64px) - Entre componentes */
var(--spacing-element)      /* 2rem (32px) - Entre elementos */
var(--spacing-inline)       /* 1rem (16px) - Inline elements */

/* ✅ ESPACIADO ESPECÍFICO (cuando necesites control fino) */
var(--space-1)   /* 0.5rem = 8px   */
var(--space-2)   /* 1rem   = 16px  */
var(--space-3)   /* 1.5rem = 24px  */
var(--space-4)   /* 2rem   = 32px  */
var(--space-6)   /* 3rem   = 48px  */
var(--space-8)   /* 4rem   = 64px  */
var(--space-10)  /* 5rem   = 80px  */
var(--space-16)  /* 8rem   = 128px */
```

---

## 📝 TIPOGRAFÍA - Copiar y Pegar

```css
/* ✅ FONT SIZES */
var(--font-size-4xl)   /* 3.052rem - h1 */
var(--font-size-3xl)   /* 2.441rem - h2 */
var(--font-size-2xl)   /* 1.953rem - h3 */
var(--font-size-xl)    /* 1.563rem - h4 */
var(--font-size-lg)    /* 1.25rem  - Subtítulos destacados */
var(--font-size-md)    /* 1.125rem - Texto destacado */
var(--font-size-base)  /* 1rem     - Texto normal */
var(--font-size-sm)    /* 0.875rem - Labels */
var(--font-size-xs)    /* 0.8rem   - Texto pequeño */

/* ✅ FONT WEIGHTS */
var(--font-weight-normal)    /* 400 - Texto normal */
var(--font-weight-semibold)  /* 600 - Títulos, botones */

/* ✅ LINE HEIGHTS */
var(--line-height-tight)     /* 1.25 - Títulos */
var(--line-height-normal)    /* 1.7  - Texto base */
var(--line-height-relaxed)   /* 1.8  - Párrafos largos */

/* ✅ LETTER SPACING */
var(--letter-spacing-tight)  /* -0.01em - Títulos grandes */
var(--letter-spacing-normal) /* 0       - Texto normal */
var(--letter-spacing-wide)   /* 0.025em - Botones, labels */
```

---

## 🎭 EFECTOS - Copiar y Pegar

```css
/* ✅ SOMBRAS (usar con moderación) */
var(--shadow-none)     /* none - Sin sombra (por defecto) */
var(--shadow-subtle)   /* 0 1px 2px rgba(0,0,0,0.04) - Casi imperceptible */
var(--shadow-sm)       /* 0 2px 4px rgba(0,0,0,0.06) - Mínima */

/* ✅ BORDES */
var(--border-radius-none)  /* 0   - Sin redondeo */
var(--border-radius-sm)    /* 2px - Botones */
var(--border-radius-md)    /* 4px - Cards (máximo) */

var(--border-width-thin)   /* 1px - Siempre 1px */

/* ✅ TRANSICIONES */
var(--transition-color)    /* color 200ms ease-out */
var(--transition-opacity)  /* opacity 150ms ease-out */
var(--transition-border)   /* border-color 200ms ease-out */
```

---

## 🔧 CLASES PREDEFINIDAS - Copiar y Pegar

### Botones

```html
<!-- Primary Button (azul profundo → verde menta al hover) -->
<a href="#" class="btn btn-primary">Agendar Consulta</a>

<!-- Outline Button (borde → relleno al hover) -->
<a href="#" class="btn btn-outline">Más Información</a>

<!-- Accent Button (verde menta → azul profundo al hover) -->
<a href="#" class="btn btn-accent">Llamar a la Acción</a>

<!-- Text Button (minimalista extremo) -->
<a href="#" class="btn btn-text">Link sutil</a>
```

---

### Cards

```html
<!-- Card con borde -->
<div class="card">
  <h3>Título</h3>
  <p>Contenido...</p>
</div>

<!-- Card sin borde (fondo gris) -->
<div class="card-flat">
  <h3>Título</h3>
  <p>Contenido...</p>
</div>
```

---

### Contenedores

```html
<!-- Contenedor estándar (max-width: 1140px) -->
<div class="container">
  <!-- Contenido -->
</div>

<!-- Contenedor estrecho (max-width: 480px) -->
<div class="container-narrow">
  <!-- Contenido -->
</div>

<!-- Sección con padding vertical generoso -->
<section class="section">
  <div class="container">
    <!-- Contenido -->
  </div>
</section>

<!-- Sección con fondo gris claro -->
<section class="section section-alt">
  <div class="container">
    <!-- Contenido -->
  </div>
</section>
```

---

### Utilidades

```html
<!-- Texto centrado -->
<div class="text-center">
  <h2>Título centrado</h2>
</div>

<!-- Colores de texto -->
<p class="color-primary">Texto azul profundo</p>
<p class="color-accent">Texto verde menta</p>
<p class="color-muted">Texto gris claro</p>

<!-- Márgenes -->
<h2 class="mb-8">Título con margen inferior 4rem</h2>
<p class="mt-4">Párrafo con margen superior 2rem</p>
```

---

## 📋 EJEMPLOS DE USO COMÚN

### Sección Típica

```html
<section class="section">
  <div class="container">
    <div class="text-center mb-8">
      <h2>Nuestros Servicios</h2>
      <p class="color-muted">Atención médica integral</p>
    </div>
    
    <!-- Grid de servicios -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--gap-lg);">
      <div class="card">
        <!-- Contenido del card -->
      </div>
    </div>
  </div>
</section>
```

---

### Formulario

```html
<form>
  <div class="mb-4">
    <label for="name">Nombre Completo</label>
    <input 
      type="text" 
      id="name" 
      placeholder="Juan Pérez"
    />
  </div>
  
  <div class="mb-4">
    <label for="email">Correo Electrónico</label>
    <input 
      type="email" 
      id="email" 
      placeholder="juan@ejemplo.com"
    />
  </div>
  
  <button type="submit" class="btn btn-accent">
    Enviar Consulta
  </button>
</form>
```

---

### Hero Section

```html
<section class="hero" style="padding: var(--spacing-section) 0; min-height: 80vh;">
  <div class="container">
    <div style="max-width: var(--max-width-text); margin: 0 auto;">
      <h1 class="text-center mb-6">Tu Salud, Nuestra Prioridad</h1>
      
      <p class="text-center color-muted mb-8" style="font-size: var(--font-size-lg);">
        Consultas médicas profesionales desde la comodidad de tu hogar
      </p>
      
      <div style="display: flex; gap: var(--space-4); justify-content: center;">
        <a href="#contacto" class="btn btn-primary">Agendar Consulta</a>
        <a href="#servicios" class="btn btn-outline">Ver Servicios</a>
      </div>
    </div>
  </div>
</section>
```

---

## 🎨 ICONOS SVG - Minimalistas

```html
<!-- Icono monocromático simple -->
<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
  <!-- Fondo gris claro (opcional) -->
  <circle cx="30" cy="30" r="30" fill="var(--color-gray-50)"/>
  
  <!-- Icono en azul profundo o verde menta -->
  <path 
    d="M30 15v30M15 30h30" 
    stroke="var(--color-primary)" 
    stroke-width="3" 
    stroke-linecap="round"
  />
</svg>

<!-- Alternativa con verde menta -->
<svg width="60" height="60" viewBox="0 0 60 60" fill="none">
  <circle cx="30" cy="30" r="30" fill="var(--color-gray-50)"/>
  <path 
    d="..." 
    stroke="var(--color-accent)" 
    stroke-width="3"
  />
</svg>
```

---

## 🚫 LO QUE NO DEBES USAR

```css
/* ❌ NO USAR */
background: linear-gradient(...);           /* Sin gradientes */
box-shadow: 0 8px 24px rgba(0,0,0,0.2);    /* Sombras grandes */
transform: translateY(-8px);                /* Transforms en hover */
border-radius: 12px;                        /* Redondeo excesivo */
font-weight: 700;                           /* Bold extremo */
border: 2px solid;                          /* Bordes gruesos */

/* ✅ USAR EN SU LUGAR */
background: var(--color-background);        /* Fondo sólido */
/* Sin box-shadow o var(--shadow-subtle) */ /* Sombra mínima */
/* Solo cambio de color en hover */         /* Sin transforms */
border-radius: var(--border-radius-md);     /* 4px máximo */
font-weight: var(--font-weight-semibold);   /* 600 */
border: var(--border-width-thin) solid;     /* 1px */
```

---

## 📱 RESPONSIVE - Mobile First

```css
/* ✅ Desktop (por defecto) */
.section {
  padding: var(--spacing-section) 0;  /* 8rem */
}

h1 {
  font-size: var(--font-size-4xl);    /* 3.052rem */
}

/* ✅ Mobile (<768px) */
@media (max-width: 768px) {
  .section {
    padding: var(--space-10) 0;       /* 5rem (reducido pero generoso) */
  }
  
  h1 {
    font-size: var(--font-size-3xl);  /* 2.441rem */
  }
  
  .container {
    padding: 0 var(--space-3);        /* 1.5rem */
  }
  
  .btn {
    width: 100%;                      /* Full width */
  }
}
```

---

## ✅ CHECKLIST RÁPIDO

Antes de publicar un componente, verificar:

- [ ] ¿Usas `var(--color-primary)` en lugar de `#2c3e50`?
- [ ] ¿Los espaciados son `var(--spacing-*)` o `var(--space-*)`?
- [ ] ¿Eliminaste `linear-gradient()`?
- [ ] ¿Eliminaste `transform: translateY()`?
- [ ] ¿Las sombras son `var(--shadow-subtle)` o ninguna?
- [ ] ¿Border-radius máximo es `var(--border-radius-md)` (4px)?
- [ ] ¿Los iconos SVG son monocromáticos?
- [ ] ¿Los font-weights son 400 o 600 únicamente?
- [ ] ¿Line-height en párrafos es 1.7-1.8?
- [ ] ¿El diseño se ve bien en mobile?

---

## 🎯 REGLA DE ORO

> **Si no estás seguro, siempre elige la opción más simple:**
> - Menos color → Mejor
> - Más espacio en blanco → Mejor
> - Sin efectos → Mejor

---

## 📁 ARCHIVOS DE REFERENCIA

- **CSS completo:** `/workspace/src/styles/minimalist-design-system.css`
- **Comparativa detallada:** `/workspace/DESIGN_COMPARISON.md`
- **Resumen ejecutivo:** `/workspace/MINIMALIST_DESIGN_SUMMARY.md`
- **Esta guía:** `/workspace/QUICK_REFERENCE.md`

---

**Última actualización:** 2026-03-07  
**Versión:** 1.0  
**Estado:** ✅ Listo para usar
