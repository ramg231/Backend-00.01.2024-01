const { Router } = require("express");
const userServices = require("../services/index");

const routes = Router();

routes.get("/", userServices.findAll);

module.exports = routes;
