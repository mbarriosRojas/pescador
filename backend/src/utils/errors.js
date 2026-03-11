/**
 * Clase base para errores personalizados
 */
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error de validación (400)
 */
class ValidationError extends AppError {
  constructor(message = 'Error de validación') {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

/**
 * Error de autenticación (401)
 */
class AuthenticationError extends AppError {
  constructor(message = 'No autenticado') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

/**
 * Error de autorización (403)
 */
class AuthorizationError extends AppError {
  constructor(message = 'No autorizado') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

/**
 * Error de recurso no encontrado (404)
 */
class NotFoundError extends AppError {
  constructor(message = 'Recurso no encontrado') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Error de conflicto (409)
 */
class ConflictError extends AppError {
  constructor(message = 'Conflicto con el estado actual del recurso') {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

module.exports = {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
};
