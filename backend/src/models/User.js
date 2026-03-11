const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un email válido'],
      index: true,
    },
    password: {
      type: String,
      required: [true, 'La contraseña es requerida'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
      select: false, // No incluir password por defecto en queries
    },
    role: {
      type: String,
      enum: ['admin', 'conductor'],
      required: true,
      default: 'conductor',
    },
    conductorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conductor',
      default: null,
      validate: {
        validator: function (value) {
          // Si es conductor, debe tener conductorId; si es admin, no debe tenerlo
          if (this.role === 'conductor' && !value) {
            return false;
          }
          if (this.role === 'admin' && value) {
            return false;
          }
          return true;
        },
        message: 'El conductorId es requerido para conductores y no permitido para admins',
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Crea createdAt y updatedAt automáticamente
  }
);

// Índices
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ conductorId: 1 });
userSchema.index({ role: 1 });
userSchema.index({ deletedAt: 1 });

// Pre-save hook para hashear password
userSchema.pre('save', async function (next) {
  // Solo hashear si el password fue modificado
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para soft delete
userSchema.methods.softDelete = function () {
  this.deletedAt = new Date();
  return this.save();
};

// Método para restaurar
userSchema.methods.restore = function () {
  this.deletedAt = null;
  return this.save();
};

// Query helper para excluir eliminados
userSchema.query.notDeleted = function () {
  return this.where({ deletedAt: null });
};

// Virtual para obtener el nombre completo (si tiene conductor asociado)
userSchema.virtual('conductor', {
  ref: 'Conductor',
  localField: 'conductorId',
  foreignField: '_id',
  justOne: true,
});

// Configurar toJSON para incluir virtuals
userSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
