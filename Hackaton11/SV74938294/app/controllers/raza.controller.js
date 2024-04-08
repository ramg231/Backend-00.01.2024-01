const db = require('../models');
const Raza = db.Raza;

exports.getAllRazas = async (req, res) => {
  try {
    const razas = await Raza.findAll();
    res.json(razas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addRaza = async (req, res) => {
  const { nombre } = req.body;
  
  try {
    const nuevaRaza = await Raza.create({ nombre });
    res.status(201).json(nuevaRaza);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRazaById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const raza = await Raza.findByPk(id);
    if (!raza) {
      return res.status(404).json({ message: 'Raza not found' });
    }
    res.json(raza);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRaza = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  
  try {
    const raza = await Raza.findByPk(id);
    if (!raza) {
      return res.status(404).json({ message: 'Raza not found' });
    }
    raza.nombre = nombre;
    await raza.save();
    res.json(raza);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRaza = async (req, res) => {
  const { id } = req.params;
  
  try {
    const raza = await Raza.findByPk(id);
    if (!raza) {
      return res.status(404).json({ message: 'Raza not found' });
    }
    await raza.destroy();
    res.json({ message: 'Raza deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
