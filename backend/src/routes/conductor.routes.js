const express = require('express');
const router = express.Router();
const conductorController = require('../controllers/conductor.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { authorizeOwner } = require('../middleware/role.middleware');
const {
  validateCreateConductor,
  validateUpdateConductor,
} = require('../utils/validators');
const { handleValidationErrors } = require('../middleware/validation.middleware');
const { ROLES } = require('../config/constants');
const Conductor = require('../models/Conductor');

// GET /api/conductores - Listar todos (admin) o propio (conductor)
router.get('/', authenticate, conductorController.listConductores);

// GET /api/conductores/:id - Obtener por ID
router.get('/:id', authenticate, conductorController.getConductorById);

// POST /api/conductores - Crear (solo admin)
router.post(
  '/',
  authenticate,
  authorize(ROLES.ADMIN),
  validateCreateConductor,
  handleValidationErrors,
  conductorController.createConductor
);

// PUT /api/conductores/:id - Actualizar (admin o propio)
router.put(
  '/:id',
  authenticate,
  authorizeOwner(async (req) => {
    const conductor = await Conductor.findById(req.params.id).notDeleted();
    if (!conductor) {
      return null;
    }
    return conductor._id.toString();
  }),
  validateUpdateConductor,
  handleValidationErrors,
  conductorController.updateConductor
);

// DELETE /api/conductores/:id - Eliminar (soft delete, solo admin)
router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.ADMIN),
  conductorController.deleteConductor
);

// GET /api/conductores/:id/vehiculo - Obtener vehículo asignado
router.get('/:id/vehiculo', authenticate, conductorController.getVehiculoAsignado);

module.exports = router;
