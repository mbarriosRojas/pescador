const jwt = require('jsonwebtoken');
const config = require('../config/env');

/**
 * Genera un access token JWT
 * @param {Object} payload - Datos a incluir en el token
 * @returns {String} Access token
 */
const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  });
};

/**
 * Genera un refresh token JWT
 * @param {Object} payload - Datos a incluir en el token
 * @returns {String} Refresh token
 */
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRE,
  });
};

/**
 * Verifica y decodifica un access token
 * @param {String} token - Token a verificar
 * @returns {Object} Payload decodificado
 */
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};

/**
 * Verifica y decodifica un refresh token
 * @param {String} token - Token a verificar
 * @returns {Object} Payload decodificado
 */
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error('Refresh token inválido o expirado');
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
