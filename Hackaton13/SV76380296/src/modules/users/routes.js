const { Router } = require('express');
const { createUser} = require("./services");

const routes = Router();

routes.post('/',createUser)
//routes.get("/:id", findOneCourse);
//routes.get("/", findAllCourse);
//routes.delete("/", deleteOne);

module.exports = routes;