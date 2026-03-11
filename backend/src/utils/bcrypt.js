const bcrypt = require('bcryptjs');
const config = require('../config/env');

/**
 * Hashea una contraseña
 * @param {String} password - Contraseña a hashear
 * @returns {Promise<String>} Contraseña hasheada
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(config.BCRYPT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

/**
 * Compara una contraseña con un hash
 * @param {String} password - Contraseña en texto plano
 * @param {String} hash - Hash a comparar
 * @returns {Promise<Boolean>} True si coinciden
 */
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
};
