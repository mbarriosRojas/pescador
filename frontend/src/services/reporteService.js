import api from './api';

export const reporteService = {
  // Obtener ganancias
  getGanancias: async (params = {}) => {
    const response = await api.get('/reportes/ganancias', { params });
    return response.data;
  },

  // Obtener historial de viajes
  getHistorialViajes: async (params = {}) => {
    const response = await api.get('/reportes/viajes', { params });
    return response.data;
  },

  // Obtener reporte por conductor
  getReportePorConductor: async (conductorId, params = {}) => {
    const response = await api.get(`/reportes/conductor/${conductorId}`, { params });
    return response.data;
  },

  // Obtener estadísticas generales
  getEstadisticas: async () => {
    const response = await api.get('/reportes/estadisticas');
    return response.data;
  },
};
