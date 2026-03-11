module.exports = {
  ROLES: {
    ADMIN: 'admin',
    CONDUCTOR: 'conductor',
  },
  ESTADOS_CONDUCTOR: {
    ACTIVO: 'activo',
    INACTIVO: 'inactivo',
    SUSPENDIDO: 'suspendido',
  },
  ESTADOS_VEHICULO: {
    DISPONIBLE: 'disponible',
    EN_USO: 'en-uso',
    MANTENIMIENTO: 'mantenimiento',
    INACTIVO: 'inactivo',
  },
  ESTADOS_VIAJE: {
    INICIADO: 'iniciado',
    COMPLETADO: 'completado',
    CANCELADO: 'cancelado',
  },
  TIPOS_VEHICULO: {
    SEDAN: 'sedan',
    SUV: 'suv',
    HATCHBACK: 'hatchback',
    VAN: 'van',
  },
  TARIFA_BASE_DEFAULT: 5.0,
  TARIFA_POR_KM_DEFAULT: 1.5,
};
