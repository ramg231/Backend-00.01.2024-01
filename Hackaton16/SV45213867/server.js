// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const mysql = require('mysql2');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tu_contraseña',
  database: 'sistema_pagos'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Configurar sesión y Passport
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

passport.use(new GoogleStrategy({
  clientID: 'TU_CLIENT_ID',
  clientSecret: 'TU_CLIENT_SECRET',
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, (token, tokenSecret, profile, done) => {
  db.query('SELECT * FROM usuarios WHERE oauth_id = ?', [profile.id], (err, results) => {
    if (err) return done(err);
    if (results.length === 0) {
      const newUser = { nombre: profile.displayName, email: profile.emails[0].value, oauth_id: profile.id };
      db.query('INSERT INTO usuarios SET ?', newUser, (err, result) => {
        if (err) return done(err);
        newUser.id = result.insertId;
        return done(null, newUser);
      });
    } else {
      return done(null, results[0]);
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) return done(err);
    done(null, results[0]);
  });
});

app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/profile');
});

app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  res.send(`Hello, ${req.user.nombre}`);
});

// Rutas de la API
app.use(express.json());

app.get('/api/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/api/pagos', (req, res) => {
  const { id_usuario, id_producto, monto, estado } = req.body;
  const pago = { id_usuario, id_producto, monto, estado };
  db.query('INSERT INTO pagos SET ?', pago, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId });
  });
});

app.post('/api/devoluciones', (req, res) => {
  const { id_pago, monto } = req.body;
  const devolucion = { id_pago, monto };
  db.query('INSERT INTO devoluciones SET ?', devolucion, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId });
  });
});

// Configurar Socket.io
io.on('connection', socket => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
