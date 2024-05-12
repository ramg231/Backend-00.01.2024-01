const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Nombre de usuario único y requerido
  email: { type: String, required: true, unique: true }, // Correo electrónico único y requerido
  password: { type: String, required: true }, // Contraseña requerida
  // Puedes añadir más campos según sea necesario
});

const User = mongoose.model('User', userSchema);

module.exports = User;