const { Router } = require("express");
const nacionalidadServices = require("../services/index");
const routes = Router();

routes.get("/", nacionalidadServices.findAll );
routes.post("/", nacionalidadServices.createNacionalidad );
routes.delete("/:id", nacionalidadServices.deleteNacionalidad );

module.exports = routes;