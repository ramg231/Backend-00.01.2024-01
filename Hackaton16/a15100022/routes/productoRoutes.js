// routes/productoRoutes.js

const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Rutas para obtener la lista de productos
router.get('/productos', productoController.obtenerProductos);

// Rutas para obtener los detalles de un producto específico
router.get('/producto/:id', productoController.obtenerDetallesProducto);

module.exports = router;
