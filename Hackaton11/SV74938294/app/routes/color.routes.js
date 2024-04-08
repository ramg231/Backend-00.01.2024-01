// routes/color.routes.js

const express = require('express');
const router = express.Router();
const colorController = require('../controllers/color.controller');

// Rutas para manejar los colores
router.get('/colores', colorController.getAllColores);
router.post('/colores', colorController.addColor);
router.get('/colores/:id', colorController.getColorById);
router.put('/colores/:id', colorController.updateColor);
router.delete('/colores/:id', colorController.deleteColor);

module.exports = router;
