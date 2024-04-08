const db = require('../models');
const Color = db.Color;

exports.getAllColores = async (req, res) => {
  try {
    const colores = await Color.findAll();
    res.json(colores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addColor = async (req, res) => {
  const { nombre } = req.body;
  
  try {
    const nuevoColor = await Color.create({ nombre });
    res.status(201).json(nuevoColor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getColorById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const color = await Color.findByPk(id);
    if (!color) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.json(color);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateColor = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  
  try {
    const color = await Color.findByPk(id);
    if (!color) {
      return res.status(404).json({ message: 'Color not found' });
    }
    color.nombre = nombre;
    await color.save();
    res.json(color);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteColor = async (req, res) => {
  const { id } = req.params;
  
  try {
    const color = await Color.findByPk(id);
    if (!color) {
      return res.status(404).json({ message: 'Color not found' });
    }
    await color.destroy();
    res.json({ message: 'Color deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
