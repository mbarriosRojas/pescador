const reporteService = require('../services/reporte.service');

/**
 * Obtiene ganancias totales
 */
const getGanancias = async (req, res, next) => {
  try {
    const filters = {
      conductorId: req.query.conductorId,
      fechaInicio: req.query.fechaInicio,
      fechaFin: req.query.fechaFin,
    };

    const result = await reporteService.getGanancias(filters);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene historial de viajes
 */
const getHistorialViajes = async (req, res, next) => {
  try {
    const filters = {
      conductorId: req.query.conductorId,
      estado: req.query.estado,
      fechaInicio: req.query.fechaInicio,
      fechaFin: req.query.fechaFin,
    };

    const result = await reporteService.getHistorialViajes(filters);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene reporte por conductor
 */
const getReportePorConductor = async (req, res, next) => {
  try {
    const filters = {
      fechaInicio: req.query.fechaInicio,
      fechaFin: req.query.fechaFin,
    };

    const result = await reporteService.getReportePorConductor(req.params.conductorId, filters);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene estadísticas generales
 */
const getEstadisticas = async (req, res, next) => {
  try {
    const result = await reporteService.getEstadisticas();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGanancias,
  getHistorialViajes,
  getReportePorConductor,
  getEstadisticas,
};
