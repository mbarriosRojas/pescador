const Conductor = require('../models/Conductor');
const User = require('../models/User');
const Vehiculo = require('../models/Vehiculo');
const { NotFoundError, ConflictError, ValidationError } = require('../utils/errors');

/**
 * Lista todos los conductores (admin) o el propio (conductor)
 */
const listConductores = async (userRole, conductorId) => {
  if (userRole === 'admin') {
    return await Conductor.find({ deletedAt: null })
      .populate('vehiculoAsignado', 'placa marca modelo estado')
      .sort({ createdAt: -1 });
  } else {
    // Conductor solo puede ver su propio perfil
    if (!conductorId) {
      throw new NotFoundError('Conductor no encontrado');
    }
    return await Conductor.findById(conductorId)
      .notDeleted()
      .populate('vehiculoAsignado', 'placa marca modelo estado');
  }
};

/**
 * Obtiene un conductor por ID
 */
const getConductorById = async (id) => {
  const conductor = await Conductor.findById(id)
    .notDeleted()
    .populate('vehiculoAsignado', 'placa marca modelo año color tipo estado');

  if (!conductor) {
    throw new NotFoundError('Conductor no encontrado');
  }

  return conductor;
};

/**
 * Crea un nuevo conductor
 */
const createConductor = async (conductorData) => {
  // Verificar email único
  const existingEmail = await Conductor.findOne({
    email: conductorData.email,
    deletedAt: null,
  });
  if (existingEmail) {
    throw new ConflictError('El email ya está registrado');
  }

  // Verificar documento único
  const existingDoc = await Conductor.findOne({
    documento: conductorData.documento,
    deletedAt: null,
  });
  if (existingDoc) {
    throw new ConflictError('El documento ya está registrado');
  }

  // Verificar licencia única
  const existingLicencia = await Conductor.findOne({
    'licencia.numero': conductorData.licencia.numero,
    deletedAt: null,
  });
  if (existingLicencia) {
    throw new ConflictError('El número de licencia ya está registrado');
  }

  // Verificar que la licencia esté vigente
  if (new Date(conductorData.licencia.fechaVencimiento) <= new Date()) {
    throw new ValidationError('La licencia debe estar vigente');
  }

  const conductor = new Conductor(conductorData);
  await conductor.save();

  return conductor;
};

/**
 * Actualiza un conductor
 */
const updateConductor = async (id, updateData) => {
  const conductor = await Conductor.findById(id).notDeleted();

  if (!conductor) {
    throw new NotFoundError('Conductor no encontrado');
  }

  // Si se actualiza el email, verificar que sea único
  if (updateData.email && updateData.email !== conductor.email) {
    const existingEmail = await Conductor.findOne({
      email: updateData.email,
      deletedAt: null,
      _id: { $ne: id },
    });
    if (existingEmail) {
      throw new ConflictError('El email ya está registrado');
    }
  }

  // Si se actualiza la licencia, verificar que esté vigente
  if (updateData.licencia?.fechaVencimiento) {
    if (new Date(updateData.licencia.fechaVencimiento) <= new Date()) {
      throw new ValidationError('La licencia debe estar vigente');
    }
  }

  Object.assign(conductor, updateData);
  await conductor.save();

  return conductor;
};

/**
 * Elimina un conductor (soft delete)
 */
const deleteConductor = async (id) => {
  const conductor = await Conductor.findById(id).notDeleted();

  if (!conductor) {
    throw new NotFoundError('Conductor no encontrado');
  }

  // Si tiene vehículo asignado, desasignarlo
  if (conductor.vehiculoAsignado) {
    const vehiculo = await Vehiculo.findById(conductor.vehiculoAsignado);
    if (vehiculo) {
      vehiculo.conductorAsignado = null;
      vehiculo.estado = 'disponible';
      await vehiculo.save();
    }
  }

  // Soft delete del conductor
  await conductor.softDelete();

  // Soft delete del usuario asociado si existe
  const user = await User.findOne({ conductorId: id, deletedAt: null });
  if (user) {
    await user.softDelete();
  }

  return { message: 'Conductor eliminado correctamente' };
};

/**
 * Obtiene el vehículo asignado a un conductor
 */
const getVehiculoAsignado = async (conductorId) => {
  const conductor = await Conductor.findById(conductorId)
    .notDeleted()
    .populate('vehiculoAsignado');

  if (!conductor) {
    throw new NotFoundError('Conductor no encontrado');
  }

  if (!conductor.vehiculoAsignado) {
    throw new NotFoundError('El conductor no tiene vehículo asignado');
  }

  return conductor.vehiculoAsignado;
};

module.exports = {
  listConductores,
  getConductorById,
  createConductor,
  updateConductor,
  deleteConductor,
  getVehiculoAsignado,
};
