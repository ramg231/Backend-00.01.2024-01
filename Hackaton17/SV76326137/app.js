const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const session = require('express-session');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración de MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydatabase'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Configuración de Passport y OAuth2
passport.use(new OAuth2Strategy({
  authorizationURL: 'https://provider.com/oauth2/authorize',
  tokenURL: 'https://provider.com/oauth2/token',
  clientID: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET',
  callbackURL: 'http://localhost:3000/auth/provider/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Buscar o crear el usuario en la base de datos
  connection.query('SELECT * FROM users WHERE provider_id = ?', [profile.id], (err, results) => {
    if (err) return done(err);
    if (results.length > 0) {
      return done(null, results[0]);
    } else {
      const newUser = { provider_id: profile.id, name: profile.displayName };
      connection.query('INSERT INTO users SET ?', newUser, (err, results) => {
        if (err) return done(err);
        newUser.id = results.insertId;
        return done(null, newUser);
      });
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return done(err);
    done(null, results[0]);
  });
});

// Middleware de Express
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Servir archivos estáticos
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/auth/provider', passport.authenticate('provider'));

app.get('/auth/provider/callback', 
  passport.authenticate('provider', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Configuración de Socket.io
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Iniciar el servidor
server.listen(3000, () => {
  console.log('listening on *:3000');
});
