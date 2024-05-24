const { Router } = require("express");
const { getPhoto } = require("../services/fotografia.service");
const routes = Router();
routes.get('/theme/:theme', getPhoto);
module.exports = routes;