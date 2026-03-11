# Sistema de Administración de Flota de Taxis

Sistema completo de administración de flota de taxis con registro de conductores, vehículos, viajes y reportes.

## 🎯 Descripción

Sistema web full-stack para la gestión de una flota de taxis que permite:
- Administración de conductores con datos personales y licencias
- Gestión de vehículos y asignación a conductores
- Registro de viajes (inicio y fin)
- Generación de reportes de ganancias y estadísticas
- Dashboard diferenciado para administradores y conductores

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** ^18.17.0
- **Express** ^4.18.2
- **MongoDB** con **Mongoose** ^8.0.3
- **JWT** para autenticación
- **bcryptjs** para hash de contraseñas
- **express-validator** para validación
- **Helmet** para seguridad HTTP headers
- **CORS** configurado
- **Morgan** para logging

### Frontend
- **React** ^18.2.0
- **React Router DOM** ^6.20.0
- **Vite** ^5.0.8 (build tool)
- **Axios** ^1.6.2 para peticiones HTTP
- **React Hook Form** ^7.48.2 para formularios
- **date-fns** ^2.30.0 para manejo de fechas
- **React Icons** ^4.12.0

## 📁 Estructura del Proyecto

```
proyecto/
├── backend/                    # API Node.js/Express
│   ├── src/
│   │   ├── models/            # Modelos Mongoose (User, Conductor, Vehiculo, Viaje)
│   │   ├── routes/            # Rutas Express
│   │   ├── controllers/       # Controladores
│   │   ├── services/          # Lógica de negocio
│   │   ├── middleware/        # Middleware personalizado
│   │   ├── utils/             # Utilidades (JWT, bcrypt, validators, errors)
│   │   ├── config/            # Configuración (database, env, constants)
│   │   └── app.js             # Configuración Express
│   ├── server.js              # Entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/                   # Aplicación React
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── common/        # Button, Input, Select, Modal, Loading, Error
│   │   │   └── layout/        # Header, Sidebar, Footer, Layout
│   │   ├── pages/             # Páginas
│   │   │   ├── auth/          # Login, Register
│   │   │   ├── admin/         # Dashboard, Conductores, Vehículos, Viajes, Reportes
│   │   │   └── conductor/     # Dashboard, Viajes
│   │   ├── hooks/             # Custom hooks (useAuth, useApi)
│   │   ├── context/           # React Context (AuthContext)
│   │   ├── services/          # API services
│   │   ├── utils/             # Utilidades (constants, validators, formatters)
│   │   ├── styles/            # Estilos globales
│   │   ├── App.js             # Componente principal
│   │   ├── index.js           # Entry point
│   │   └── routes.js          # React Router config
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
└── README-TAXIS.md            # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18.17.0 o superior
- MongoDB (local o MongoDB Atlas)
- npm o yarn

### Backend

1. **Navegar a la carpeta backend**
```bash
cd backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Editar `.env` con tus valores:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taxi-admin
JWT_SECRET=tu-secret-key-super-segura-aqui
JWT_REFRESH_SECRET=tu-refresh-secret-key-aqui
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
BCRYPT_ROUNDS=10
CORS_ORIGIN=http://localhost:3000
```

4. **Iniciar servidor**
```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

El servidor estará disponible en `http://localhost:5000`

### Frontend

1. **Navegar a la carpeta frontend**
```bash
cd frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Editar `.env` con tus valores:
```env
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

5. **Build para producción**
```bash
npm run build
npm run preview
```

## 📋 Funcionalidades

### Historias de Usuario Implementadas

✅ **HU1:** Como admin quiero registrar conductores con datos personales y licencia
- Formulario completo con validaciones
- Registro de datos personales, contacto y licencia
- Validación de unicidad (email, documento, licencia)

✅ **HU2:** Como admin quiero registrar vehículos y asignarlos a conductores
- CRUD completo de vehículos
- Asignación/desasignación de vehículos a conductores
- Validación de disponibilidad

✅ **HU3:** Como admin quiero ver el historial de viajes y ganancias
- Tabla de viajes con filtros
- Dashboard con estadísticas generales
- Reportes de ganancias por período y conductor

✅ **HU4:** Como conductor quiero registrar inicio y fin de viaje
- Modal para iniciar viaje (origen)
- Modal para finalizar viaje (destino, distancia)
- Cálculo automático de ganancia

✅ **HU5:** Como admin quiero generar reportes por período y conductor
- Reporte de ganancias totales
- Reporte por conductor específico
- Filtros por fechas y conductor

## 🔐 Autenticación y Autorización

### Roles
- **Admin:** Acceso completo al sistema
- **Conductor:** Acceso limitado a su perfil y viajes

### Flujo de Autenticación
1. Usuario hace login con email/password
2. Backend valida credenciales y genera tokens JWT
3. Frontend guarda tokens en localStorage
4. Tokens se incluyen automáticamente en todas las peticiones
5. Refresh automático de tokens cuando expiran

### Endpoints Protegidos
- Todas las rutas excepto `/api/auth/login` y `/api/auth/register` requieren autenticación
- Rutas de admin requieren rol `admin`
- Rutas de conductor requieren rol `conductor` o `admin`

## 📡 API Endpoints

### Autenticación (`/api/auth`)
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login (retorna JWT)
- `POST /api/auth/refresh` - Refrescar token
- `GET /api/auth/me` - Obtener usuario actual

