const viajeService = require('../services/viaje.service');

/**
 * Lista viajes
 */
const listViajes = async (req, res, next) => {
  try {
    const filters = {
      estado: req.query.estado,
      fechaInicio: req.query.fechaInicio,
      fechaFin: req.query.fechaFin,
    };

    const viajes = await viajeService.listViajes(
      req.userRole,
      req.user?.conductorId,
      filters
    );

    res.status(200).json({
      success: true,
      count: viajes.length,
      data: viajes,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene un viaje por ID
 */
const getViajeById = async (req, res, next) => {
  try {
    const viaje = await viajeService.getViajeById(req.params.id);

    res.status(200).json({
      success: true,
      data: viaje,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Inicia un nuevo viaje
 */
const iniciarViaje = async (req, res, next) => {
  try {
    const viaje = await viajeService.iniciarViaje(req.user.conductorId, req.body);

    res.status(201).json({
      success: true,
      message: 'Viaje iniciado correctamente',
      data: viaje,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Finaliza un viaje
 */
const finalizarViaje = async (req, res, next) => {
  try {
    const viaje = await viajeService.finalizarViaje(
      req.params.id,
      req.user.conductorId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: 'Viaje finalizado correctamente',
      data: viaje,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Cancela un viaje
 */
const cancelarViaje = async (req, res, next) => {
  try {
    const viaje = await viajeService.cancelarViaje(req.params.id, req.user.conductorId);

    res.status(200).json({
      success: true,
      message: 'Viaje cancelado correctamente',
      data: viaje,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene viajes de un conductor específico
 */
const getViajesPorConductor = async (req, res, next) => {
  try {
    const filters = {
      estado: req.query.estado,
      fechaInicio: req.query.fechaInicio,
      fechaFin: req.query.fechaFin,
    };

    const viajes = await viajeService.getViajesPorConductor(req.params.conductorId, filters);

    res.status(200).json({
      success: true,
      count: viajes.length,
      data: viajes,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listViajes,
  getViajeById,
  iniciarViaje,
  finalizarViaje,
  cancelarViaje,
  getViajesPorConductor,
};
