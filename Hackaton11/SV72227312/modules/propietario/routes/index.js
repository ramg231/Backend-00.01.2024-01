const { Router } = require("express");
const propietarioServices = require("../services/index");
const routes = Router();

routes.get("/", propietarioServices.findAll );
routes.post("/", propietarioServices.createPropietario );
routes.delete("/:id", propietarioServices.deletePropietario );

module.exports = routes;