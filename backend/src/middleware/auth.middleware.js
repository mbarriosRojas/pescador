const { verifyAccessToken } = require('../utils/jwt');
const { AuthenticationError } = require('../utils/errors');
const User = require('../models/User');

/**
 * Middleware para autenticar usuarios mediante JWT
 */
const authenticate = async (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Token no proporcionado');
    }

    const token = authHeader.substring(7); // Remover "Bearer "

    // Verificar token
    const decoded = verifyAccessToken(token);

    // Buscar usuario
    const user = await User.findById(decoded.userId).notDeleted().select('+password');

    if (!user || !user.isActive) {
      throw new AuthenticationError('Usuario no encontrado o inactivo');
    }

    // Agregar usuario al request
    req.user = user;
    req.userId = user._id;
    req.userRole = user.role;

    next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

module.exports = { authenticate };
