const { Router } = require("express");
const { login, CallBackGithub, AuthGithub } = require("./auth.services");
const validateFields = require("../middleware/validate-fields");
const { check } = require("express-validator");

const routes = Router();

routes.post("/", 
[check('password','password es requerido').not().isEmpty(), validateFields],
[check('email','email no válido').isEmail(), validateFields],
login);

routes.get('/github',AuthGithub);
routes.get('/github/callback',CallBackGithub);

module.exports = routes;