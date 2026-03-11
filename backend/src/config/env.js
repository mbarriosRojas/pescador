require('dotenv').config();

const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
];

// Validar variables de entorno requeridas
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Error: La variable de entorno ${varName} no está definida`);
    process.exit(1);
  }
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '15m',
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '7d',
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 10,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
};
