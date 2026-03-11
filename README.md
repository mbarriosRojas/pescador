# Sistema de Administración de Flota de Taxis

Sistema completo de administración de flota de taxis con registro de conductores, vehículos, viajes y reportes. Desarrollado con React (frontend) y Node.js/Express (backend), utilizando MongoDB como base de datos.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [API Endpoints](#api-endpoints)
- [Autenticación](#autenticación)
- [Roles y Permisos](#roles-y-permisos)
- [Desarrollo](#desarrollo)
- [Producción](#producción)

## ✨ Características

- **Gestión de Conductores**: Registro completo con datos personales y licencias
- **Gestión de Vehículos**: Control de flota con asignación a conductores
- **Registro de Viajes**: Inicio y finalización de viajes con cálculo automático de ganancias
- **Reportes y Estadísticas**: Reportes de ganancias, historial de viajes y estadísticas generales
- **Autenticación JWT**: Sistema seguro con access tokens y refresh tokens
- **Control de Acceso**: Roles de administrador y conductor con permisos diferenciados
- **Interfaz Moderna**: UI responsive y moderna con React

## 🛠️ Stack Tecnológico

### Frontend
- **React** ^18.2.0
- **React Router DOM** ^6.20.0
- **Axios** ^1.6.2
- **React Hook Form** ^7.48.2
- **Vite** ^5.0.8
- **date-fns** ^2.30.0
- **React Icons** ^4.12.0

### Backend
- **Node.js** ^18.17.0
- **Express** ^4.18.2
- **MongoDB** con **Mongoose** ^8.0.3
- **JWT** (jsonwebtoken) ^9.0.2
- **bcryptjs** ^2.4.3
- **express-validator** ^7.0.1
- **CORS** ^2.8.5
- **Helmet** ^7.1.0
- **express-rate-limit** ^7.1.5

### Base de Datos
- **MongoDB** ^7.0 (local o MongoDB Atlas)

## 📁 Estructura del Proyecto

```
proyecto/
├── backend/                    # Backend API
│   ├── src/
│   │   ├── models/            # Modelos Mongoose
│   │   │   ├── User.js
│   │   │   ├── Conductor.js
│   │   │   ├── Vehiculo.js
│   │   │   └── Viaje.js
│   │   ├── routes/            # Rutas Express
│   │   │   ├── auth.routes.js
│   │   │   ├── conductor.routes.js
│   │   │   ├── vehiculo.routes.js
│   │   │   ├── viaje.routes.js
│   │   │   └── reporte.routes.js
│   │   ├── controllers/       # Controladores
│   │   ├── services/          # Lógica de negocio
│   │   ├── middleware/        # Middleware personalizado
│   │   │   ├── auth.middleware.js
│   │   │   ├── role.middleware.js
│   │   │   ├── validation.middleware.js
│   │   │   └── error.middleware.js
│   │   ├── utils/             # Utilidades
│   │   │   ├── jwt.js
│   │   │   ├── bcrypt.js
│   │   │   ├── validators.js
│   │   │   └── errors.js
│   │   ├── config/             # Configuración
│   │   │   ├── database.js
│   │   │   ├── env.js
│   │   │   └── constants.js
│   │   └── app.js              # Configuración Express
│   ├── server.js               # Entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/                    # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── common/        # Button, Input, Select, Modal, etc.
│   │   │   ├── layout/        # Header, Sidebar, Footer, Layout
│   │   │   └── forms/         # Formularios específicos
│   │   ├── pages/             # Páginas/Vistas
│   │   │   ├── auth/          # Login, Register
│   │   │   ├── admin/         # Dashboard, Conductores, Vehículos, Viajes, Reportes
│   │   │   └── conductor/     # Dashboard, Viajes
│   │   ├── hooks/             # Custom hooks
│   │   │   ├── useAuth.js
│   │   │   └── useApi.js
│   │   ├── context/           # React Context
│   │   │   └── AuthContext.js
│   │   ├── services/          # API services
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── conductorService.js
│   │   │   ├── vehiculoService.js
│   │   │   ├── viajeService.js
│   │   │   └── reporteService.js
│   │   ├── utils/             # Utilidades
│   │   │   ├── constants.js
│   │   │   ├── validators.js
│   │   │   └── formatters.js
│   │   ├── styles/            # Estilos globales
│   │   ├── App.js
│   │   ├── index.js
│   │   └── routes.js
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
└── README.md
```

## 🚀 Instalación

### Prerrequisitos

- **Node.js** 18.17.0 o superior
- **MongoDB** 7.0 o superior (local o MongoDB Atlas)
- **npm** o **yarn**

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/mbarriosRojas/pescador.git
cd pescador
git checkout cursor/sistema-de-gesti-n-de-taxis-cb4a
```

2. **Instalar dependencias del backend**

```bash
cd backend
npm install
```

3. **Instalar dependencias del frontend**

```bash
cd ../frontend
npm install
```

## ⚙️ Configuración

### Backend

1. **Copiar archivo de variables de entorno**

```bash
cd backend
cp .env.example .env
```

2. **Configurar variables de entorno** (editar `.env`)

```env
NODE_ENV=development
PORT=5000

# MongoDB
# Local: mongodb://localhost:27017/taxi-admin
# Atlas: mongodb+srv://usuario:password@cluster.mongodb.net/taxi-admin
MONGODB_URI=mongodb://localhost:27017/taxi-admin

# JWT Secrets (¡IMPORTANTE! Cambiar en producción)
JWT_SECRET=tu-secret-key-super-segura-aqui-cambiar-en-produccion
JWT_REFRESH_SECRET=tu-refresh-secret-key-aqui-cambiar-en-produccion

# JWT Expiración
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Bcrypt
BCRYPT_ROUNDS=10

# CORS (URL del frontend)
CORS_ORIGIN=http://localhost:3000
```

### Frontend

1. **Copiar archivo de variables de entorno**

```bash
cd frontend
cp .env.example .env
```

2. **Configurar variables de entorno** (editar `.env`)

```env
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

## ▶️ Ejecución

### Desarrollo

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Producción

**Backend:**

```bash
cd backend
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## 📡 API Endpoints

### Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Registro de usuario | Opcional (primer admin) |
| POST | `/api/auth/login` | Login | No |
| POST | `/api/auth/refresh` | Refrescar token | No |
| GET | `/api/auth/me` | Usuario actual | Sí |

### Conductores (`/api/conductores`)

| Método | Endpoint | Descripción | Autenticación | Rol |
|--------|----------|-------------|---------------|-----|
| GET | `/api/conductores` | Listar conductores | Sí | Admin/Conductor |
| GET | `/api/conductores/:id` | Obtener por ID | Sí | Admin/Conductor |
| POST | `/api/conductores` | Crear conductor | Sí | Admin |
| PUT | `/api/conductores/:id` | Actualizar conductor | Sí | Admin/Owner |
| DELETE | `/api/conductores/:id` | Eliminar conductor | Sí | Admin |
| GET | `/api/conductores/:id/vehiculo` | Vehículo asignado | Sí | Admin/Conductor |

### Vehículos (`/api/vehiculos`)

| Método | Endpoint | Descripción | Autenticación | Rol |
|--------|----------|-------------|---------------|-----|
| GET | `/api/vehiculos` | Listar vehículos | Sí | Admin/Conductor |
| GET | `/api/vehiculos/disponibles` | Listar disponibles | Sí | Admin |
| GET | `/api/vehiculos/:id` | Obtener por ID | Sí | Admin/Conductor |
| POST | `/api/vehiculos` | Crear vehículo | Sí | Admin |
| PUT | `/api/vehiculos/:id` | Actualizar vehículo | Sí | Admin |
| DELETE | `/api/vehiculos/:id` | Eliminar vehículo | Sí | Admin |
| POST | `/api/vehiculos/:id/asignar` | Asignar a conductor | Sí | Admin |
| POST | `/api/vehiculos/:id/desasignar` | Desasignar conductor | Sí | Admin |

### Viajes (`/api/viajes`)

| Método | Endpoint | Descripción | Autenticación | Rol |
|--------|----------|-------------|---------------|-----|
| GET | `/api/viajes` | Listar viajes | Sí | Admin/Conductor |
| GET | `/api/viajes/:id` | Obtener por ID | Sí | Admin/Conductor |
| POST | `/api/viajes/iniciar` | Iniciar viaje | Sí | Conductor |
| PUT | `/api/viajes/:id/finalizar` | Finalizar viaje | Sí | Conductor |
| PUT | `/api/viajes/:id/cancelar` | Cancelar viaje | Sí | Conductor |
| GET | `/api/viajes/conductor/:conductorId` | Viajes por conductor | Sí | Admin |

### Reportes (`/api/reportes`)

| Método | Endpoint | Descripción | Autenticación | Rol |
|--------|----------|-------------|---------------|-----|
| GET | `/api/reportes/ganancias` | Ganancias totales | Sí | Admin |
| GET | `/api/reportes/viajes` | Historial de viajes | Sí | Admin |
| GET | `/api/reportes/conductor/:conductorId` | Reporte por conductor | Sí | Admin |
| GET | `/api/reportes/estadisticas` | Estadísticas generales | Sí | Admin |

**Query Parameters para Reportes:**

- `fechaInicio`: YYYY-MM-DD
- `fechaFin`: YYYY-MM-DD
- `conductorId`: ID del conductor
- `estado`: Estado del viaje (solo para historial)

## 🔐 Autenticación

### Flujo de Autenticación

1. **Login**: El usuario envía email y password
2. **Backend valida** credenciales y genera:
   - **Access Token** (JWT, expira en 15 minutos)
   - **Refresh Token** (JWT, expira en 7 días)
3. **Frontend guarda** tokens en `localStorage`
4. **Frontend incluye** Access Token en header: `Authorization: Bearer <token>`
5. **Si Access Token expira**, el frontend usa Refresh Token automáticamente
6. **Si Refresh Token expira**, el usuario debe hacer login nuevamente

### Uso de Tokens

**En peticiones HTTP:**

```javascript
headers: {
  'Authorization': 'Bearer <accessToken>'
}
```

**Refresh automático:**

El frontend incluye un interceptor de Axios que:
- Detecta errores 401 (token expirado)
- Intenta refrescar el token automáticamente
- Reintenta la petición original con el nuevo token
- Redirige a login si el refresh falla

## 👥 Roles y Permisos

### Administrador (`admin`)

- ✅ Crear, editar y eliminar conductores
- ✅ Crear, editar y eliminar vehículos
- ✅ Asignar/desasignar vehículos a conductores
- ✅ Ver todos los viajes
- ✅ Generar reportes y estadísticas
- ✅ Crear nuevos usuarios

### Conductor (`conductor`)

- ✅ Ver su propio perfil
- ✅ Editar su propio perfil
- ✅ Ver su vehículo asignado
- ✅ Iniciar, finalizar y cancelar viajes
- ✅ Ver sus propios viajes

## 🧪 Desarrollo

### Primer Usuario (Admin)

El sistema permite crear el primer usuario administrador sin autenticación previa. Después del primer usuario, solo los administradores pueden crear nuevos usuarios.

### Estructura de Respuestas API

**Éxito:**

```json
{
  "success": true,
  "data": { ... },
  "message": "Operación exitosa" // Opcional
}
```

**Error:**

```json
{
  "success": false,
  "message": "Mensaje de error"
}
```

### Validaciones

- **Backend**: express-validator para validar entrada
- **Frontend**: react-hook-form para validación de formularios
- **Base de datos**: Mongoose schemas con validaciones

### Manejo de Errores

- **400**: Bad Request (validación fallida)
- **401**: Unauthorized (no autenticado o token inválido)
- **403**: Forbidden (no autorizado)
- **404**: Not Found (recurso no encontrado)
- **409**: Conflict (recurso duplicado)
- **500**: Internal Server Error

## 🚢 Producción

### Variables de Entorno de Producción

**Backend:**

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<secret-seguro-produccion>
JWT_REFRESH_SECRET=<refresh-secret-seguro-produccion>
CORS_ORIGIN=https://tu-dominio.com
```

**Frontend:**

```env
VITE_API_URL=https://api.tu-dominio.com/api
VITE_ENV=production
```

### Build de Producción

**Frontend:**

```bash
cd frontend
npm run build
```

Los archivos estáticos se generan en `frontend/dist/`

### Seguridad

- ✅ Passwords hasheados con bcrypt
- ✅ JWT tokens con expiración
- ✅ Rate limiting en endpoints de autenticación
- ✅ Helmet para seguridad HTTP headers
- ✅ CORS configurado
- ✅ Validación de entrada
- ✅ Sanitización de datos

## 📝 Notas Adicionales

- El sistema utiliza **soft deletes** para conductores y vehículos (campo `deletedAt`)
- Las ganancias se calculan automáticamente: `tarifaBase + (distancia * tarifaPorKm)`
- Los viajes tienen estados: `iniciado`, `completado`, `cancelado`
- Los vehículos tienen estados: `disponible`, `en-uso`, `mantenimiento`, `inactivo`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte de un repositorio experimental.

## 🔗 Enlaces

- **Repositorio**: https://github.com/mbarriosRojas/pescador
- **Rama del proyecto**: `cursor/sistema-de-gesti-n-de-taxis-cb4a`

---

Desarrollado con ❤️ usando React, Node.js, Express y MongoDB
