const { Router } = require("express");
const vacunasServices = require("../services/index");
const routes = Router();

routes.get("/", vacunasServices.findAll );
routes.post("/", vacunasServices.createVacuna );
routes.delete("/:id", vacunasServices.deleteVacuna );

module.exports = routes;