const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { ROLES } = require('../config/constants');

// Todas las rutas de reportes requieren autenticación y rol admin
router.use(authenticate);
router.use(authorize(ROLES.ADMIN));

// GET /api/reportes/ganancias - Ganancias totales
router.get('/ganancias', reporteController.getGanancias);

// GET /api/reportes/viajes - Historial de viajes
router.get('/viajes', reporteController.getHistorialViajes);

// GET /api/reportes/conductor/:conductorId - Reporte por conductor
router.get('/conductor/:conductorId', reporteController.getReportePorConductor);

// GET /api/reportes/estadisticas - Estadísticas generales
router.get('/estadisticas', reporteController.getEstadisticas);

module.exports = router;
