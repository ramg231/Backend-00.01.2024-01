const { Router } = require("express");
const { getWeather } = require("../services/clima.service");
const routes = Router();
routes.get('/weather', getWeather);
module.exports = routes;