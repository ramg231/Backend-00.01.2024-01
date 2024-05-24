const {Router} = require("express");
const { createProduct } = require("./product.service")
const { check } = require("express-validator");
const validateFields = require("../../middleware/validate-field")
const { validateJwt } = require("../../middleware/validate-jwt")
const routes = Router();

routes.post("/",[
    check("name","name required").not().isEmpty(),
    check("description","desc required").not().isEmpty(),
    check("price","price required").isFloat(),
    validateJwt,
    validateFields
], createProduct);

module.exports = routes;