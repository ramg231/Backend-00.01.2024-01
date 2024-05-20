const { Router } = require("express");
const { login, CallBackGithub, AuthGithub } = require("./auth.service");
const validateFields = require("../middleware/validate-field");
const { check } = require("express-validator");

const routes = Router();

routes.post(
  "/",
  [
    check("password", "password is required").not().isEmpty(),
    check("email", "invalid email").isEmail(),
    ///token
    validateFields,
  ],
  login
);

routes.get("/github", AuthGithub);
routes.get("/github/callback", CallBackGithub);
module.exports = routes;
