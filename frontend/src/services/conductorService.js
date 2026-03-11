import api from './api';

export const conductorService = {
  // Listar conductores
  list: async (params = {}) => {
    const response = await api.get('/conductores', { params });
    return response.data;
  },

  // Obtener conductor por ID
  getById: async (id) => {
    const response = await api.get(`/conductores/${id}`);
    return response.data;
  },

  // Crear conductor
  create: async (conductorData) => {
    const response = await api.post('/conductores', conductorData);
    return response.data;
  },

  // Actualizar conductor
  update: async (id, conductorData) => {
    const response = await api.put(`/conductores/${id}`, conductorData);
    return response.data;
  },

  // Eliminar conductor (soft delete)
  delete: async (id) => {
    const response = await api.delete(`/conductores/${id}`);
    return response.data;
  },

  // Obtener vehículo asignado
  getVehiculoAsignado: async (id) => {
    const response = await api.get(`/conductores/${id}/vehiculo`);
    return response.data;
  },
};
