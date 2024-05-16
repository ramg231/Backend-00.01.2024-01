// Importa express y otras dependencias
const express = require('express');
const path = require('path');
const connectDB = require('./db'); 

// Importa las rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const productoRoutes = require('./routes/productoRoutes');
const transaccionRoutes = require('./routes/transaccionRoutes');
const pagoRoutes = require('./routes/pagoRoutes');
const devolucionRoutes = require('./routes/devolucionRoutes');

// Crea una instancia de la aplicación Express
const app = express();

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configura el motor de vistas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas
app.use('/usuarios', usuarioRoutes);
app.use('/productos', productoRoutes);
app.use('/transacciones', transaccionRoutes);
app.use('/pagos', pagoRoutes);
app.use('/devoluciones', devolucionRoutes);


// Ruta de inicio
app.get('/', (req, res) => {
  res.send('¡Bienvenido a tu aplicación de comercio electrónico!');
});

// Ruta para la página de inicio de sesión
app.get('/inicio-sesion', (req, res) => {
  res.render('usuario/inicioSesion');
});

// Ruta para la página de registro
app.get('/registro', (req, res) => {
  res.render('usuario/registro');
});

// Configuración de la conexión a la base de datos
connectDB().then(() => {
  // Puerto de escucha
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
  });
}).catch(error => {
  console.error('Error al conectar a la base de datos:', error.message);
  process.exit(1);
});
