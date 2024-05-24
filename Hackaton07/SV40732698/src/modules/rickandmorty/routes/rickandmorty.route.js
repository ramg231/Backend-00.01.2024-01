const { Router } = require("express");
const { getRickMorty } = require("../services/rickandmorty.service");
const routes = Router();

routes.get("/rick", getRickMorty);

module.exports = routes;
