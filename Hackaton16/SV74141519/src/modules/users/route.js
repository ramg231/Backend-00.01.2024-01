const { Router } = require("express");
const { createUser } = require("./user.service");
const validateFields = require("../../middleware/validate-field");
const { check } = require("express-validator");
const { validateJwt } = require("../../middleware/validate-jwt");

const routes = Router();

routes.post(
  "/",
  [
    check("lastName", "lastName is required").not().isEmpty(),
    check("firstName", "firstName is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
    check("email", "invalid email").isEmail(),
    validateJwt,
    validateFields,
  ],
  createUser
);

module.exports = routes;
