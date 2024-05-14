const {Router} = require("express");
const { check } = require("express-validator");
const validateFields = require("../../middleware/validate-field")
const { createSale } = require ("./sales.services")
const { validateJwt } = require("../../middleware/validate-jwt");

const routes = Router();

routes.post("/", [
    check("productId","productId is required").isInt(),
    //cantidad
    validateJwt,
    validateFields
], createSale);

module.exports = routes;