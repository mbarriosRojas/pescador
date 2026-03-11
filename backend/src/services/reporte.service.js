const Viaje = require('../models/Viaje');
const Conductor = require('../models/Conductor');
const Vehiculo = require('../models/Vehiculo');
const { ESTADOS_VIAJE, ESTADOS_VEHICULO } = require('../config/constants');

/**
 * Calcula ganancias totales con filtros opcionales
 */
const getGanancias = async (filters = {}) => {
  const query = {
    estado: ESTADOS_VIAJE.COMPLETADO,
  };

  if (filters.conductorId) {
    query.conductor = filters.conductorId;
  }

  if (filters.fechaInicio || filters.fechaFin) {
    query.fechaInicio = {};
    if (filters.fechaInicio) {
      query.fechaInicio.$gte = new Date(filters.fechaInicio);
    }
    if (filters.fechaFin) {
      query.fechaInicio.$lte = new Date(filters.fechaFin);
    }
  }

  const viajes = await Viaje.find(query);

  const totalGanancias = viajes.reduce((sum, viaje) => sum + (viaje.ganancia || 0), 0);
  const totalViajes = viajes.length;
  const totalDistancia = viajes.reduce((sum, viaje) => sum + (viaje.distancia || 0), 0);

  return {
    totalGanancias: totalGanancias.toFixed(2),
    totalViajes,
    totalDistancia: totalDistancia.toFixed(2),
    periodo: {
      fechaInicio: filters.fechaInicio || null,
      fechaFin: filters.fechaFin || null,
    },
  };
};

/**
 * Obtiene historial de viajes con filtros
 */
const getHistorialViajes = async (filters = {}) => {
  const query = {};

  if (filters.conductorId) {
    query.conductor = filters.conductorId;
  }

  if (filters.estado) {
    query.estado = filters.estado;
  }

  if (filters.fechaInicio || filters.fechaFin) {
    query.fechaInicio = {};
    if (filters.fechaInicio) {
      query.fechaInicio.$gte = new Date(filters.fechaInicio);
    }
    if (filters.fechaFin) {
      query.fechaInicio.$lte = new Date(filters.fechaFin);
    }
  }

  const viajes = await Viaje.find(query)
    .populate('conductor', 'nombre apellido documento telefono email')
    .populate('vehiculo', 'placa marca modelo año color')
    .sort({ fechaInicio: -1 });

  // Agrupar por estado
  const porEstado = {
    iniciado: viajes.filter((v) => v.estado === ESTADOS_VIAJE.INICIADO).length,
    completado: viajes.filter((v) => v.estado === ESTADOS_VIAJE.COMPLETADO).length,
    cancelado: viajes.filter((v) => v.estado === ESTADOS_VIAJE.CANCELADO).length,
  };

  return {
    viajes,
    resumen: {
      total: viajes.length,
      porEstado,
    },
  };
};

/**
 * Obtiene reporte por conductor
 */
const getReportePorConductor = async (conductorId, filters = {}) => {
  const conductor = await Conductor.findById(conductorId).notDeleted();
  if (!conductor) {
    throw new Error('Conductor no encontrado');
  }

  const query = {
    conductor: conductorId,
  };

  if (filters.fechaInicio || filters.fechaFin) {
    query.fechaInicio = {};
    if (filters.fechaInicio) {
      query.fechaInicio.$gte = new Date(filters.fechaInicio);
    }
    if (filters.fechaFin) {
      query.fechaInicio.$lte = new Date(filters.fechaFin);
    }
  }

  const viajes = await Viaje.find(query)
    .populate('vehiculo', 'placa marca modelo')
    .sort({ fechaInicio: -1 });

  const viajesCompletados = viajes.filter((v) => v.estado === ESTADOS_VIAJE.COMPLETADO);
  const totalGanancias = viajesCompletados.reduce((sum, v) => sum + (v.ganancia || 0), 0);
  const totalDistancia = viajesCompletados.reduce((sum, v) => sum + (v.distancia || 0), 0);

  return {
    conductor: {
      _id: conductor._id,
      nombre: conductor.nombre,
      apellido: conductor.apellido,
      documento: conductor.documento,
      email: conductor.email,
    },
    periodo: {
      fechaInicio: filters.fechaInicio || null,
      fechaFin: filters.fechaFin || null,
    },
    resumen: {
      totalViajes: viajes.length,
      viajesCompletados: viajesCompletados.length,
      viajesCancelados: viajes.filter((v) => v.estado === ESTADOS_VIAJE.CANCELADO).length,
      totalGanancias: totalGanancias.toFixed(2),
      totalDistancia: totalDistancia.toFixed(2),
    },
    viajes,
  };
};

/**
 * Obtiene estadísticas generales
 */
const getEstadisticas = async () => {
  const [
    totalConductores,
    conductoresActivos,
    totalVehiculos,
    vehiculosDisponibles,
    totalViajes,
    viajesCompletados,
    gananciasTotales,
  ] = await Promise.all([
    Conductor.countDocuments({ deletedAt: null }),
    Conductor.countDocuments({ deletedAt: null, estado: 'activo' }),
    Vehiculo.countDocuments({ deletedAt: null }),
    Vehiculo.countDocuments({
      deletedAt: null,
      estado: ESTADOS_VEHICULO.DISPONIBLE,
    }),
    Viaje.countDocuments(),
    Viaje.countDocuments({ estado: ESTADOS_VIAJE.COMPLETADO }),
    Viaje.aggregate([
      { $match: { estado: ESTADOS_VIAJE.COMPLETADO } },
      { $group: { _id: null, total: { $sum: '$ganancia' } } },
    ]),
  ]);

  const ganancias = gananciasTotales.length > 0 ? gananciasTotales[0].total : 0;

  return {
    conductores: {
      total: totalConductores,
      activos: conductoresActivos,
      inactivos: totalConductores - conductoresActivos,
    },
    vehiculos: {
      total: totalVehiculos,
      disponibles: vehiculosDisponibles,
      enUso: await Vehiculo.countDocuments({
        deletedAt: null,
        estado: ESTADOS_VEHICULO.EN_USO,
      }),
      mantenimiento: await Vehiculo.countDocuments({
        deletedAt: null,
        estado: ESTADOS_VEHICULO.MANTENIMIENTO,
      }),
    },
    viajes: {
      total: totalViajes,
      completados: viajesCompletados,
      cancelados: await Viaje.countDocuments({ estado: ESTADOS_VIAJE.CANCELADO }),
      iniciados: await Viaje.countDocuments({ estado: ESTADOS_VIAJE.INICIADO }),
    },
    ganancias: {
      total: ganancias.toFixed(2),
    },
  };
};

module.exports = {
  getGanancias,
  getHistorialViajes,
  getReportePorConductor,
  getEstadisticas,
};
