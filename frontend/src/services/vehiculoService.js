import api from './api';

export const vehiculoService = {
  // Listar vehículos
  list: async (params = {}) => {
    const response = await api.get('/vehiculos', { params });
    return response.data;
  },

  // Obtener vehículo por ID
  getById: async (id) => {
    const response = await api.get(`/vehiculos/${id}`);
    return response.data;
  },

  // Crear vehículo
  create: async (vehiculoData) => {
    const response = await api.post('/vehiculos', vehiculoData);
    return response.data;
  },

  // Actualizar vehículo
  update: async (id, vehiculoData) => {
    const response = await api.put(`/vehiculos/${id}`, vehiculoData);
    return response.data;
  },

  // Eliminar vehículo (soft delete)
  delete: async (id) => {
    const response = await api.delete(`/vehiculos/${id}`);
    return response.data;
  },

  // Asignar vehículo a conductor
  asignar: async (id, conductorId) => {
    const response = await api.post(`/vehiculos/${id}/asignar`, { conductorId });
    return response.data;
  },

  // Desasignar vehículo
  desasignar: async (id) => {
    const response = await api.post(`/vehiculos/${id}/desasignar`);
    return response.data;
  },

  // Listar vehículos disponibles
  listDisponibles: async () => {
    const response = await api.get('/vehiculos/disponibles');
    return response.data;
  },
};
