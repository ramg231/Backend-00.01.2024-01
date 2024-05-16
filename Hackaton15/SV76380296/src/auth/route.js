const { Router } = require("express");
const { login, CallBackGithub, AuthGithub } = require("./auth.service");
const validateFields = require("../middleware/validate-field");
const { check } = require("express-validator");

const routes = Router();

routes.post("/", [
    check('password').not().isEmpty().withMessage('La contraseña es obligatoria'),
    check('email').isEmail().withMessage('El correo electrónico no es válido'),
    validateFields
], login);

routes.get('/github', AuthGithub);
routes.get('/github/callback', CallBackGithub);

module.exports = routes;