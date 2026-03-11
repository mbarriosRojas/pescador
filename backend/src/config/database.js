const mongoose = require('mongoose');

/**
 * Conecta a la base de datos MongoDB usando Mongoose
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taxi-admin';

    const options = {
      // Opciones de conexión recomendadas
      maxPoolSize: 10, // Mantener hasta 10 conexiones en el pool
      serverSelectionTimeoutMS: 5000, // Tiempo de espera para seleccionar servidor
      socketTimeoutMS: 45000, // Cerrar sockets después de 45 segundos de inactividad
    };

    const conn = await mongoose.connect(mongoURI, options);

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);

    // Manejo de eventos de conexión
    mongoose.connection.on('error', (err) => {
      console.error('❌ Error de conexión a MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB desconectado');
    });

    // Manejo de cierre graceful
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB conexión cerrada debido a terminación de la aplicación');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    // En producción, podrías querer reintentar la conexión
    process.exit(1);
  }
};

/**
 * Desconecta de la base de datos MongoDB
 * @returns {Promise<void>}
 */
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB desconectado correctamente');
  } catch (error) {
    console.error('Error al desconectar de MongoDB:', error.message);
    throw error;
  }
};

module.exports = {
  connectDB,
  disconnectDB,
};
