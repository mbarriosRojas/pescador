const mongoose = require('mongoose');

const viajeSchema = new mongoose.Schema(
  {
    conductor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conductor',
      required: [true, 'El conductor es requerido'],
      index: true,
    },
    vehiculo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehiculo',
      required: [true, 'El vehículo es requerido'],
      index: true,
    },
    fechaInicio: {
      type: Date,
      required: [true, 'La fecha de inicio es requerida'],
      default: Date.now,
      index: true,
      validate: {
        validator: function (v) {
          // No puede ser futura
          return v <= new Date();
        },
        message: 'La fecha de inicio no puede ser futura',
      },
    },
    fechaFin: {
      type: Date,
      validate: {
        validator: function (v) {
          if (!v) return true; // Opcional
          // Debe ser posterior a fechaInicio
          return v >= this.fechaInicio;
        },
        message: 'La fecha de fin debe ser posterior a la fecha de inicio',
      },
    },
    origen: {
      direccion: {
        type: String,
        required: [true, 'La dirección de origen es requerida'],
        trim: true,
        maxlength: [200, 'La dirección no puede exceder 200 caracteres'],
      },
      coordenadas: {
        lat: {
          type: Number,
          min: [-90, 'La latitud debe estar entre -90 y 90'],
          max: [90, 'La latitud debe estar entre -90 y 90'],
        },
        lng: {
          type: Number,
          min: [-180, 'La longitud debe estar entre -180 y 180'],
          max: [180, 'La longitud debe estar entre -180 y 180'],
        },
      },
    },
    destino: {
      direccion: {
        type: String,
        trim: true,
        maxlength: [200, 'La dirección no puede exceder 200 caracteres'],
      },
      coordenadas: {
        lat: {
          type: Number,
          min: [-90, 'La latitud debe estar entre -90 y 90'],
          max: [90, 'La latitud debe estar entre -90 y 90'],
        },
        lng: {
          type: Number,
          min: [-180, 'La longitud debe estar entre -180 y 180'],
          max: [180, 'La longitud debe estar entre -180 y 180'],
        },
      },
    },
    distancia: {
      type: Number,
      default: 0,
      min: [0, 'La distancia no puede ser negativa'],
      validate: {
        validator: function (v) {
          // Distancia razonable en km (máximo 1000 km)
          return v <= 1000;
        },
        message: 'La distancia no puede exceder 1000 km',
      },
    },
    tarifaBase: {
      type: Number,
      default: 0,
      min: [0, 'La tarifa base no puede ser negativa'],
    },
    tarifaPorKm: {
      type: Number,
      default: 0,
      min: [0, 'La tarifa por km no puede ser negativa'],
    },
    ganancia: {
      type: Number,
      default: 0,
      min: [0, 'La ganancia no puede ser negativa'],
    },
    estado: {
      type: String,
      enum: {
        values: ['iniciado', 'completado', 'cancelado'],
        message: 'El estado debe ser: iniciado, completado o cancelado',
      },
      default: 'iniciado',
      index: true,
    },
    observaciones: {
      type: String,
      trim: true,
      maxlength: [500, 'Las observaciones no pueden exceder 500 caracteres'],
    },
  },
  {
    timestamps: true,
  }
);

// Índices compuestos para consultas frecuentes
viajeSchema.index({ conductor: 1, fechaInicio: -1 });
viajeSchema.index({ vehiculo: 1, fechaInicio: -1 });
viajeSchema.index({ estado: 1, fechaInicio: -1 });
viajeSchema.index({ fechaInicio: -1 }); // Para reportes por fecha
viajeSchema.index({ 'origen.coordenadas.lat': 1, 'origen.coordenadas.lng': 1 }); // Para búsquedas geográficas

// Virtual para duración del viaje en minutos
viajeSchema.virtual('duracion').get(function () {
  if (!this.fechaFin || !this.fechaInicio) return null;
  return Math.ceil((this.fechaFin - this.fechaInicio) / (1000 * 60));
});

// Virtual para verificar si está activo
viajeSchema.virtual('estaActivo').get(function () {
  return this.estado === 'iniciado';
});

// Método para calcular ganancia
viajeSchema.methods.calcularGanancia = function () {
  this.ganancia = this.tarifaBase + this.distancia * this.tarifaPorKm;
  return this.ganancia;
};

// Método para finalizar viaje
viajeSchema.methods.finalizar = function (fechaFin, distancia, observaciones) {
  if (this.estado !== 'iniciado') {
    throw new Error('Solo se pueden finalizar viajes iniciados');
  }
  if (fechaFin && fechaFin < this.fechaInicio) {
    throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
  }
  this.fechaFin = fechaFin || new Date();
  if (distancia !== undefined) {
    this.distancia = distancia;
  }
  if (observaciones) {
    this.observaciones = observaciones;
  }
  this.calcularGanancia();
  this.estado = 'completado';
  return this.save();
};

// Método para cancelar viaje
viajeSchema.methods.cancelar = function (observaciones) {
  if (this.estado !== 'iniciado') {
    throw new Error('Solo se pueden cancelar viajes iniciados');
  }
  this.estado = 'cancelado';
  this.fechaFin = new Date();
  if (observaciones) {
    this.observaciones = observaciones;
  }
  // En viajes cancelados, la ganancia es 0
  this.ganancia = 0;
  return this.save();
};

// Pre-save hook para calcular ganancia automáticamente
viajeSchema.pre('save', function (next) {
  // Solo calcular si hay cambios en tarifaBase, tarifaPorKm o distancia
  if (this.isModified('tarifaBase') || this.isModified('tarifaPorKm') || this.isModified('distancia')) {
    this.calcularGanancia();
  }
  next();
});

// Pre-save hook para validar fechaFin
viajeSchema.pre('save', function (next) {
  if (this.fechaFin && this.fechaInicio && this.fechaFin < this.fechaInicio) {
    return next(new Error('La fecha de fin debe ser posterior a la fecha de inicio'));
  }
  next();
});

// Query helper para viajes activos
viajeSchema.query.activos = function () {
  return this.where({ estado: 'iniciado' });
};

// Query helper para viajes completados
viajeSchema.query.completados = function () {
  return this.where({ estado: 'completado' });
};

// Query helper para viajes en rango de fechas
viajeSchema.query.porFecha = function (fechaInicio, fechaFin) {
  const query = {};
  if (fechaInicio) {
    query.fechaInicio = { $gte: new Date(fechaInicio) };
  }
  if (fechaFin) {
    query.fechaInicio = { ...query.fechaInicio, $lte: new Date(fechaFin) };
  }
  return this.where(query);
};

// Configurar toJSON para incluir virtuals
viajeSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

const Viaje = mongoose.model('Viaje', viajeSchema);

module.exports = Viaje;
