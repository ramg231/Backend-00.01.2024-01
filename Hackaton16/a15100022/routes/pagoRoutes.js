// routes/pagoRoutes.js

const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

// Rutas para iniciar el proceso de pago
router.post('/pago', pagoController.iniciarPago);

// Rutas para manejar la respuesta de pago
router.post('/respuesta-pago', pagoController.manejarRespuestaPago);

module.exports = router;
