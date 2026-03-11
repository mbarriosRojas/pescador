import api from './api';

export const viajeService = {
  // Listar viajes
  list: async (params = {}) => {
    const response = await api.get('/viajes', { params });
    return response.data;
  },

  // Obtener viaje por ID
  getById: async (id) => {
    const response = await api.get(`/viajes/${id}`);
    return response.data;
  },

  // Iniciar viaje
  iniciar: async (viajeData) => {
    const response = await api.post('/viajes/iniciar', viajeData);
    return response.data;
  },

  // Finalizar viaje
  finalizar: async (id, viajeData) => {
    const response = await api.put(`/viajes/${id}/finalizar`, viajeData);
    return response.data;
  },

  // Cancelar viaje
  cancelar: async (id) => {
    const response = await api.put(`/viajes/${id}/cancelar`);
    return response.data;
  },

  // Obtener viajes por conductor
  getByConductor: async (conductorId, params = {}) => {
    const response = await api.get(`/viajes/conductor/${conductorId}`, { params });
    return response.data;
  },
};
