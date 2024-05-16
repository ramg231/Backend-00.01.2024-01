const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const UserModel = require("../modules/users/user.entity");

const validateJwt = async (req = request, res = response, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: "Acceso denegado. No se proporcionó un token de autorización.",
            });
        }

        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Acceso denegado. Token de autorización no válido.",
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        const userFound = await UserModel.findByPk(decoded.id);

        if (!userFound) {
            return res.status(401).json({
                message: "Acceso denegado. Usuario no encontrado.",
            });
        }

        req.userAuth = userFound.dataValues;
        next();
    } catch (err) {
        console.error("Error de validación de JWT:", err.message);
        return res.status(401).json({
            message: "Acceso denegado. Error al validar el token de autorización.",
        });
    }
};

module.exports = {
    validateJwt,
};
