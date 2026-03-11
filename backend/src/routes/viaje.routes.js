const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viaje.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const {
  validateIniciarViaje,
  validateFinalizarViaje,
} = require('../utils/validators');
const { handleValidationErrors } = require('../middleware/validation.middleware');
const { ROLES } = require('../config/constants');

// GET /api/viajes - Listar todos (admin) o propios (conductor)
router.get('/', authenticate, viajeController.listViajes);

// GET /api/viajes/conductor/:conductorId - Viajes de un conductor (admin)
router.get(
  '/conductor/:conductorId',
  authenticate,
  authorize(ROLES.ADMIN),
  viajeController.getViajesPorConductor
);

// GET /api/viajes/:id - Obtener por ID
router.get('/:id', authenticate, viajeController.getViajeById);

// POST /api/viajes/iniciar - Iniciar viaje (conductor)
router.post(
  '/iniciar',
  authenticate,
  authorize(ROLES.CONDUCTOR),
  validateIniciarViaje,
  handleValidationErrors,
  viajeController.iniciarViaje
);

// PUT /api/viajes/:id/finalizar - Finalizar viaje (conductor)
router.put(
  '/:id/finalizar',
  authenticate,
  authorize(ROLES.CONDUCTOR),
  validateFinalizarViaje,
  handleValidationErrors,
  viajeController.finalizarViaje
);

// PUT /api/viajes/:id/cancelar - Cancelar viaje (conductor)
router.put(
  '/:id/cancelar',
  authenticate,
  authorize(ROLES.CONDUCTOR),
  viajeController.cancelarViaje
);

module.exports = router;
