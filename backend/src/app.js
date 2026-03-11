const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const config = require('./config/env');
const errorHandler = require('./middleware/error.middleware');

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const conductorRoutes = require('./routes/conductor.routes');
const vehiculoRoutes = require('./routes/vehiculo.routes');
const viajeRoutes = require('./routes/viaje.routes');
const reporteRoutes = require('./routes/reporte.routes');

const app = express();

// Middleware de seguridad
app.use(helmet());

// CORS
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
  })
);

// Rate limiting para autenticación
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos por ventana
  message: 'Demasiados intentos de login, intenta de nuevo más tarde',
  standardHeaders: true,
  legacyHeaders: false,
});

// Aplicar rate limiting a rutas de autenticación
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Logging
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de salud
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
  });
});

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/conductores', conductorRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/viajes', viajeRoutes);
app.use('/api/reportes', reporteRoutes);

// Ruta 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  });
});

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

module.exports = app;
