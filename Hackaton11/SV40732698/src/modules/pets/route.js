const { Router } = require("express");
const { findAll, create, deleteOwner } = require("./services");

const routes = Router();

routes.get("/", findAll);
routes.post("/", create);
routes.delete("/:id", deleteOwner);

module.exports = routes;
