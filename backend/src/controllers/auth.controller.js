const authService = require('../services/auth.service');
const { AuthenticationError } = require('../utils/errors');

/**
 * Registra un nuevo usuario
 */
const register = async (req, res, next) => {
  try {
    const { email, password, role, conductorId } = req.body;
    const createdByAdmin = req.user && req.user.role === 'admin';

    const result = await authService.register(
      { email, password, role, conductorId },
      createdByAdmin
    );

    res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Autentica un usuario
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data: result,
    });
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

/**
 * Refresca el access token
 */
const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AuthenticationError('Refresh token requerido');
    }

    const result = await authService.refresh(refreshToken);

    res.status(200).json({
      success: true,
      message: 'Token refrescado correctamente',
      data: result,
    });
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

/**
 * Obtiene el usuario actual
 */
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refresh,
  getCurrentUser,
};
