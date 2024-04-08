const db = require('../models');
const Nacionalidad = db.Nacionalidad;

exports.getAllNacionalidades = async (req, res) => {
  try {
    const nacionalidades = await Nacionalidad.findAll();
    res.json(nacionalidades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addNacionalidad = async (req, res) => {
  const { nombre } = req.body;
  
  try {
    const nuevaNacionalidad = await Nacionalidad.create({ nombre });
    res.status(201).json(nuevaNacionalidad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNacionalidadById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const nacionalidad = await Nacionalidad.findByPk(id);
    if (!nacionalidad) {
      return res.status(404).json({ message: 'Nacionalidad not found' });
    }
    res.json(nacionalidad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNacionalidad = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  
  try {
    const nacionalidad = await Nacionalidad.findByPk(id);
    if (!nacionalidad) {
      return res.status(404).json({ message: 'Nacionalidad not found' });
    }
    nacionalidad.nombre = nombre;
    await nacionalidad.save();
    res.json(nacionalidad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNacionalidad = async (req, res) => {
  const { id } = req.params;
  
  try {
    const nacionalidad = await Nacionalidad.findByPk(id);
    if (!nacionalidad) {
      return res.status(404).json({ message: 'Nacionalidad not found' });
    }
    await nacionalidad.destroy();
    res.json({ message: 'Nacionalidad deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
