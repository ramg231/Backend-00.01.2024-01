const { Router } = require("express");
const especieServices = require("../services/index");
const routes = Router();

routes.get("/", especieServices.findAll );
routes.post("/", especieServices.createEspecie );
routes.delete("/:id", especieServices.deleteEspecie );

module.exports = routes;