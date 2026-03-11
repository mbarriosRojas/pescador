const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { optionalAuthenticate } = require('../middleware/optionalAuth.middleware');
const { validateRegister, validateLogin } = require('../utils/validators');
const { handleValidationErrors } = require('../middleware/validation.middleware');
const { ROLES } = require('../config/constants');
const User = require('../models/User');

// Middleware para verificar si es el primer usuario (permite crear admin sin autenticación)
const checkFirstUser = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments({ deletedAt: null });
    
    // Si no hay usuarios, permitir crear el primer admin
    if (userCount === 0) {
      // Forzar rol admin para el primer usuario
      req.body.role = ROLES.ADMIN;
      return next();
    }

    // Si hay usuarios, requiere autenticación y rol admin
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Se requiere autenticación para crear usuarios',
      });
    }

    if (req.user.role !== ROLES.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Solo los administradores pueden crear usuarios',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/register - Registro (solo admin puede crear usuarios, o primer usuario)
router.post(
  '/register',
  optionalAuthenticate,
  checkFirstUser,
  validateRegister,
  handleValidationErrors,
  authController.register
);

// POST /api/auth/login - Login
router.post(
  '/login',
  validateLogin,
  handleValidationErrors,
  authController.login
);

// POST /api/auth/refresh - Refrescar token
router.post('/refresh', authController.refresh);

// GET /api/auth/me - Obtener usuario actual
router.get('/me', authenticate, authController.getCurrentUser);

module.exports = router;
