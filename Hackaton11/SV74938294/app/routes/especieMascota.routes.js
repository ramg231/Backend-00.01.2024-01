// routes/especieMascota.routes.js

const express = require('express');
const router = express.Router();
const especieMascotaController = require('../controllers/especieMascota.controller');

// Rutas para manejar las especies de mascotas
router.get('/especies', especieMascotaController.getAllEspeciesMascota);
router.post('/especies', especieMascotaController.addEspecieMascota);
router.get('/especies/:id', especieMascotaController.getEspecieMascotaById);
router.put('/especies/:id', especieMascotaController.updateEspecieMascota);
router.delete('/especies/:id', especieMascotaController.deleteEspecieMascota);

module.exports = router;
