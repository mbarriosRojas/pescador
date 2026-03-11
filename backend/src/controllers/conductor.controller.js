const conductorService = require('../services/conductor.service');

/**
 * Lista conductores
 */
const listConductores = async (req, res, next) => {
  try {
    const conductores = await conductorService.listConductores(
      req.userRole,
      req.user?.conductorId
    );

    res.status(200).json({
      success: true,
      count: conductores.length,
      data: conductores,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene un conductor por ID
 */
const getConductorById = async (req, res, next) => {
  try {
    const conductor = await conductorService.getConductorById(req.params.id);

    res.status(200).json({
      success: true,
      data: conductor,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Crea un nuevo conductor
 */
const createConductor = async (req, res, next) => {
  try {
    const conductor = await conductorService.createConductor(req.body);

    res.status(201).json({
      success: true,
      message: 'Conductor creado correctamente',
      data: conductor,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualiza un conductor
 */
const updateConductor = async (req, res, next) => {
  try {
    const conductor = await conductorService.updateConductor(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Conductor actualizado correctamente',
      data: conductor,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Elimina un conductor
 */
const deleteConductor = async (req, res, next) => {
  try {
    const result = await conductorService.deleteConductor(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene el vehículo asignado a un conductor
 */
const getVehiculoAsignado = async (req, res, next) => {
  try {
    const vehiculo = await conductorService.getVehiculoAsignado(req.params.id);

    res.status(200).json({
      success: true,
      data: vehiculo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listConductores,
  getConductorById,
  createConductor,
  updateConductor,
  deleteConductor,
  getVehiculoAsignado,
};
