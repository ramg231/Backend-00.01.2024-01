// controllers/devolucionController.js

const Devolucion = require('../models/Devolucion');

// Solicitar una devolución
exports.solicitarDevolucion = async (req, res) => {
  try {
    const { transaccionId, motivo } = req.body;

    const nuevaDevolucion = new Devolucion({ transaccionId, motivo, estado: 'pendiente' });
    await nuevaDevolucion.save();

    res.status(201).json({ mensaje: 'Solicitud de devolución registrada exitosamente', devolucion: nuevaDevolucion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Procesar una devolución
exports.procesarDevolucion = async (req, res) => {
  try {
    const { devolucionId } = req.params;

    const devolucion = await Devolucion.findById(devolucionId);
    if (!devolucion) {
      return res.status(404).json({ mensaje: 'Devolución no encontrada' });
    }

    devolucion.estado = 'procesada';
    await devolucion.save();

    res.status(200).json({ mensaje: 'Devolución procesada exitosamente', devolucion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
