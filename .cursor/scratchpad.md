# Scratchpad - Administrador de Taxis

## Estado Actual del Repositorio
- Repositorio: https://github.com/mbarriosRojas/pescador.git
- Rama actual: cursor/sistema-de-gesti-n-de-taxis-cb4a
- Proyecto anterior: Sistema de Gestión de Tareas (completado)

## Nueva Tarea: Sistema de Administración de Flota de Taxis

### Descripción del Proyecto
Sistema de administración de flota de taxis con registro de conductores, vehículos, viajes y reportes.

### Stack Tecnológico
- **Frontend:** React
- **Backend:** Node.js/Express
- **Base de datos:** MongoDB

### Historias de Usuario
1. Como admin quiero registrar conductores con datos personales y licencia
2. Como admin quiero registrar vehículos y asignarlos a conductores
3. Como admin quiero ver el historial de viajes y ganancias
4. Como conductor quiero registrar inicio y fin de viaje
5. Como admin quiero generar reportes por período y conductor

### Estado Actual
✅ **Completado** - Fase de arquitectura

### Fases de Implementación
- [x] **Fase 1:** Arquitectura y plan técnico (architect) ✅
- [ ] **Fase 2:** Base de datos y modelos (database)
- [ ] **Fase 3:** Backend API (backend)
- [ ] **Fase 4:** Frontend React (frontend)
- [ ] **Fase 5:** Integración frontend-backend (integrator)
- [ ] **Fase 6:** Verificación y testing (verifier)

### Decisiones Arquitecturales

#### Arquitectura General
- **Patrón:** RESTful API con separación frontend/backend
- **Comunicación:** JSON sobre HTTP/HTTPS
- **Autenticación:** JWT (JSON Web Tokens) con refresh tokens
- **Autorización:** Role-Based Access Control (RBAC) - Admin y Conductor
- **Validación:** Backend con express-validator, Frontend con react-hook-form
- **Estado Frontend:** React Context API + Custom Hooks (sin Redux para simplicidad)
- **CORS:** Habilitado para desarrollo, configurado para producción

#### Seguridad
- Passwords hasheados con bcrypt (salt rounds: 10)
- JWT tokens con expiración (access: 15min, refresh: 7 días)
- Middleware de autenticación en todas las rutas protegidas
- Validación de entrada en backend (sanitización y validación)
- Variables de entorno para secrets (dotenv)
- Rate limiting en endpoints de autenticación

#### Base de Datos
- MongoDB con Mongoose ODM
- Índices en campos frecuentemente consultados (email, placa, conductorId)
- Soft deletes para auditoría (campo `deletedAt`)
- Timestamps automáticos (createdAt, updatedAt)

### Estructura de Carpetas

