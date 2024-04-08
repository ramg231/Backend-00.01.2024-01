const db = require('../models');
const Propietario = db.Propietario;

exports.getAllPropietarios = async (req, res) => {
  try {
    const propietarios = await Propietario.findAll();
    res.json(propietarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addPropietario = async (req, res) => {
  const { nombre, apellido, direccion, telefono } = req.body;
  
  try {
    const nuevoPropietario = await Propietario.create({ nombre, apellido, direccion, telefono });
    res.status(201).json(nuevoPropietario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPropietarioById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const propietario = await Propietario.findByPk(id);
    if (!propietario) {
      return res.status(404).json({ message: 'Propietario not found' });
    }
    res.json(propietario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePropietario = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, direccion, telefono } = req.body;
  
  try {
    const propietario = await Propietario.findByPk(id);
    if (!propietario) {
      return res.status(404).json({ message: 'Propietario not found' });
    }
    propietario.nombre = nombre;
    propietario.apellido = apellido;
    propietario.direccion = direccion;
    propietario.telefono = telefono;
    await propietario.save();
    res.json(propietario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePropietario = async (req, res) => {
  const { id } = req.params;
  
  try {
    const propietario = await Propietario.findByPk(id);
    if (!propietario) {
      return res.status(404).json({ message: 'Propietario not found' });
    }
    await propietario.destroy();
    res.json({ message: 'Propietario deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
