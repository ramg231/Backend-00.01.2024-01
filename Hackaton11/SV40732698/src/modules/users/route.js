const { Router } = require("express");
const { findAll, create, deleteUser } = require("./services");

const routes = Router();

routes.get("/", findAll);
routes.post("/", create);
routes.delete("/:id", deleteUser);

module.exports = routes;
