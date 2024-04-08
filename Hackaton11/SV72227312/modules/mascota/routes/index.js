const { Router } = require("express");
const mascotaServices = require("../services/index");
const routes = Router();

routes.get("/", mascotaServices.findAll );
routes.post("/", mascotaServices.createMascota );
routes.delete("/:id", mascotaServices.deleteMascota );

module.exports = routes;