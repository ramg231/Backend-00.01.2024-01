const { Router } = require("express");
const ubigeoServices = require("../services/index");
const routes = Router();

routes.get("/", ubigeoServices.findAll );
routes.post("/", ubigeoServices.createUbigeo );
routes.delete("/:ubigeo", ubigeoServices.deleteUbigeo );

module.exports = routes;