### Conductores (`/api/conductores`)
- `GET /api/conductores` - Listar todos (admin) o propio (conductor)
- `GET /api/conductores/:id` - Obtener por ID
- `POST /api/conductores` - Crear (solo admin)
- `PUT /api/conductores/:id` - Actualizar (admin o propio)
- `DELETE /api/conductores/:id` - Eliminar (soft delete, solo admin)
- `GET /api/conductores/:id/vehiculo` - Obtener vehículo asignado

### Vehículos (`/api/vehiculos`)
- `GET /api/vehiculos` - Listar todos (admin) o asignado (conductor)
- `GET /api/vehiculos/:id` - Obtener por ID
- `POST /api/vehiculos` - Crear (solo admin)
- `PUT /api/vehiculos/:id` - Actualizar (solo admin)
- `DELETE /api/vehiculos/:id` - Eliminar (soft delete, solo admin)
- `POST /api/vehiculos/:id/asignar` - Asignar a conductor (solo admin)
- `POST /api/vehiculos/:id/desasignar` - Desasignar (solo admin)
- `GET /api/vehiculos/disponibles` - Listar disponibles

### Viajes (`/api/viajes`)
- `GET /api/viajes` - Listar todos (admin) o propios (conductor)
- `GET /api/viajes/:id` - Obtener por ID
- `POST /api/viajes/iniciar` - Iniciar viaje (conductor)
- `PUT /api/viajes/:id/finalizar` - Finalizar viaje (conductor)
- `PUT /api/viajes/:id/cancelar` - Cancelar viaje (conductor)
- `GET /api/viajes/conductor/:conductorId` - Viajes de un conductor (admin)

### Reportes (`/api/reportes`)
- `GET /api/reportes/ganancias` - Ganancias totales (admin)
  - Query params: `?fechaInicio=YYYY-MM-DD&fechaFin=YYYY-MM-DD&conductorId=xxx`
- `GET /api/reportes/viajes` - Historial de viajes (admin)
  - Query params: `?fechaInicio=YYYY-MM-DD&fechaFin=YYYY-MM-DD&conductorId=xxx&estado=xxx`
- `GET /api/reportes/conductor/:conductorId` - Reporte por conductor (admin)
  - Query params: `?fechaInicio=YYYY-MM-DD&fechaFin=YYYY-MM-DD`
- `GET /api/reportes/estadisticas` - Estadísticas generales (admin)

## 🗄️ Modelos de Datos

### User (Usuario)
- email (único)
- password (hasheado)
- role (admin/conductor)
- conductorId (opcional, si es conductor)
- isActive
- timestamps

### Conductor
- Datos personales (nombre, apellido, documento, teléfono, email)
- Licencia (número único, fechas, categoría)
- vehiculoAsignado (referencia a Vehiculo)
- estado (activo/inactivo/suspendido)
- timestamps

### Vehiculo
- placa (única)
- marca, modelo, año, color, tipo
- conductorAsignado (referencia a Conductor)
- estado (disponible/en-uso/mantenimiento/inactivo)
- kilometraje
- timestamps

### Viaje
- conductor (referencia a Conductor)
- vehiculo (referencia a Vehiculo)
- fechaInicio, fechaFin
- origen, destino (direcciones y coordenadas)
- distancia (km)
- tarifaBase, tarifaPorKm
- ganancia (calculada automáticamente)
- estado (iniciado/completado/cancelado)
- timestamps

## 🔒 Seguridad

- Passwords hasheados con bcrypt (10 salt rounds)
- JWT tokens con expiración (access: 15min, refresh: 7 días)
- Middleware de autenticación en todas las rutas protegidas
- Validación de entrada en backend (sanitización y validación)
- Variables de entorno para secrets
- Rate limiting en endpoints de autenticación (5 intentos / 15 min)
- Helmet para seguridad HTTP headers
- CORS configurado

## 🧪 Testing

Actualmente no hay tests automatizados implementados. Se recomienda agregar:
- Unit tests para servicios
- Integration tests para endpoints
- E2E tests para flujos críticos

## 📝 Notas de Desarrollo

### Primer Admin
El sistema permite crear el primer admin sin autenticación. Después de eso, solo los admins pueden crear nuevos usuarios.

### Soft Deletes
Los modelos User, Conductor y Vehiculo implementan soft deletes (campo `deletedAt`) para mantener auditoría.

### Cálculo de Ganancias
Las ganancias se calculan automáticamente: `ganancia = tarifaBase + (distancia * tarifaPorKm)`

### Validaciones
- Email único en usuarios y conductores
- Placa única en vehículos
- Documento único en conductores
- Licencia única en conductores
- No asignar vehículo ya asignado
- No iniciar viaje si hay viaje activo

## 🚀 Despliegue

### Backend
1. Configurar variables de entorno en producción
2. Asegurar que MongoDB esté accesible
3. Ejecutar `npm start`

### Frontend
1. Configurar `VITE_API_URL` con la URL del backend en producción
2. Ejecutar `npm run build`
3. Servir la carpeta `dist/` con un servidor web (nginx, Apache, etc.)

## 📄 Licencia

Este proyecto es parte de un repositorio experimental.

## 👥 Contribución

1. Crear una rama desde `main`
2. Implementar cambios
3. Crear Pull Request
4. Esperar revisión y aprobación

---

**Desarrollado con ❤️ usando Node.js, Express, MongoDB, React y Vite**
