const { Router } = require("express");
const sexoServices = require("../services/index");
const routes = Router();

routes.get("/", sexoServices.findAll );
routes.post("/", sexoServices.createSexo );
routes.delete("/:id", sexoServices.deleteSexo );

module.exports = routes;