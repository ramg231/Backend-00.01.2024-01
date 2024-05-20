// controllers/usuarioController.js

const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Registro de un nuevo usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Inicio de sesión de un usuario existente
exports.iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario || !usuario.compararContraseña(password)) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar token de sesión
    const token = jwt.sign({ userId: usuario._id }, 'secreto'); // Cambiar 'secreto' por tu propia clave secreta

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualización del perfil de un usuario
exports.actualizarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizacion = req.body;

    // Verificar si el usuario a actualizar existe
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Actualizar el perfil del usuario
    await Usuario.findByIdAndUpdate(id, actualizacion);

    res.status(200).json({ mensaje: 'Perfil de usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
