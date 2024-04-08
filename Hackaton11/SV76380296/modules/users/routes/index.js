const {Router} = require('express');
const User = require("../model/user")
const userServices = require('../services/index')
const routes = Router();

routes.get("/", userServices.findAll);
routes.post("/", userServices.createUser);
routes.delete("/:id", userServices.deleteUser);

module.exports = routes;