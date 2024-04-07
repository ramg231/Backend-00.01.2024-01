// routes/propietario.routes.js

const express = require('express');
const router = express.Router();
const propietarioController = require('../controllers/propietario.controller');

// Rutas para manejar los propietarios
router.get('/propietarios', propietarioController.getAllPropietarios);
router.post('/propietarios', propietarioController.addPropietario);
router.get('/propietarios/:id', propietarioController.getPropietarioById);
router.put('/propietarios/:id', propietarioController.updatePropietario);
router.delete('/propietarios/:id', propietarioController.deletePropietario);

module.exports = router;
