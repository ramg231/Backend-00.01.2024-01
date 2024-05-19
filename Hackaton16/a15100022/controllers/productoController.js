// controllers/productoController.js

const Producto = require('../models/Producto');

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json({ productos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener detalles de un producto específico
exports.obtenerDetallesProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.status(200).json({ producto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
