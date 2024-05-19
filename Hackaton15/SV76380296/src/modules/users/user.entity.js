const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../../database");

// Definición del modelo de usuario
const userModel = sequelize.define("User", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        // Añadir una validación para el nombre
        validate: {
            notNull: {
                msg: "El nombre es obligatorio"
            }
        }
    },
    lastName: {
        type: DataTypes.STRING,
        // Añadir una validación para el apellido
        validate: {
            notEmpty: {
                msg: "El apellido no puede estar vacío"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        // Añadir una validación para el formato de correo electrónico
        validate: {
            isEmail: {
                msg: "El correo electrónico debe tener un formato válido"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        // Podrías añadir más validaciones de contraseña aquí
    },
    githubId: {
        type: DataTypes.STRING,
        defaultValue: null,
    }
}, {
    timestamps: true,
});

module.exports = userModel;