```
proyecto/
├── frontend/                          # React Application
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/                # Componentes reutilizables
│   │   │   ├── common/               # Componentes comunes (Button, Input, Modal, etc.)
│   │   │   ├── layout/               # Layout components (Header, Sidebar, Footer)
│   │   │   └── forms/                # Form components específicos
│   │   ├── pages/                    # Páginas/Views
│   │   │   ├── auth/                 # Login, Register
│   │   │   ├── admin/                # Dashboard admin, conductores, vehículos, reportes
│   │   │   └── conductor/            # Dashboard conductor, viajes
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useApi.js
│   │   │   └── useForm.js
│   │   ├── context/                  # React Context
│   │   │   └── AuthContext.js
│   │   ├── services/                 # API service layer
│   │   │   ├── api.js                # Axios instance config
│   │   │   ├── authService.js
│   │   │   ├── conductorService.js
│   │   │   ├── vehiculoService.js
│   │   │   ├── viajeService.js
│   │   │   └── reporteService.js
│   │   ├── utils/                    # Utilidades
│   │   │   ├── constants.js
│   │   │   ├── validators.js
│   │   │   └── formatters.js
│   │   ├── styles/                   # Estilos globales
│   │   │   ├── index.css
│   │   │   └── variables.css
│   │   ├── App.js                    # Componente principal
│   │   ├── index.js                  # Entry point
│   │   └── routes.js                 # React Router config
│   ├── package.json
│   └── .env                          # Variables de entorno (REACT_APP_API_URL)
│
├── backend/                           # Node.js/Express API
│   ├── src/
│   │   ├── models/                   # Mongoose Models
│   │   │   ├── User.js
│   │   │   ├── Conductor.js
│   │   │   ├── Vehiculo.js
│   │   │   └── Viaje.js
│   │   ├── routes/                    # Express Routes
│   │   │   ├── auth.routes.js
│   │   │   ├── conductor.routes.js
│   │   │   ├── vehiculo.routes.js
│   │   │   ├── viaje.routes.js
│   │   │   └── reporte.routes.js
│   │   ├── controllers/              # Route Controllers
│   │   │   ├── auth.controller.js
│   │   │   ├── conductor.controller.js
│   │   │   ├── vehiculo.controller.js
│   │   │   ├── viaje.controller.js
│   │   │   └── reporte.controller.js
│   │   ├── middleware/               # Custom Middleware
│   │   │   ├── auth.middleware.js    # JWT verification
│   │   │   ├── role.middleware.js    # Role-based authorization
│   │   │   ├── validation.middleware.js
│   │   │   └── error.middleware.js   # Error handling
│   │   ├── services/                 # Business Logic
│   │   │   ├── auth.service.js
│   │   │   ├── conductor.service.js
│   │   │   ├── vehiculo.service.js
│   │   │   ├── viaje.service.js
│   │   │   └── reporte.service.js
│   │   ├── utils/                    # Utilidades
│   │   │   ├── jwt.js                # JWT helpers
│   │   │   ├── bcrypt.js             # Password hashing
│   │   │   ├── validators.js         # Custom validators
│   │   │   └── errors.js             # Custom error classes
│   │   ├── config/                   # Configuración
│   │   │   ├── database.js           # MongoDB connection
│   │   │   ├── env.js                # Environment variables
│   │   │   └── constants.js          # App constants
│   │   └── app.js                    # Express app setup
│   ├── server.js                     # Entry point
│   ├── package.json
│   └── .env                          # Variables de entorno
│
├── README.md                          # Instrucciones de instalación y uso
└── .gitignore
```

### Modelos de Datos (MongoDB Schemas)

#### 1. User (Usuario)
```javascript
{
  _id: ObjectId,
  email: String (unique, required, lowercase),
  password: String (hashed, required),
  role: String (enum: ['admin', 'conductor'], required, default: 'conductor'),
  conductorId: ObjectId (ref: 'Conductor', optional, solo si role='conductor'),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date (optional, para soft delete)
}
```

#### 2. Conductor
```javascript
{
  _id: ObjectId,
  nombre: String (required),
  apellido: String (required),
  documento: String (unique, required), // DNI/Cédula
  telefono: String (required),
  email: String (unique, required, lowercase),
  direccion: String,
  fechaNacimiento: Date,
  licencia: {
    numero: String (unique, required),
    fechaExpedicion: Date (required),
    fechaVencimiento: Date (required),
    categoria: String (required) // Ej: "A", "B", "C"
  },
  vehiculoAsignado: ObjectId (ref: 'Vehiculo', optional),
  estado: String (enum: ['activo', 'inactivo', 'suspendido'], default: 'activo'),
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date (optional)
}
```

#### 3. Vehiculo
```javascript
{
  _id: ObjectId,
  placa: String (unique, required, uppercase),
  marca: String (required),
  modelo: String (required),
  año: Number (required, min: 1900, max: año actual + 1),
  color: String,
  tipo: String (enum: ['sedan', 'suv', 'hatchback', 'van'], default: 'sedan'),
  conductorAsignado: ObjectId (ref: 'Conductor', optional),
  estado: String (enum: ['disponible', 'en-uso', 'mantenimiento', 'inactivo'], default: 'disponible'),
  kilometraje: Number (default: 0),
  fechaAdquisicion: Date,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date (optional)
}
```

#### 4. Viaje
```javascript
{
  _id: ObjectId,
  conductor: ObjectId (ref: 'Conductor', required),
  vehiculo: ObjectId (ref: 'Vehiculo', required),
  fechaInicio: Date (required),
  fechaFin: Date (optional),
  origen: {
    direccion: String (required),
    coordenadas: {
      lat: Number,
      lng: Number
    }
  },
  destino: {
    direccion: String,
    coordenadas: {
      lat: Number,
      lng: Number
    }
  },
  distancia: Number (km, default: 0),
  tarifaBase: Number (default: 0),
  tarifaPorKm: Number (default: 0),
  ganancia: Number (calculated, default: 0), // tarifaBase + (distancia * tarifaPorKm)
  estado: String (enum: ['iniciado', 'completado', 'cancelado'], default: 'iniciado'),
  observaciones: String,
  createdAt: Date,
  updatedAt: Date
}
```

