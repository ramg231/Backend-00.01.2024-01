const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../modules/users/user.entity");

const validateJwt = async (req = request, res = response, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Acceso denegado",
      });
    }

    const token = req.headers.authorization.split(" ");
    const decoded = jwt.decode(token[1], process.env.SECRET_TOKEN);

    const userFound = await UserModel.findByPk(decoded.id);

    if (!userFound) {
      return res.status(401).json({
        message: "Acceso denegado",
      });
    }

    req.userAuth = userFound.dataValues;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Acceso denegado",
    });
  }
};

module.exports = {
  validateJwt,
};
