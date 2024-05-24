const { Router } = require("express");
const { createProduct } = require("./services");
const { check } = require("express-validator");
const validateFields = require("../../middleware/validate-field");

const routes = Router();

routes.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("description", "description is required").not().isEmpty(),
    check("price", "price is required").isFloat(),
    // validateJwt,

    validateFields,
  ],
  createProduct
);

module.exports = routes;
