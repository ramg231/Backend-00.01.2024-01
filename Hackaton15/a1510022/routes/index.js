const express = require('express');
const router = express.Router();

// Ruta principal, por ejemplo, la página de inicio
router.get('/', (req, res) => {
  res.send('Bienvenido a la página de inicio');
});

// Otra ruta de ejemplo
router.get('/about', (req, res) => {
  res.send('Acerca de nosotros');
});

// Otra ruta de ejemplo
router.get('/contact', (req, res) => {
  res.send('Página de contacto');
});

module.exports = router;
