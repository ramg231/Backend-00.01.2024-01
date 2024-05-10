const { Router } = require("express");
const { payment } = require("./services");
const routes = Router();

routes.post("/",payment);

module.exports = routes;