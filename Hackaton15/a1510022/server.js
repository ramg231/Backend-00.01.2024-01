

const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport'); // Agrega esta línea
const session = require('express-session'); // Agrega esta línea
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración de MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Configuración de Passport.js
require('./config/passport')(passport);

// Configuración de Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');

  // Ejemplo: Escuchar un evento 'chat message' y transmitirlo a todos los clientes
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  // Ejemplo: Desconectar a un usuario
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Configura Express para servir archivos estáticos desde el directorio "public"
app.use(express.static('public'));

// Configuración de la API REST
app.use(bodyParser.json());

// Configuración de sesiones
app.use(session({
  secret: 'secret', // Cambia esto por una cadena secreta más segura en un entorno de producción
  resave: false,
  saveUninitialized: false
}));

// Inicialización de Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Rutas
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const packagesRouter = require('./routes/packages');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/packages', packagesRouter);
app.set('view engine', 'ejs');
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
