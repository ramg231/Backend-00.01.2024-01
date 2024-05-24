const { Router } = require("express");
const { createUser } = require("./user.services");
const validateFields = require("../../middleware/validate-field")
const { check } = require("express-validator")
const { validateJwt } = require("../../middleware/validate-jwt")
const routes = Router();

routes.post("/", [
    
    validateJwt,
    validateFields
], createUser
);

module.exports = routes;