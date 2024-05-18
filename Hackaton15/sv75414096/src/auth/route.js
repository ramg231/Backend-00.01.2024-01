const { Router } = require("express");
const { login, CallBackGithub, AuthGithub } = require("./auth.service");
const validateFields = require("../middleware/validate-field")
const { check } = require("express-validator")
const routes = Router();

routes.post("/", [

    check('password','needs password').not().isEmpty(),
    check('email','invalid email').isEmail(),
    validateFields
], login
);

routes.get('/github',AuthGithub)
routes.get('/github/callback',CallBackGithub)

module.exports = routes;