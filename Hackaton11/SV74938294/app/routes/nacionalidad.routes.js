// routes/nacionalidad.routes.js

const express = require('express');
const router = express.Router();
const nacionalidadController = require('../controllers/nacionalidad.controller');

// Rutas para manejar las nacionalidades
router.get('/nacionalidades', nacionalidadController.getAllNacionalidades);
router.post('/nacionalidades', nacionalidadController.addNacionalidad);
router.get('/nacionalidades/:id', nacionalidadController.getNacionalidadById);
router.put('/nacionalidades/:id', nacionalidadController.updateNacionalidad);
router.delete('/nacionalidades/:id', nacionalidadController.deleteNacionalidad);

module.exports = router;
