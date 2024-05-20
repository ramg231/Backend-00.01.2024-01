// models/Usuario.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  }
});

// Antes de guardar el usuario en la base de datos, encriptamos la contraseña
usuarioSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas al iniciar sesión
usuarioSchema.methods.compararContraseña = async function(contraseña) {
  return await bcrypt.compare(contraseña, this.contraseña);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
