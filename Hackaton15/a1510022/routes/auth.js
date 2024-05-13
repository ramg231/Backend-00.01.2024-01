// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', ( res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});


// Ruta para iniciar sesión (POST)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard', // Redirige al usuario al panel de control después del inicio de sesión exitoso
  failureRedirect: '/login', // Redirige al usuario de vuelta al formulario de inicio de sesión en caso de error
  failureFlash: true // Permite mostrar mensajes flash de error
}));

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
