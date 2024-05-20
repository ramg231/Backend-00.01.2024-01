module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "usuario",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estadoCivil: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      fechaNacimiento: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
  return User;
};
