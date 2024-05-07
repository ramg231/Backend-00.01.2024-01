const { Router } = require('express');
const { createCourse, findOneCourse, findAllCourse } = require("./services");

const routes = Router();

routes.post('/',createCourse)
routes.get("/:id", findOneCourse);
routes.get("/", findAllCourse);
//routes.delete("/", deleteOne);

module.exports = routes;