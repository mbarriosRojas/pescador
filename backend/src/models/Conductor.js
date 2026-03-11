const mongoose = require('mongoose');

const conductorSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
    },
    apellido: {
      type: String,
      required: [true, 'El apellido es requerido'],
      trim: true,
    },
    documento: {
      type: String,
      required: [true, 'El documento es requerido'],
      unique: true,
      trim: true,
      index: true,
    },
    telefono: {
      type: String,
      required: [true, 'El teléfono es requerido'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un email válido'],
      index: true,
    },
    direccion: {
      type: String,
      trim: true,
    },
    fechaNacimiento: {
      type: Date,
    },
    licencia: {
      numero: {
        type: String,
        required: [true, 'El número de licencia es requerido'],
        unique: true,
        trim: true,
        index: true,
      },
      fechaExpedicion: {
        type: Date,
        required: [true, 'La fecha de expedición es requerida'],
      },
      fechaVencimiento: {
        type: Date,
        required: [true, 'La fecha de vencimiento es requerida'],
        validate: {
          validator: function (value) {
            return value > new Date();
          },
          message: 'La licencia debe estar vigente',
        },
      },
      categoria: {
        type: String,
        required: [true, 'La categoría de licencia es requerida'],
        trim: true,
      },
    },
    vehiculoAsignado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehiculo',
      default: null,
    },
    estado: {
      type: String,
      enum: ['activo', 'inactivo', 'suspendido'],
      default: 'activo',
      index: true,
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
conductorSchema.index({ documento: 1 }, { unique: true });
conductorSchema.index({ 'licencia.numero': 1 }, { unique: true });
conductorSchema.index({ email: 1 }, { unique: true });
conductorSchema.index({ vehiculoAsignado: 1 });
conductorSchema.index({ estado: 1 });
conductorSchema.index({ deletedAt: 1 });

// Virtual para nombre completo
conductorSchema.virtual('nombreCompleto').get(function () {
  return `${this.nombre} ${this.apellido}`;
});

// Método para soft delete
conductorSchema.methods.softDelete = function () {
  this.deletedAt = new Date();
  return this.save();
};

// Método para restaurar
conductorSchema.methods.restore = function () {
  this.deletedAt = null;
  return this.save();
};

// Query helper para excluir eliminados
conductorSchema.query.notDeleted = function () {
  return this.where({ deletedAt: null });
};

// Configurar toJSON
conductorSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

const Conductor = mongoose.model('Conductor', conductorSchema);

module.exports = Conductor;
