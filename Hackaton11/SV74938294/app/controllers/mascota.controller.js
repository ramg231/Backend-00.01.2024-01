const db = require('../models'); // Importa el archivo index.js que contiene todos los modelos
const Mascota = db.Mascota; // Accede al modelo Mascota desde el objeto db

// Controlador para obtener todas las mascotas
exports.getAllMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.findAll();
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para agregar una nueva mascota
exports.addMascota = async (req, res) => {
  // Obtener los datos de la nueva mascota desde la solicitud
  const { nombre, fechaNacimiento } = req.body;
  
  try {
    // Crear una nueva instancia del modelo Mascota
    const nuevaMascota = await Mascota.create({ 
      nombre, 
      fechaNacimiento
    });
    res.status(201).json(nuevaMascota);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener una mascota por su ID
exports.getMascotaById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const mascota = await Mascota.findByPk(id);
    if (!mascota) {
      return res.status(404).json({ message: 'Mascota not found' });
    }
    res.json(mascota);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar una mascota por su ID
exports.updateMascota = async (req, res) => {
  const { id } = req.params;
  const { nombre, fechaNacimiento } = req.body;
  
  try {
    const mascota = await Mascota.findByPk(id);
    if (!mascota) {
      return res.status(404).json({ message: 'Mascota not found' });
    }
    mascota.nombre = nombre;
    mascota.fechaNacimiento = fechaNacimiento;
    await mascota.save();
    res.json(mascota);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar una mascota por su ID
exports.deleteMascota = async (req, res) => {
  const { id } = req.params;
  
  try {
    const mascota = await Mascota.findByPk(id);
    if (!mascota) {
      return res.status(404).json({ message: 'Mascota not found' });
    }
    await mascota.destroy();
    res.json({ message: 'Mascota deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
