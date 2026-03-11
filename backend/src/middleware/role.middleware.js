const { AuthorizationError } = require('../utils/errors');

/**
 * Middleware para autorizar por roles
 * @param {Array<String>} allowedRoles - Roles permitidos
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        throw new AuthorizationError('Usuario no autenticado');
      }

      if (!allowedRoles.includes(req.user.role)) {
        throw new AuthorizationError('No tienes permisos para realizar esta acción');
      }

      next();
    } catch (error) {
      if (error instanceof AuthorizationError) {
        return res.status(403).json({
          success: false,
          message: error.message,
        });
      }
      next(error);
    }
  };
};

/**
 * Middleware para verificar que el usuario es el dueño del recurso o es admin
 * @param {Function} getResourceOwnerId - Función que obtiene el ID del dueño del recurso
 */
const authorizeOwner = (getResourceOwnerId) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        throw new AuthorizationError('Usuario no autenticado');
      }

      // Los admins pueden acceder a todo
      if (req.user.role === 'admin') {
        return next();
      }

      // Obtener el ID del dueño del recurso
      const resourceOwnerId = await getResourceOwnerId(req);

      // Verificar que el usuario es el dueño
      if (req.user.conductorId && req.user.conductorId.toString() !== resourceOwnerId.toString()) {
        throw new AuthorizationError('No tienes permisos para acceder a este recurso');
      }

      next();
    } catch (error) {
      if (error instanceof AuthorizationError) {
        return res.status(403).json({
          success: false,
          message: error.message,
        });
      }
      next(error);
    }
  };
};

module.exports = { authorize, authorizeOwner };
