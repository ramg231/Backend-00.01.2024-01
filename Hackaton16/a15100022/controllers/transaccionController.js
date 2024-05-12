// controllers/transaccionController.js

const Transaccion = require('../models/Transaccion');

// Crear una nueva transacción
exports.crearTransaccion = async (req, res) => {
  try {
    const nuevaTransaccion = new Transaccion(req.body);
    await nuevaTransaccion.save();
    res.status(201).json({ mensaje: 'Transacción creada exitosamente', transaccion: nuevaTransaccion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener historial de transacciones de un usuario
exports.obtenerHistorialTransacciones = async (req, res) => {
  try {
    const transacciones = await Transaccion.find({ usuarioId: req.params.id });
    res.status(200).json({ transacciones });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
