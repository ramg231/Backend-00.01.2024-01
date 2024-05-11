// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = function(passport) { // Exporta una función que acepta passport como argumento
  // Configuración de la estrategia local de Passport.js
  passport.use(new LocalStrategy(
    {
      usernameField: 'email', // Campo del formulario para el nombre de usuario (en este caso, el correo electrónico)
      passwordField: 'password' // Campo del formulario para la contraseña
    },
    async (email, password, done) => {
      try {
        // Busca al usuario por su correo electrónico en la base de datos
        const user = await User.findOne({ email });

        // Si no se encuentra el usuario, devuelve un error de autenticación
        if (!user) {
          return done(null, false, { message: 'Correo electrónico o contraseña incorrectos.' });
        }

        // Comprueba si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: 'Correo electrónico o contraseña incorrectos.' });
        }

        // Si las credenciales son válidas, devuelve el usuario
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  // Serialización y deserialización de usuarios
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
