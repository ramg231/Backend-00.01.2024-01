module.exports = (sequelize, DataTypes) => {
  const propietario = sequelize.define("propietario", {
      nombre: {
          type: DataTypes.STRING
      },
      apellido: {
          type: DataTypes.STRING
      },
      direccion: {
          type: DataTypes.STRING
      },
      telefono: {
          type: DataTypes.STRING
      }
  },{
    timestamps: false // Esto evita la creación automática de createdAt y updatedAt
});

  return propietario;
};
