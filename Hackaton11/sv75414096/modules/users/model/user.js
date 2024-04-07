const { DataTypes } = require("sequelize");
const sequelize = require("../../../db/config");

const User = sequelize.define(
  "usuario",
  {
    username: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    apellido: {
      type: DataTypes.STRING,
    },
    estadoCivil: {
      type: DataTypes.TINYINT,
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
    },
    edad: {
      type: DataTypes.INTEGER,
    },
    activo: {
      type: DataTypes.TINYINT,
    },

    fechaCreacion: {
      type: DataTypes.DATE,
    },
    // usuarioModificacion:{
    //     type:DataTypes.STRING
    // } int
    fechaModificacion: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

module.exports = User;
