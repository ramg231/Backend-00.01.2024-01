const { Router } = require("express");
const { findAll, create, findOne, deleteCoupon, update } = require("./services");
const routes = Router();

routes.get("/",findAll);
routes.post("/",create);
routes.get("/:id",findOne);
routes.delete("/:id",deleteCoupon);
routes.patch("/:id",update);

module.exports = routes;