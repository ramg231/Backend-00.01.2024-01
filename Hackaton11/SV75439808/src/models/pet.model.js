module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define(
    "mascota",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaNacimiento: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      idEspecie: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idRaza: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idSexo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idPropietario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      usuarioCreacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      usuarioModificacion: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      fechaModificacion: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      timestamps: true,
    }
  );
  return Pet;
};
