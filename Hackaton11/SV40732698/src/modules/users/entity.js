const { DataTypes } = require("sequelize");
const sequelize = require("../../db/config");

const UserSchema = sequelize.define(
  "usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
    usuarioCreacion: {
      type: DataTypes.INTEGER,
    },
    fechaCreacion: {
      type: DataTypes.DATE,
    },
    usuarioModificacion: {
      type: DataTypes.INTEGER,
    },
    fechaModificacion: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

module.exports = UserSchema;
