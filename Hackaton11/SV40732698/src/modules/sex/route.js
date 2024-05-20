const { Router } = require("express");
const { findAll, create, del } = require("./services");

const routes = Router();

routes.get("/", findAll);
routes.post("/", create);
routes.delete("/:id", del);

module.exports = routes;
