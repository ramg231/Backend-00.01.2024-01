const express = require("express");
const path = require("path");
const connectToDatabase = require("../database/dbConfig.js");
const User = require("./models/User");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const messageSchema = new Schema({
  content: { type: String, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
 
const Message = mongoose.model("Message", messageSchema);
 
const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(express.static("public"));
 
app.use(express.json());
 
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });
 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});
 
app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/chat.html"));
});
 
app.post("/api/messages", async (req, res) => {
  try {
    const { content, sender } = req.body;
    let response;
    console.log("Este es el valor content: " + content);
 
    if (content === "ayuda") {
      response = "Escribe la palabra menu";
    } else if (content === "menu") {
      response = "Delivery 1, Encomiendas 2";
    } else if (content === "2") {
      response = "Encomiendas 945334455";
    } else if (content === "1") {
      response = "Delivery 952889977";
    } else if (content === "hola") {
      response = "En que te puedo ayudar";
    }
 
    const userMessage = new Message({ content, sender, receiver: "bot" });
    await userMessage.save();
 
    const botMessage = new Message({
      content: response,
      sender: "bot",
      receiver: sender,
    });
    await botMessage.save();
 
    res.status(200).json({ message: response });
  } catch (error) {
    console.error("Error al procesar el mensaje:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});
 
app.delete("/api/messages", async (req, res) => {
  try {
    const { receiver } = req.body;
    // Eliminar todos los mensajes del usuario de la base de datos
    await Message.deleteMany({ receiver: receiver });
    res
      .status(200)
      .json({ message: "Mensajes del usuario eliminados correctamente" });
  } catch (error) {
    console.error("Error al borrar los mensajes del usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});
 
// En la ruta del servidor que maneja la carga inicial del historial de chat
app.get("/api/messages/:username", async (req, res) => {
  try {
    const { username } = req.params;
 
    // Recuperar los mensajes del usuario de la base de datos
    const messages = await Message.find({ sender: username });
 
    // Enviar los mensajes al cliente
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error al recuperar mensajes del usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});
 
// Ruta para iniciar sesión
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
 
    const user = await User.findOne({ username, password });
 
    if (user) {
      res
        .status(200)
        .json({ message: "Inicio de sesión exitoso", username: username });
    } else {
      // Credenciales incorrectas
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});
 
// Ruta para crear un nuevo usuario
app.post("/api/users", async (req, res) => {
  try {
    const { username, password } = req.body;
 
    // Verificar si el nombre de usuario ya existe en la base de datos
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya está en uso" });
    }
 
    // Crear un nuevo usuario utilizando el modelo de usuario
    const newUser = new User({ username, password });
    await newUser.save();
 
    // Devolver el nuevo usuario creado
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al crear un nuevo usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});
 