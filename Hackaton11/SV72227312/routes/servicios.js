const { Router } = require("express");

const routes = Router();

routes.get("/", (req, res) => {
    console.log(req);
    res.send("Hello world!");
});

module.exports = routes;