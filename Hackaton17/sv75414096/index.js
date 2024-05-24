import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

// Configuración de MongoDB
const mongoURL = process.env.MONGO_URL || 'mongodb://root:example@localhost:27017/admin';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Middleware para parsear JSON
app.use(express.json());

// Definir el esquema y modelo de usuario
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

// Ruta para crear un nuevo usuario
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ruta para obtener todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
