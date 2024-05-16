// routes/transaccionRoutes.js

const express = require('express');
const router = express.Router();
const transaccionController = require('../controllers/transaccionController');

// Rutas para crear una nueva transacción
router.post('/transaccion', transaccionController.crearTransaccion);

// Rutas para obtener el historial de transacciones de un usuario
router.get('/transacciones/:id', transaccionController.obtenerHistorialTransacciones);

module.exports = router;
