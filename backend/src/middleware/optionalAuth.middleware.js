const { verifyAccessToken } = require('../utils/jwt');
const User = require('../models/User');

/**
 * Middleware opcional de autenticación
 * Si hay token, verifica y agrega usuario al request
 * Si no hay token, continúa sin error
 */
const optionalAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No hay token, continuar sin autenticación
      return next();
    }

    const token = authHeader.substring(7);

    try {
      const decoded = verifyAccessToken(token);
      const user = await User.findById(decoded.userId).notDeleted().select('+password');

      if (user && user.isActive) {
        req.user = user;
        req.userId = user._id;
        req.userRole = user.role;
      }
    } catch (error) {
      // Token inválido, continuar sin autenticación
    }

    next();
  } catch (error) {
    next();
  }
};

module.exports = { optionalAuthenticate };
