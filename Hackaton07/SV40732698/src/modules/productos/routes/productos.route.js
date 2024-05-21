const { Router } = require("express");
const { getProducts } = require("../services/productos.service");
const routes = Router();
routes.get('/products', getProducts);
module.exports = routes;