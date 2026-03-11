const User = require('../models/User');
const Conductor = require('../models/Conductor');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');
const { AuthenticationError, ValidationError, ConflictError } = require('../utils/errors');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { ROLES } = require('../config/constants');

/**
 * Registra un nuevo usuario
 */
const register = async (userData, createdByAdmin = false) => {
  const { email, password, role = 'conductor', conductorId } = userData;

  // Verificar si el email ya existe
  const existingUser = await User.findOne({ email, deletedAt: null });
  if (existingUser) {
    throw new ConflictError('El email ya está registrado');
  }

  // Si es conductor, verificar que el conductorId existe
  if (role === 'conductor' && conductorId) {
    const conductor = await Conductor.findById(conductorId).notDeleted();
    if (!conductor) {
      throw new ValidationError('Conductor no encontrado');
    }
  }

  // Crear usuario
  const user = new User({
    email,
    password,
    role,
    conductorId: role === 'conductor' ? conductorId : null,
  });

  await user.save();

  // Generar tokens
  const payload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Actualizar lastLogin
  user.lastLogin = new Date();
  await user.save();

  return {
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
      conductorId: user.conductorId,
      isActive: user.isActive,
    },
    accessToken,
    refreshToken,
  };
};

/**
 * Autentica un usuario
 */
const login = async (email, password) => {
  // Buscar usuario con password
  const user = await User.findOne({ email, deletedAt: null }).select('+password');

  if (!user) {
    throw new AuthenticationError('Credenciales inválidas');
  }

  if (!user.isActive) {
    throw new AuthenticationError('Usuario inactivo');
  }

  // Verificar password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new AuthenticationError('Credenciales inválidas');
  }

  // Generar tokens
  const payload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Actualizar lastLogin
  user.lastLogin = new Date();
  await user.save();

  return {
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
      conductorId: user.conductorId,
      isActive: user.isActive,
    },
    accessToken,
    refreshToken,
  };
};

/**
 * Refresca el access token usando un refresh token
 */
const refresh = async (refreshToken) => {
  try {
    // Verificar refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Buscar usuario
    const user = await User.findById(decoded.userId).notDeleted();

    if (!user || !user.isActive) {
      throw new AuthenticationError('Usuario no encontrado o inactivo');
    }

    // Generar nuevo access token
    const payload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);

    return {
      accessToken,
    };
  } catch (error) {
    throw new AuthenticationError('Refresh token inválido o expirado');
  }
};

/**
 * Obtiene el usuario actual
 */
const getCurrentUser = async (userId) => {
  const user = await User.findById(userId)
    .notDeleted()
    .populate('conductorId', 'nombre apellido documento telefono email estado');

  if (!user) {
    throw new AuthenticationError('Usuario no encontrado');
  }

  return user;
};

module.exports = {
  register,
  login,
  refresh,
  getCurrentUser,
};
