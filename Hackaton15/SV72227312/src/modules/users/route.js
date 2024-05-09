const { Router } = require("express");
const { createUser } = require("../users/user.services");
const validateFields = require("../../middleware/validate-fields");
const { check } = require("express-validator");
const { validateJwt } = require("../../middleware/validate-jwt");

const routes = Router();

routes.post("/", 
[check('firstName','firsName es requerido').not().isEmpty(), validateFields],
[check('lastName','lastName es requerido').not().isEmpty(), validateFields],
[check('password','password es requerido').not().isEmpty(), validateFields],
[check('email','email no válido').isEmail(),validateJwt, validateFields],
createUser);

module.exports = routes;