// routes/raza.routes.js

const express = require('express');
const router = express.Router();
const razaController = require('../controllers/raza.controller');

// Rutas para manejar las razas
router.get('/razas', razaController.getAllRazas);
router.post('/razas', razaController.addRaza);
router.get('/razas/:id', razaController.getRazaById);
router.put('/razas/:id', razaController.updateRaza);
router.delete('/razas/:id', razaController.deleteRaza);

module.exports = router;
