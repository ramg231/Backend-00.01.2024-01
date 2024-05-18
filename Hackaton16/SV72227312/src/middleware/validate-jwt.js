const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../modules/users/user.entity");

const validateJwt = async (req = request, res = response, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Acceso denegadO",
      });
    }

    const token = req.headers.authorization.split(" ");
    const decoded = jwt.decode(token[1], process.env.SECRET_TOKEN);

    console.log("Decoded token:", decoded);

    if (!decoded || !decoded.id) {
      // Token inválido o no contiene información de usuario
      return res.status(401).json({
        message: "Token inválido",
      });
    }

    const userFound = await UserModel.findByPk(decoded.id);

    if (!userFound) {
      return res.status(401).json({
        message: "Acceso denEgado",
      });
    }

    req.userAuth = userFound.dataValues;

    next();
  } catch (err) {
    console.error("Error al validar el token:", err);
    return res.status(401).json({
      message: "acceso denegado",
    });
  }
};

module.exports = {
  validateJwt,
};
