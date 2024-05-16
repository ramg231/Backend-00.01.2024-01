// routes/devolucionRoutes.js

const express = require('express');
const router = express.Router();
const devolucionController = require('../controllers/devolucionController');

// Rutas para solicitar una devolución
router.post('/devolucion', devolucionController.solicitarDevolucion);

// Rutas para procesar una devolución
router.put('/devolucion/:devolucionId', devolucionController.procesarDevolucion);

module.exports = router;
