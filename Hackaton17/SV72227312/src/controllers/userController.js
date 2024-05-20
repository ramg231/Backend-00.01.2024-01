// src/controllers/userController.js
const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // Aquí puedes realizar la validación de los datos recibidos, por ejemplo:
    // if (!firstName || !lastName || !email || !password) {
    //   return res.status(400).json({ message: 'Por favor, proporcione todos los campos.' });
    // }
    
    const newUser = await User.create({ firstName, lastName, email, password });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return res.status(500).json({ message: 'Ocurrió un error al crear el usuario.' });
  }
};

module.exports = {
  createUser,
};