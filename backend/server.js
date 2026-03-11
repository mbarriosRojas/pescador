const app = require('./src/app');
const connectDB = require('./src/config/database');
const config = require('./src/config/env');

// Conectar a la base de datos
connectDB();

// Iniciar servidor
const PORT = config.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Entorno: ${config.NODE_ENV}`);
  console.log(`CORS origin: ${config.CORS_ORIGIN}`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('Error no manejado:', err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM recibido. Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado');
  });
});
