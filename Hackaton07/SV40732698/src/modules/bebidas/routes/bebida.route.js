const { Router } = require("express");
const { getBebidas } = require("../services/bebidas.service");
const routes = Router();
routes.get('/drinks', getBebidas); // Elimina cualquier parámetro de la ruta
module.exports = routes;