const Viaje = require('../models/Viaje');
const Conductor = require('../models/Conductor');
const Vehiculo = require('../models/Vehiculo');
const { NotFoundError, ConflictError, ValidationError } = require('../utils/errors');
const { ESTADOS_VIAJE, ESTADOS_VEHICULO, TARIFA_BASE_DEFAULT, TARIFA_POR_KM_DEFAULT } = require('../config/constants');

/**
 * Lista todos los viajes (admin) o los propios (conductor)
 */
const listViajes = async (userRole, conductorId, filters = {}) => {
  const query = {};

  if (userRole === 'conductor') {
    if (!conductorId) {
      return [];
    }
    query.conductor = conductorId;
  }

  // Filtros opcionales
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

  return await Viaje.find(query)
    .populate('conductor', 'nombre apellido documento telefono email')
    .populate('vehiculo', 'placa marca modelo año color')
    .sort({ fechaInicio: -1 });
};

/**
 * Obtiene un viaje por ID
 */
const getViajeById = async (id) => {
  const viaje = await Viaje.findById(id)
    .populate('conductor', 'nombre apellido documento telefono email estado')
    .populate('vehiculo', 'placa marca modelo año color tipo estado');

  if (!viaje) {
    throw new NotFoundError('Viaje no encontrado');
  }

  return viaje;
};

/**
 * Inicia un nuevo viaje
 */
const iniciarViaje = async (conductorId, viajeData) => {
  const { vehiculoId, origen, tarifaBase, tarifaPorKm } = viajeData;

  // Verificar que el conductor existe
  const conductor = await Conductor.findById(conductorId).notDeleted();
  if (!conductor) {
    throw new NotFoundError('Conductor no encontrado');
  }

  // Verificar que el vehículo existe
  const vehiculo = await Vehiculo.findById(vehiculoId).notDeleted();
  if (!vehiculo) {
    throw new NotFoundError('Vehículo no encontrado');
  }

  // Verificar que el vehículo esté asignado al conductor
  if (!vehiculo.conductorAsignado || vehiculo.conductorAsignado.toString() !== conductorId) {
    throw new ValidationError('El vehículo no está asignado a este conductor');
  }

  // Verificar que no haya un viaje activo para este conductor
  const viajeActivo = await Viaje.findOne({
    conductor: conductorId,
    estado: ESTADOS_VIAJE.INICIADO,
  });

  if (viajeActivo) {
    throw new ConflictError('Ya existe un viaje activo para este conductor');
  }

  // Verificar que el vehículo esté disponible
  if (vehiculo.estado !== ESTADOS_VEHICULO.DISPONIBLE) {
    throw new ValidationError('El vehículo no está disponible');
  }

  // Crear viaje
  const viaje = new Viaje({
    conductor: conductorId,
    vehiculo: vehiculoId,
    origen,
    tarifaBase: tarifaBase || TARIFA_BASE_DEFAULT,
    tarifaPorKm: tarifaPorKm || TARIFA_POR_KM_DEFAULT,
    estado: ESTADOS_VIAJE.INICIADO,
  });

  await viaje.save();

  // Actualizar estado del vehículo
  vehiculo.estado = ESTADOS_VEHICULO.EN_USO;
  await vehiculo.save();

  return await viaje.populate([
    { path: 'conductor', select: 'nombre apellido documento telefono email' },
    { path: 'vehiculo', select: 'placa marca modelo año color' },
  ]);
};

/**
 * Finaliza un viaje
 */
const finalizarViaje = async (viajeId, conductorId, viajeData) => {
  const { destino, distancia } = viajeData;

  const viaje = await Viaje.findById(viajeId);
  if (!viaje) {
    throw new NotFoundError('Viaje no encontrado');
  }

  // Verificar que el viaje pertenece al conductor
  if (viaje.conductor.toString() !== conductorId) {
    throw new ValidationError('Este viaje no pertenece a este conductor');
  }

  // Verificar que el viaje esté iniciado
  if (viaje.estado !== ESTADOS_VIAJE.INICIADO) {
    throw new ValidationError('El viaje no está iniciado');
  }

  // Actualizar viaje
  viaje.destino = destino || viaje.destino;
  viaje.distancia = distancia !== undefined ? distancia : viaje.distancia;
  viaje.fechaFin = new Date();
  viaje.estado = ESTADOS_VIAJE.COMPLETADO;
  // La ganancia se calcula automáticamente en el pre-save hook

  await viaje.save();

  // Actualizar estado del vehículo
  const vehiculo = await Vehiculo.findById(viaje.vehiculo);
  if (vehiculo) {
    vehiculo.estado = ESTADOS_VEHICULO.DISPONIBLE;
    await vehiculo.save();
  }

  return await viaje.populate([
    { path: 'conductor', select: 'nombre apellido documento telefono email' },
    { path: 'vehiculo', select: 'placa marca modelo año color' },
  ]);
};

/**
 * Cancela un viaje
 */
const cancelarViaje = async (viajeId, conductorId) => {
  const viaje = await Viaje.findById(viajeId);
  if (!viaje) {
    throw new NotFoundError('Viaje no encontrado');
  }

  // Verificar que el viaje pertenece al conductor
  if (viaje.conductor.toString() !== conductorId) {
    throw new ValidationError('Este viaje no pertenece a este conductor');
  }

  // Verificar que el viaje esté iniciado
  if (viaje.estado !== ESTADOS_VIAJE.INICIADO) {
    throw new ValidationError('Solo se pueden cancelar viajes iniciados');
  }

  // Actualizar viaje
  viaje.fechaFin = new Date();
  viaje.estado = ESTADOS_VIAJE.CANCELADO;
  await viaje.save();

  // Actualizar estado del vehículo
  const vehiculo = await Vehiculo.findById(viaje.vehiculo);
  if (vehiculo) {
    vehiculo.estado = ESTADOS_VEHICULO.DISPONIBLE;
    await vehiculo.save();
  }

  return await viaje.populate([
    { path: 'conductor', select: 'nombre apellido documento telefono email' },
    { path: 'vehiculo', select: 'placa marca modelo año color' },
  ]);
};

/**
 * Obtiene viajes de un conductor específico
 */
const getViajesPorConductor = async (conductorId, filters = {}) => {
  const conductor = await Conductor.findById(conductorId).notDeleted();
  if (!conductor) {
    throw new NotFoundError('Conductor no encontrado');
  }

  const query = { conductor: conductorId };

  // Filtros opcionales
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

  return await Viaje.find(query)
    .populate('conductor', 'nombre apellido documento telefono email')
    .populate('vehiculo', 'placa marca modelo año color')
    .sort({ fechaInicio: -1 });
};

module.exports = {
  listViajes,
  getViajeById,
  iniciarViaje,
  finalizarViaje,
  cancelarViaje,
  getViajesPorConductor,
};