### API Endpoints

#### Autenticación (`/api/auth`)
- `POST /api/auth/register` - Registro (solo admin puede crear usuarios)
- `POST /api/auth/login` - Login (retorna JWT)
- `POST /api/auth/refresh` - Refrescar token
- `POST /api/auth/logout` - Logout (invalidar refresh token)
- `GET /api/auth/me` - Obtener usuario actual (protegido)

#### Conductores (`/api/conductores`)
- `GET /api/conductores` - Listar todos (admin) o propio (conductor)
- `GET /api/conductores/:id` - Obtener por ID
- `POST /api/conductores` - Crear (solo admin)
- `PUT /api/conductores/:id` - Actualizar (admin o propio)
- `DELETE /api/conductores/:id` - Eliminar (soft delete, solo admin)
- `GET /api/conductores/:id/vehiculo` - Obtener vehículo asignado

#### Vehículos (`/api/vehiculos`)
- `GET /api/vehiculos` - Listar todos (admin) o asignado (conductor)
- `GET /api/vehiculos/:id` - Obtener por ID
- `POST /api/vehiculos` - Crear (solo admin)
- `PUT /api/vehiculos/:id` - Actualizar (solo admin)
- `DELETE /api/vehiculos/:id` - Eliminar (soft delete, solo admin)
- `POST /api/vehiculos/:id/asignar` - Asignar a conductor (solo admin)
- `POST /api/vehiculos/:id/desasignar` - Desasignar de conductor (solo admin)
- `GET /api/vehiculos/disponibles` - Listar vehículos disponibles

#### Viajes (`/api/viajes`)
- `GET /api/viajes` - Listar todos (admin) o propios (conductor)
- `GET /api/viajes/:id` - Obtener por ID
- `POST /api/viajes/iniciar` - Iniciar viaje (conductor)
- `PUT /api/viajes/:id/finalizar` - Finalizar viaje (conductor)
- `PUT /api/viajes/:id/cancelar` - Cancelar viaje (conductor)
- `GET /api/viajes/conductor/:conductorId` - Viajes de un conductor (admin)

#### Reportes (`/api/reportes`)
- `GET /api/reportes/ganancias` - Ganancias totales (admin)
  - Query params: `?fechaInicio=YYYY-MM-DD&fechaFin=YYYY-MM-DD&conductorId=xxx`
- `GET /api/reportes/viajes` - Historial de viajes (admin)
  - Query params: `?fechaInicio=YYYY-MM-DD&fechaFin=YYYY-MM-DD&conductorId=xxx&estado=xxx`
- `GET /api/reportes/conductor/:conductorId` - Reporte por conductor (admin)
  - Query params: `?fechaInicio=YYYY-MM-DD&fechaFin=YYYY-MM-DD`
- `GET /api/reportes/estadisticas` - Estadísticas generales (admin)
  - Retorna: total viajes, ganancias, conductores activos, vehículos disponibles

### Autenticación y Autorización

#### Flujo de Autenticación
1. Usuario hace login con email/password
2. Backend valida credenciales
3. Backend genera:
   - Access Token (JWT, expira en 15min)
   - Refresh Token (JWT, expira en 7 días, guardado en DB)
4. Frontend guarda tokens (localStorage o httpOnly cookies)
5. Frontend incluye Access Token en header: `Authorization: Bearer <token>`
6. Si Access Token expira, Frontend usa Refresh Token para obtener nuevo Access Token
7. Si Refresh Token expira, usuario debe hacer login nuevamente

#### Middleware de Autorización
- `authenticate`: Verifica JWT token válido
- `authorize(['admin'])`: Solo admin
- `authorize(['admin', 'conductor'])`: Admin o conductor
- `authorizeOwner`: Solo el dueño del recurso o admin

