const { Router } = require("express");
const razaServices = require("../services/index");
const routes = Router();

routes.get("/", razaServices.findAll );
routes.post("/", razaServices.createRaza );
routes.delete("/:id", razaServices.deleteRaza );

module.exports = routes;