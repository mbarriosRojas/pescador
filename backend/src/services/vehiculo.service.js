const Vehiculo = require('../models/Vehiculo');
const Conductor = require('../models/Conductor');
const { NotFoundError, ConflictError, ValidationError } = require('../utils/errors');
const { ESTADOS_VEHICULO } = require('../config/constants');

/**
 * Lista todos los vehículos (admin) o el asignado (conductor)
 */
const listVehiculos = async (userRole, conductorId) => {
  if (userRole === 'admin') {
    return await Vehiculo.find({ deletedAt: null })
      .populate('conductorAsignado', 'nombre apellido documento telefono email')
      .sort({ createdAt: -1 });
  } else {
    // Conductor solo puede ver su vehículo asignado
    if (!conductorId) {
      return [];
    }
    const conductor = await Conductor.findById(conductorId).notDeleted();
    if (!conductor || !conductor.vehiculoAsignado) {
      return [];
    }
    return await Vehiculo.findById(conductor.vehiculoAsignado)
      .notDeleted()
      .populate('conductorAsignado', 'nombre apellido documento telefono email');
  }
};

/**
 * Obtiene un vehículo por ID
 */
const getVehiculoById = async (id) => {
  const vehiculo = await Vehiculo.findById(id)
    .notDeleted()
    .populate('conductorAsignado', 'nombre apellido documento telefono email estado');

  if (!vehiculo) {
    throw new NotFoundError('Vehículo no encontrado');
  }

  return vehiculo;
};

/**
 * Crea un nuevo vehículo
 */
const createVehiculo = async (vehiculoData) => {
  // Verificar placa única
  const existingPlaca = await Vehiculo.findOne({
    placa: vehiculoData.placa.toUpperCase(),
    deletedAt: null,
  });
  if (existingPlaca) {
    throw new ConflictError('La placa ya está registrada');
  }

  // Normalizar placa a mayúsculas
  vehiculoData.placa = vehiculoData.placa.toUpperCase();

  const vehiculo = new Vehiculo(vehiculoData);
  await vehiculo.save();

  return vehiculo;
};

/**
 * Actualiza un vehículo
 */
const updateVehiculo = async (id, updateData) => {
  const vehiculo = await Vehiculo.findById(id).notDeleted();

  if (!vehiculo) {
    throw new NotFoundError('Vehículo no encontrado');
  }

  // Si se actualiza la placa, verificar que sea única
  if (updateData.placa && updateData.placa.toUpperCase() !== vehiculo.placa) {
    const existingPlaca = await Vehiculo.findOne({
      placa: updateData.placa.toUpperCase(),
      deletedAt: null,
      _id: { $ne: id },
    });
    if (existingPlaca) {
      throw new ConflictError('La placa ya está registrada');
    }
    updateData.placa = updateData.placa.toUpperCase();
  }

  Object.assign(vehiculo, updateData);
  await vehiculo.save();

  return vehiculo;
};

/**
 * Elimina un vehículo (soft delete)
 */
const deleteVehiculo = async (id) => {
  const vehiculo = await Vehiculo.findById(id).notDeleted();

  if (!vehiculo) {
    throw new NotFoundError('Vehículo no encontrado');
  }

  // Si tiene conductor asignado, desasignarlo
  if (vehiculo.conductorAsignado) {
    const conductor = await Conductor.findById(vehiculo.conductorAsignado);
    if (conductor) {
      conductor.vehiculoAsignado = null;
      await conductor.save();
    }
  }

  // Soft delete del vehículo
  await vehiculo.softDelete();

  return { message: 'Vehículo eliminado correctamente' };
};

/**
 * Asigna un vehículo a un conductor
 */
const asignarVehiculo = async (vehiculoId, conductorId) => {
  const vehiculo = await Vehiculo.findById(vehiculoId).notDeleted();
  if (!vehiculo) {
    throw new NotFoundError('Vehículo no encontrado');
  }

  const conductor = await Conductor.findById(conductorId).notDeleted();
  if (!conductor) {
    throw new NotFoundError('Conductor no encontrado');
  }

  // Verificar que el vehículo no esté asignado a otro conductor
  if (vehiculo.conductorAsignado && vehiculo.conductorAsignado.toString() !== conductorId) {
    throw new ConflictError('El vehículo ya está asignado a otro conductor');
  }

  // Verificar que el conductor no tenga otro vehículo asignado
  if (conductor.vehiculoAsignado && conductor.vehiculoAsignado.toString() !== vehiculoId) {
    throw new ConflictError('El conductor ya tiene otro vehículo asignado');
  }

  // Verificar que el vehículo esté disponible o en-uso
  if (vehiculo.estado === 'mantenimiento' || vehiculo.estado === 'inactivo') {
    throw new ValidationError('No se puede asignar un vehículo en mantenimiento o inactivo');
  }

  // Asignar vehículo al conductor
  vehiculo.conductorAsignado = conductorId;
  vehiculo.estado = vehiculo.estado === 'disponible' ? 'disponible' : vehiculo.estado;
  await vehiculo.save();

  // Asignar conductor al vehículo
  conductor.vehiculoAsignado = vehiculoId;
  await conductor.save();

  return vehiculo;
};

/**
 * Desasigna un vehículo de un conductor
 */
const desasignarVehiculo = async (vehiculoId) => {
  const vehiculo = await Vehiculo.findById(vehiculoId).notDeleted();
  if (!vehiculo) {
    throw new NotFoundError('Vehículo no encontrado');
  }

  if (!vehiculo.conductorAsignado) {
    throw new ValidationError('El vehículo no tiene conductor asignado');
  }

  const conductorId = vehiculo.conductorAsignado;

  // Desasignar del vehículo
  vehiculo.conductorAsignado = null;
  vehiculo.estado = ESTADOS_VEHICULO.DISPONIBLE;
  await vehiculo.save();

  // Desasignar del conductor
  const conductor = await Conductor.findById(conductorId);
  if (conductor) {
    conductor.vehiculoAsignado = null;
    await conductor.save();
  }

  return { message: 'Vehículo desasignado correctamente' };
};

/**
 * Lista vehículos disponibles
 */
const listVehiculosDisponibles = async () => {
  return await Vehiculo.find({
    deletedAt: null,
    estado: ESTADOS_VEHICULO.DISPONIBLE,
    conductorAsignado: null,
  })
    .populate('conductorAsignado', 'nombre apellido')
    .sort({ createdAt: -1 });
};

module.exports = {
  listVehiculos,
  getVehiculoById,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
  asignarVehiculo,
  desasignarVehiculo,
  listVehiculosDisponibles,
};
