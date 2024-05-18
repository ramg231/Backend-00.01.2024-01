const { DataTypes } = require("sequelize");
const sequelize = require("../../db/config");

const PropietarioSchema = sequelize.define(
  "propietario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
    },
    Apellido: {
      type: DataTypes.STRING,
    },
    Direccion: {
      type: DataTypes.STRING,
    },
    Telefono: {
      type: DataTypes.STRING,
    },
    idNacionalidad: {
      type: DataTypes.INTEGER,
    },
    ubigeo: {
      type: DataTypes.STRING,
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
    tableName: "propietario",
    timestamps: false,
  }
);

module.exports = PropietarioSchema;
