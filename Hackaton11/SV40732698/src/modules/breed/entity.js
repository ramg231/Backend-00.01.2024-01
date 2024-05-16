const { DataTypes } = require("sequelize");
const sequelize = require("../../db/config");

const RazaSchema = sequelize.define(
  "raza",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
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
    tableName: "raza",
    timestamps: false,
  }
);

module.exports = RazaSchema;
