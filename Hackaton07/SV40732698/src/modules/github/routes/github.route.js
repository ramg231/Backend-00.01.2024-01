const { Router } = require("express");
const { getUser } = require("../services/github.service");
const routes = Router();
routes.get('/github/', getUser);
module.exports = routes;