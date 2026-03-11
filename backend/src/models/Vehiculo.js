const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema(
  {
    placa: {
      type: String,
      required: [true, 'La placa es requerida'],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
      validate: {
        validator: function (v) {
          // Validar formato de placa (alfanumérico, 5-10 caracteres)
          return /^[A-Z0-9]{5,10}$/.test(v);
        },
        message: 'La placa debe ser alfanumérica y tener entre 5 y 10 caracteres',
      },
    },
    marca: {
      type: String,
      required: [true, 'La marca es requerida'],
      trim: true,
      minlength: [2, 'La marca debe tener al menos 2 caracteres'],
      maxlength: [50, 'La marca no puede exceder 50 caracteres'],
    },
    modelo: {
      type: String,
      required: [true, 'El modelo es requerido'],
      trim: true,
      minlength: [1, 'El modelo debe tener al menos 1 carácter'],
      maxlength: [50, 'El modelo no puede exceder 50 caracteres'],
    },
    año: {
      type: Number,
      required: [true, 'El año es requerido'],
      min: [1900, 'El año debe ser mayor o igual a 1900'],
      max: [new Date().getFullYear() + 1, `El año no puede ser mayor a ${new Date().getFullYear() + 1}`],
      validate: {
        validator: Number.isInteger,
        message: 'El año debe ser un número entero',
      },
    },
    color: {
      type: String,
      trim: true,
      maxlength: [30, 'El color no puede exceder 30 caracteres'],
    },
    tipo: {
      type: String,
      enum: {
        values: ['sedan', 'suv', 'hatchback', 'van'],
        message: 'El tipo debe ser: sedan, suv, hatchback o van',
      },
      default: 'sedan',
    },
    conductorAsignado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conductor',
      default: null,
    },
    estado: {
      type: String,
      enum: {
        values: ['disponible', 'en-uso', 'mantenimiento', 'inactivo'],
        message: 'El estado debe ser: disponible, en-uso, mantenimiento o inactivo',
      },
      default: 'disponible',
      index: true,
    },
    kilometraje: {
      type: Number,
      default: 0,
      min: [0, 'El kilometraje no puede ser negativo'],
      validate: {
        validator: Number.isInteger,
        message: 'El kilometraje debe ser un número entero',
      },
    },
    fechaAdquisicion: {
      type: Date,
      validate: {
        validator: function (v) {
          if (!v) return true; // Opcional
          // No puede ser futura
          return v <= new Date();
        },
        message: 'La fecha de adquisición no puede ser futura',
      },
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Índices
vehiculoSchema.index({ placa: 1 }, { unique: true });
vehiculoSchema.index({ conductorAsignado: 1 });
vehiculoSchema.index({ estado: 1 });
vehiculoSchema.index({ deletedAt: 1 });
vehiculoSchema.index({ tipo: 1 });

// Virtual para marca y modelo completo
vehiculoSchema.virtual('marcaModelo').get(function () {
  return `${this.marca} ${this.modelo}`;
});

// Virtual para verificar si está disponible
vehiculoSchema.virtual('estaDisponible').get(function () {
  return this.estado === 'disponible' && !this.deletedAt;
});

// Método para asignar a conductor
vehiculoSchema.methods.asignarConductor = async function (conductorId) {
  if (this.estado === 'en-uso') {
    throw new Error('No se puede asignar un vehículo que está en uso');
  }
  if (this.estado === 'mantenimiento') {
    throw new Error('No se puede asignar un vehículo en mantenimiento');
  }
  this.conductorAsignado = conductorId;
  if (this.estado === 'disponible') {
    this.estado = 'disponible'; // Mantener disponible hasta que inicie viaje
  }
  return this.save();
};

// Método para desasignar de conductor
vehiculoSchema.methods.desasignarConductor = function () {
  this.conductorAsignado = null;
  if (this.estado !== 'en-uso') {
    this.estado = 'disponible';
  }
  return this.save();
};

// Método para marcar como en uso
vehiculoSchema.methods.marcarEnUso = function () {
  if (this.estado === 'mantenimiento') {
    throw new Error('No se puede usar un vehículo en mantenimiento');
  }
  this.estado = 'en-uso';
  return this.save();
};

// Método para marcar como disponible
vehiculoSchema.methods.marcarDisponible = function () {
  this.estado = 'disponible';
  return this.save();
};

// Método para soft delete
vehiculoSchema.methods.softDelete = function () {
  this.deletedAt = new Date();
  this.estado = 'inactivo';
  if (this.conductorAsignado) {
    this.conductorAsignado = null;
  }
  return this.save();
};

// Método para restaurar
vehiculoSchema.methods.restore = function () {
  this.deletedAt = null;
  if (this.estado === 'inactivo') {
    this.estado = 'disponible';
  }
  return this.save();
};

// Query helper para excluir eliminados
vehiculoSchema.query.notDeleted = function () {
  return this.where({ deletedAt: null });
};

// Query helper para vehículos disponibles
vehiculoSchema.query.disponibles = function () {
  return this.where({ estado: 'disponible', deletedAt: null });
};

// Configurar toJSON para incluir virtuals
vehiculoSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);

module.exports = Vehiculo;
