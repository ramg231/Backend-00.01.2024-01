const { Router } = require("express");
const { getCambio } = require("../services/dolar.service");
const routes = Router();
routes.get('/cambio', getCambio);
module.exports = routes;