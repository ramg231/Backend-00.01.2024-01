// routes/usuarioRoutes.js

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas para el registro de usuarios
router.post('/registro', usuarioController.registrarUsuario);

// Rutas para el inicio de sesión de usuarios
router.post('/inicio-sesion', usuarioController.iniciarSesion);

// Rutas para la actualización del perfil de usuarios
router.put('/perfil/:id', usuarioController.actualizarPerfil);

module.exports = router;
