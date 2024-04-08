const db = require('../models');
const Sexo = db.Sexo;

exports.getAllSexos = async (req, res) => {
  try {
    const sexos = await Sexo.findAll();
    res.json(sexos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addSexo = async (req, res) => {
  const { nombre } = req.body;
  
  try {
    const nuevoSexo = await Sexo.create({ nombre });
    res.status(201).json(nuevoSexo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSexoById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const sexo = await Sexo.findByPk(id);
    if (!sexo) {
      return res.status(404).json({ message: 'Sexo not found' });
    }
    res.json(sexo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSexo = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  
  try {
    const sexo = await Sexo.findByPk(id);
    if (!sexo) {
      return res.status(404).json({ message: 'Sexo not found' });
    }
    sexo.nombre = nombre;
    await sexo.save();
    res.json(sexo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSexo = async (req, res) => {
  const { id } = req.params;
  
  try {
    const sexo = await Sexo.findByPk(id);
    if (!sexo) {
      return res.status(404).json({ message: 'Sexo not found' });
    }
    await sexo.destroy();
    res.json({ message: 'Sexo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
