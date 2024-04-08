// routes/sexo.routes.js

const express = require('express');
const router = express.Router();
const sexoController = require('../controllers/sexo.controller');

// Rutas para manejar los sexos
router.get('/sexos', sexoController.getAllSexos);
router.post('/sexos', sexoController.addSexo);
router.get('/sexos/:id', sexoController.getSexoById);
router.put('/sexos/:id', sexoController.updateSexo);
router.delete('/sexos/:id', sexoController.deleteSexo);

module.exports = router;
