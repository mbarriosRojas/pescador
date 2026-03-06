# Scratchpad - Médico Online Landing Page

## Proyecto Completado: Landing Page con Astro

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
