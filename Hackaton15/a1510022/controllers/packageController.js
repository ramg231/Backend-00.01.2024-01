// controllers/packageController.js

const Package = require('../models/package');

// Controlador para obtener todos los paquetes
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener un paquete por su ID
exports.getPackageById = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para crear un nuevo paquete
exports.createPackage = async (req, res) => {
  try {
    const package = new Package(req.body);
    await package.save();
    res.status(201).json(package);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para actualizar un paquete
exports.updatePackage = async (req, res) => {
  try {
    const package = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!package) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }
    res.json(package);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para eliminar un paquete
exports.deletePackage = async (req, res) => {
  try {
    const package = await Package.findByIdAndDelete(req.params.id);
    if (!package) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }
    res.json({ message: 'Paquete eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
