// routes/mascota.routes.js

const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascota.controller');

// Rutas para manejar las mascotas
router.get('/mascotas', mascotaController.getAllMascotas);


module.exports = router;
