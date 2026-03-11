const { body } = require('express-validator');

/**
 * Validaciones para registro de usuario
 */
const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('role')
    .optional()
    .isIn(['admin', 'conductor'])
    .withMessage('El rol debe ser admin o conductor'),
];

/**
 * Validaciones para login
 */
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida'),
];

/**
 * Validaciones para crear conductor
 */
const validateCreateConductor = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido'),
  body('apellido')
    .trim()
    .notEmpty()
    .withMessage('El apellido es requerido'),
  body('documento')
    .trim()
    .notEmpty()
    .withMessage('El documento es requerido'),
  body('telefono')
    .trim()
    .notEmpty()
    .withMessage('El teléfono es requerido'),
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('licencia.numero')
    .trim()
    .notEmpty()
    .withMessage('El número de licencia es requerido'),
  body('licencia.fechaExpedicion')
    .isISO8601()
    .withMessage('La fecha de expedición debe ser válida'),
  body('licencia.fechaVencimiento')
    .isISO8601()
    .withMessage('La fecha de vencimiento debe ser válida')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('La licencia debe estar vigente');
      }
      return true;
    }),
  body('licencia.categoria')
    .trim()
    .notEmpty()
    .withMessage('La categoría de licencia es requerida'),
];

/**
 * Validaciones para actualizar conductor
 */
const validateUpdateConductor = [
  body('nombre')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre no puede estar vacío'),
  body('apellido')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El apellido no puede estar vacío'),
  body('telefono')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El teléfono no puede estar vacío'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
];

/**
 * Validaciones para crear vehículo
 */
const validateCreateVehiculo = [
  body('placa')
    .trim()
    .notEmpty()
    .withMessage('La placa es requerida')
    .toUpperCase(),
  body('marca')
    .trim()
    .notEmpty()
    .withMessage('La marca es requerida'),
  body('modelo')
    .trim()
    .notEmpty()
    .withMessage('El modelo es requerido'),
  body('año')
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage('El año debe ser válido'),
  body('tipo')
    .optional()
    .isIn(['sedan', 'suv', 'hatchback', 'van'])
    .withMessage('El tipo de vehículo no es válido'),
  body('estado')
    .optional()
    .isIn(['disponible', 'en-uso', 'mantenimiento', 'inactivo'])
    .withMessage('El estado no es válido'),
];

/**
 * Validaciones para actualizar vehículo
 */
const validateUpdateVehiculo = [
  body('marca')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La marca no puede estar vacía'),
  body('modelo')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El modelo no puede estar vacío'),
  body('año')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage('El año debe ser válido'),
  body('tipo')
    .optional()
    .isIn(['sedan', 'suv', 'hatchback', 'van'])
    .withMessage('El tipo de vehículo no es válido'),
  body('estado')
    .optional()
    .isIn(['disponible', 'en-uso', 'mantenimiento', 'inactivo'])
    .withMessage('El estado no es válido'),
];

/**
 * Validaciones para asignar vehículo
 */
const validateAsignarVehiculo = [
  body('conductorId')
    .notEmpty()
    .withMessage('El ID del conductor es requerido')
    .isMongoId()
    .withMessage('El ID del conductor debe ser válido'),
];

/**
 * Validaciones para iniciar viaje
 */
const validateIniciarViaje = [
  body('vehiculoId')
    .notEmpty()
    .withMessage('El ID del vehículo es requerido')
    .isMongoId()
    .withMessage('El ID del vehículo debe ser válido'),
  body('origen.direccion')
    .trim()
    .notEmpty()
    .withMessage('La dirección de origen es requerida'),
  body('tarifaBase')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('La tarifa base debe ser un número positivo'),
  body('tarifaPorKm')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('La tarifa por km debe ser un número positivo'),
];

/**
 * Validaciones para finalizar viaje
 */
const validateFinalizarViaje = [
  body('destino.direccion')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La dirección de destino no puede estar vacía'),
  body('distancia')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('La distancia debe ser un número positivo'),
];

module.exports = {
  validateRegister,
  validateLogin,
  validateCreateConductor,
  validateUpdateConductor,
  validateCreateVehiculo,
  validateUpdateVehiculo,
  validateAsignarVehiculo,
  validateIniciarViaje,
  validateFinalizarViaje,
};
