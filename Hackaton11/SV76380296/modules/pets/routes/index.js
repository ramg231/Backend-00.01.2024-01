const {Router} = require('express');
const Pet = require("../model/pet")
const petServices = require('../services/index')
const routes = Router();

routes.get("/", petServices.findAll);
routes.post("/", petServices.createPet);
routes.delete("/:id", petServices.deletePet);

module.exports = routes;