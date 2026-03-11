const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculo.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const {
  validateCreateVehiculo,
  validateUpdateVehiculo,
  validateAsignarVehiculo,
} = require('../utils/validators');
const { handleValidationErrors } = require('../middleware/validation.middleware');
const { ROLES } = require('../config/constants');

// GET /api/vehiculos - Listar todos (admin) o asignado (conductor)
router.get('/', authenticate, vehiculoController.listVehiculos);

// GET /api/vehiculos/disponibles - Listar vehículos disponibles
router.get('/disponibles', authenticate, vehiculoController.listVehiculosDisponibles);

// GET /api/vehiculos/:id - Obtener por ID
router.get('/:id', authenticate, vehiculoController.getVehiculoById);

// POST /api/vehiculos - Crear (solo admin)
router.post(
  '/',
  authenticate,
  authorize(ROLES.ADMIN),
  validateCreateVehiculo,
  handleValidationErrors,
  vehiculoController.createVehiculo
);

// PUT /api/vehiculos/:id - Actualizar (solo admin)
router.put(
  '/:id',
  authenticate,
  authorize(ROLES.ADMIN),
  validateUpdateVehiculo,
  handleValidationErrors,
  vehiculoController.updateVehiculo
);

// DELETE /api/vehiculos/:id - Eliminar (soft delete, solo admin)
router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.ADMIN),
  vehiculoController.deleteVehiculo
);

// POST /api/vehiculos/:id/asignar - Asignar a conductor (solo admin)
router.post(
  '/:id/asignar',
  authenticate,
  authorize(ROLES.ADMIN),
  validateAsignarVehiculo,
  handleValidationErrors,
  vehiculoController.asignarVehiculo
);

// POST /api/vehiculos/:id/desasignar - Desasignar de conductor (solo admin)
router.post(
  '/:id/desasignar',
  authenticate,
  authorize(ROLES.ADMIN),
  vehiculoController.desasignarVehiculo
);

module.exports = router;
