const { Router } = require("express");
const { createUser } = require("./user.services");
const validateFields = require("../../middleware/validate-field")
const { check } = require("express-validator")
const { validateJwt } = require("../../middleware/validate-jwt")
const routes = Router();

routes.post("/", [

    check('lastName','last name is required.').not().isEmpty(),
    check('firstName','first name is required.').not().isEmpty(),
    check('password','needs password').not().isEmpty(),
    check('email','invalid email').isEmail(),
    validateJwt,
    validateFields
], createUser
);

module.exports = routes;