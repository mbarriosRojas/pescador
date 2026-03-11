const vehiculoService = require('../services/vehiculo.service');

/**
 * Lista vehículos
 */
const listVehiculos = async (req, res, next) => {
  try {
    const vehiculos = await vehiculoService.listVehiculos(
      req.userRole,
      req.user?.conductorId
    );

    res.status(200).json({
      success: true,
      count: vehiculos.length,
      data: vehiculos,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene un vehículo por ID
 */
const getVehiculoById = async (req, res, next) => {
  try {
    const vehiculo = await vehiculoService.getVehiculoById(req.params.id);

    res.status(200).json({
      success: true,
      data: vehiculo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Crea un nuevo vehículo
 */
const createVehiculo = async (req, res, next) => {
  try {
    const vehiculo = await vehiculoService.createVehiculo(req.body);

    res.status(201).json({
      success: true,
      message: 'Vehículo creado correctamente',
      data: vehiculo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualiza un vehículo
 */
const updateVehiculo = async (req, res, next) => {
  try {
    const vehiculo = await vehiculoService.updateVehiculo(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Vehículo actualizado correctamente',
      data: vehiculo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Elimina un vehículo
 */
const deleteVehiculo = async (req, res, next) => {
  try {
    const result = await vehiculoService.deleteVehiculo(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Asigna un vehículo a un conductor
 */
const asignarVehiculo = async (req, res, next) => {
  try {
    const { conductorId } = req.body;
    const vehiculo = await vehiculoService.asignarVehiculo(req.params.id, conductorId);

    res.status(200).json({
      success: true,
      message: 'Vehículo asignado correctamente',
      data: vehiculo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Desasigna un vehículo de un conductor
 */
const desasignarVehiculo = async (req, res, next) => {
  try {
    const result = await vehiculoService.desasignarVehiculo(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Lista vehículos disponibles
 */
const listVehiculosDisponibles = async (req, res, next) => {
  try {
    const vehiculos = await vehiculoService.listVehiculosDisponibles();

    res.status(200).json({
      success: true,
      count: vehiculos.length,
      data: vehiculos,
    });
  } catch (error) {
    next(error);
  }
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
