export const ROLES = {
  ADMIN: 'admin',
  CONDUCTOR: 'conductor',
};

export const ESTADOS_CONDUCTOR = {
  ACTIVO: 'activo',
  INACTIVO: 'inactivo',
  SUSPENDIDO: 'suspendido',
};

export const ESTADOS_VEHICULO = {
  DISPONIBLE: 'disponible',
  EN_USO: 'en-uso',
  MANTENIMIENTO: 'mantenimiento',
  INACTIVO: 'inactivo',
};

export const ESTADOS_VIAJE = {
  INICIADO: 'iniciado',
  COMPLETADO: 'completado',
  CANCELADO: 'cancelado',
};

export const TIPOS_VEHICULO = {
  SEDAN: 'sedan',
  SUV: 'suv',
  HATCHBACK: 'hatchback',
  VAN: 'van',
};

export const TARIFA_BASE = 5000; // Tarifa base en pesos
export const TARIFA_POR_KM = 1000; // Tarifa por kilómetro en pesos

export const RUTAS = {
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_CONDUCTORES: '/admin/conductores',
  ADMIN_VEHICULOS: '/admin/vehiculos',
  ADMIN_VIAJES: '/admin/viajes',
  ADMIN_REPORTES: '/admin/reportes',
  CONDUCTOR_DASHBOARD: '/conductor/dashboard',
  CONDUCTOR_VIAJES: '/conductor/viajes',
};
