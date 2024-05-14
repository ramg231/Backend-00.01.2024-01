// Importación de módulos
const express = require("express");
const cors = require("cors");
const vetRouter = require("./src/routes/veterinaria.routes.js");

// Creación de la aplicación Express
const app = express();

// Opciones CORS(intercambio de recursos entre origenes)
let corOptions = {
  origin: "http://localhost:8081",
};

// Puerto del servidor
const port = process.env.PORT || 8080;

//middleware
app.use(cors(corOptions)); //esta es una medida de seguridad implementada en los navegadores web que restringe cómo un recurso web puede ser solicitado desde otro dominio diferente al que originó el recurso

app.use(express.json()); //análisis de solicitudes con formato JSON, es útil cuando se envían datos JSON al servidor
app.use(express.urlencoded({ extended: true })); //URL codificado, el parametro extended permite la decodificación de objetos complejos en lugar de solo cadenas o matrices

//routes
app.use("api/mascotas/", vetRouter);
app.use("api/usuarios/", vetRouter);

//Mandando una respuesta como mensaje
app.get("/", (req, res) => {
  res.json("Hello from Api");
});

//Call to server and return message for avalible
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
