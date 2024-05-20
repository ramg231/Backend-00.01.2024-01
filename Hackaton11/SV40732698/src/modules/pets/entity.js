const { DataTypes } = require("sequelize");
const sequelize = require("../../db/config");

const MascotaSchema = sequelize.define(
  "mascota",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
    },
    idEspecie: {
      type: DataTypes.INTEGER,
    },
    idRaza: {
      type: DataTypes.INTEGER,
    },
    idSexo: {
      type: DataTypes.INTEGER,
    },
    idPropietario: {
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
    tableName: "Mascota",
    timestamps: false,
  }
);

module.exports = MascotaSchema;
