// routes/packages.js

const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

// Ruta para obtener todos los paquetes
router.get('/', packageController.getAllPackages);

// Ruta para obtener un paquete por su ID
router.get('/:id', packageController.getPackageById);

// Ruta para crear un nuevo paquete
router.post('/', packageController.createPackage);

// Ruta para actualizar un paquete
router.put('/:id', packageController.updatePackage);

// Ruta para eliminar un paquete
router.delete('/:id', packageController.deletePackage);

module.exports = router;
