// models/Pago.js

const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  transaccionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaccion',
    required: true
  },
  monto: {
    type: Number,
    required: true
  },
  metodoPago: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Pago', pagoSchema);
