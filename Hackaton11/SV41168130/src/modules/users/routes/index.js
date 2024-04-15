const { Router } = require("express");
const userServices = require("../services/index");

const routes = Router();

routes.get("/users", userServices.findAll);
routes.post("/users", userServices.createUser);
routes.delete("/users/:id", userServices.deleteUser);
routes.patch("/users/:id", userServices.updateUser);


module.exports = routes;
