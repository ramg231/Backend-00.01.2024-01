// models/Devolucion.js

const mongoose = require('mongoose');

const devolucionSchema = new mongoose.Schema({
  transaccionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaccion',
    required: true
  },
  motivo: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'procesada'],
    default: 'pendiente'
  }
});

module.exports = mongoose.model('Devolucion', devolucionSchema);
