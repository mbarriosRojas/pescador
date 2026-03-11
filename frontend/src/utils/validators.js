// Validaciones de email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validación de password (mínimo 6 caracteres)
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Validación de teléfono (formato básico)
export const validatePhone = (phone) => {
  const re = /^[0-9+\-\s()]+$/;
  return re.test(phone) && phone.replace(/\D/g, '').length >= 7;
};

// Validación de documento (solo números)
export const validateDocument = (document) => {
  const re = /^[0-9]+$/;
  return re.test(document) && document.length >= 7;
};

// Validación de placa (formato alfanumérico)
export const validatePlaca = (placa) => {
  const re = /^[A-Z0-9-]+$/;
  return re.test(placa.toUpperCase()) && placa.length >= 5;
};

// Validación de año
export const validateYear = (year) => {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear + 1;
};

// Validación de fecha
export const validateDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

// Validación de número positivo
export const validatePositiveNumber = (number) => {
  return !isNaN(number) && number >= 0;
};

// Validación de número positivo mayor a cero
export const validatePositiveNumberGreaterThanZero = (number) => {
  return !isNaN(number) && number > 0;
};

// Validación de requerido
export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Validación de fecha de vencimiento (debe ser futura)
export const validateFutureDate = (date) => {
  if (!date) return false;
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj > new Date();
};

// Validación de fecha de expedición (debe ser pasada)
export const validatePastDate = (date) => {
  if (!date) return false;
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj <= new Date();
};

// Validación de que fecha de vencimiento sea mayor que expedición
export const validateExpirationAfterIssue = (expedicion, vencimiento) => {
  if (!expedicion || !vencimiento) return false;
  const expDate = expedicion instanceof Date ? expedicion : new Date(expedicion);
  const venDate = vencimiento instanceof Date ? vencimiento : new Date(vencimiento);
  return venDate > expDate;
};
