const { Router } = require("express");
const { login, CallBackGithub, AuthGithub } = require("./auth.service");
const { check, validationResult } = require("express-validator");

const routes = Router();

// Ruta para el inicio de sesión
routes.post(
  "/",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields, 
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      
      await login(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Rutas para la autenticación con GitHub
routes.get("/github", AuthGithub);
routes.get("/github/callback", CallBackGithub);

module.exports = routes;