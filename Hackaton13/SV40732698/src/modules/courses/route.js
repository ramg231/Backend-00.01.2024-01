const { Router } = require("express");
const { create, findOne, findAll, deleteCourse, update } = require("./services");
const routes = Router();

routes.get("/",findAll);
routes.post("/",create);
routes.get("/:id",findOne);
routes.delete("/:id",deleteCourse);
routes.patch("/:id",update);

module.exports = routes;