#### Protección de Rutas Frontend
- Rutas públicas: `/login`, `/register` (solo admin)
- Rutas protegidas: Todas las demás
- Redirección automática si no autenticado
- Redirección según rol (admin → dashboard admin, conductor → dashboard conductor)

### Stack Tecnológico Específico

#### Frontend
- **React:** ^18.2.0
- **React Router DOM:** ^6.20.0
- **Axios:** ^1.6.2
- **React Hook Form:** ^7.48.2
- **React Context API:** (built-in)
- **CSS Modules o Styled Components:** (a definir)
- **Date-fns:** ^2.30.0 (manejo de fechas)
- **React Icons:** ^4.12.0

#### Backend
- **Node.js:** ^18.17.0 o superior
- **Express:** ^4.18.2
- **Mongoose:** ^8.0.3
- **jsonwebtoken:** ^9.0.2
- **bcryptjs:** ^2.4.3
- **express-validator:** ^7.0.1
- **dotenv:** ^16.3.1
- **cors:** ^2.8.5
- **helmet:** ^7.1.0 (seguridad HTTP headers)
- **express-rate-limit:** ^7.1.5 (rate limiting)
- **morgan:** ^1.10.0 (logging HTTP requests)

#### Base de Datos
- **MongoDB:** ^7.0 (o MongoDB Atlas)
- **Mongoose:** ^8.0.3 (ODM)

#### Desarrollo
- **Nodemon:** ^3.0.2 (dev dependency, backend)
- **ESLint:** (configurar)
- **Prettier:** (configurar)

### Variables de Entorno

#### Backend (.env)
```
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

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### Flujo de Datos

#### Registro de Conductor (Admin)
1. Admin completa formulario con datos del conductor
2. Frontend valida datos localmente
3. POST `/api/conductores` con datos
4. Backend valida y crea registro en MongoDB
5. Backend crea usuario asociado (email/password temporal)
6. Backend retorna conductor creado
7. Frontend muestra mensaje de éxito y actualiza lista

#### Asignación Vehículo-Conductor (Admin)
1. Admin selecciona vehículo y conductor
2. POST `/api/vehiculos/:id/asignar` con `{ conductorId }`
3. Backend valida que vehículo esté disponible
4. Backend actualiza `vehiculo.conductorAsignado` y `conductor.vehiculoAsignado`
5. Backend actualiza estado del vehículo a 'en-uso' o 'disponible'
6. Frontend actualiza vista

#### Registro de Viaje (Conductor)
1. Conductor inicia viaje: POST `/api/viajes/iniciar`
   - Backend crea viaje con estado 'iniciado'
   - Backend actualiza estado del vehículo a 'en-uso'
2. Conductor finaliza viaje: PUT `/api/viajes/:id/finalizar`
   - Backend calcula distancia (si se proporciona)
   - Backend calcula ganancia (tarifaBase + distancia * tarifaPorKm)
   - Backend actualiza estado a 'completado'
   - Backend actualiza estado del vehículo a 'disponible'

#### Generación de Reportes (Admin)
1. Admin selecciona filtros (fechas, conductor)
2. GET `/api/reportes/ganancias?fechaInicio=...&fechaFin=...`
3. Backend consulta MongoDB con filtros
4. Backend agrega datos (suma ganancias, cuenta viajes)
5. Backend retorna datos agregados
6. Frontend muestra gráficos/tablas

### Consideraciones de Implementación

#### Validaciones Importantes
- Email único en usuarios y conductores
- Placa única en vehículos
- Documento único en conductores
- Licencia única en conductores
- No asignar vehículo ya asignado
- No iniciar viaje si hay viaje activo
- Fechas válidas (vencimiento licencia > fecha actual)

#### Índices MongoDB
- `User.email` (unique)
- `Conductor.documento` (unique)
- `Conductor.licencia.numero` (unique)
- `Vehiculo.placa` (unique)
- `Viaje.conductor` (index)
- `Viaje.fechaInicio` (index para reportes)
- `Viaje.estado` (index)

#### Manejo de Errores
- Errores HTTP estándar (400, 401, 403, 404, 500)
- Mensajes de error descriptivos en español
- Logging de errores en backend
- Manejo de errores de red en frontend

#### Testing (Futuro)
- Unit tests para servicios
- Integration tests para endpoints
- E2E tests para flujos críticos

---
