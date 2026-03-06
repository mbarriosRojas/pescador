# Médico Online - Landing Page

Landing page estática de alta conversión para **Médico Online**, una plataforma integral de telemedicina y bienestar humano.

## Tecnologías

- **Astro** - Framework web moderno para sitios estáticos
- **HTML5** semántico
- **CSS3** con variables personalizadas, Grid y Flexbox
- Diseño responsive (mobile-first)

## Características

- ✅ Diseño moderno y atractivo
- ✅ Totalmente responsive
- ✅ Optimizado para conversión
- ✅ Componentes reutilizables
- ✅ SEO optimizado
- ✅ Rendimiento óptimo
- ✅ Configurado para GitHub Pages

## Estructura del Proyecto

```
medico-online/
├── src/
│   ├── components/      # Componentes Astro reutilizables
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Services.astro
│   │   ├── Benefits.astro
│   │   ├── HowItWorks.astro
│   │   ├── Pricing.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── pages/          # Páginas de la aplicación
│   │   └── index.astro
│   └── styles/         # Estilos globales
│       └── global.css
├── public/             # Archivos estáticos
├── docs/               # Build output para GitHub Pages
└── astro.config.mjs    # Configuración de Astro
```

## Instalación y Uso

### Requisitos Previos

- Node.js 18 o superior
- npm o pnpm

### Instalación

```bash
cd medico-online
npm install
```

### Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

### Build para Producción

Para generar el sitio estático:

```bash
npm run build
```

Los archivos se generarán en la carpeta `docs/` lista para GitHub Pages.

### Preview del Build

Para previsualizar el build de producción:

```bash
npm run preview
```

## Configuración para GitHub Pages

El proyecto está configurado para desplegarse en GitHub Pages:

- `output: 'static'` - Generación de sitio estático
- `outDir: 'docs'` - Directorio de salida configurado para GitHub Pages
- `site` y `base` configurados para el repositorio `mbarriosRojas/pescador`

### Pasos para Desplegar

1. Hacer build del proyecto:
   ```bash
   npm run build
   ```

2. Commit y push de los cambios (incluyendo carpeta `docs/`):
   ```bash
   git add .
   git commit -m "Build landing page"
   git push origin main
   ```

3. En GitHub, ir a Settings > Pages
4. Seleccionar la rama `main` y carpeta `/docs`
5. Guardar cambios

El sitio estará disponible en: `https://mbarriosRojas.github.io/pescador/`

## Secciones de la Landing Page

1. **Header** - Navegación principal con menú responsive
2. **Hero** - Sección principal con call-to-action
3. **Servicios** - Grid de servicios médicos disponibles
4. **Beneficios** - Por qué elegir Médico Online
5. **Cómo Funciona** - Proceso en 3 pasos
6. **Precios** - Planes y precios con comparación
7. **Contacto** - Formulario de contacto y datos
8. **Footer** - Links, redes sociales e información adicional

## Personalización

### Colores

Los colores se pueden modificar en `src/styles/global.css`:

```css
:root {
  --primary-color: #0066cc;
  --secondary-color: #00c896;
  --accent-color: #ff6b6b;
  /* ... más variables */
}
```

### Contenido

El contenido se puede modificar directamente en cada componente en `src/components/`

## Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Genera build de producción
- `npm run preview` - Previsualiza el build
- `npm run astro` - Ejecuta comandos de Astro CLI

## Licencia

Este proyecto es parte de un repositorio de experimentos.

---

Desarrollado con ❤️ usando Astro
