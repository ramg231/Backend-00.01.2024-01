const { Router } = require("express");
const { getPokeAbility } = require("../services/pokemon.service"); // Importa getPokeAbility de pokemon.service.js
const routes = Router();
routes.get('/pokemon/:name', getPokeAbility); // Asigna getPokeAbility a la ruta /poke/:name
module.exports = routes;