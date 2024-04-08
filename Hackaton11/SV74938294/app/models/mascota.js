module.exports = (sequelize, DataTypes) => {
  const mascota = sequelize.define("mascota", {
      nombre: {
          type: DataTypes.STRING
      },
      fechaNacimiento: {
          type: DataTypes.DATE
      }
  },{
    timestamps: false // Esto evita la creación automática de createdAt y updatedAt
});

  return mascota;
};
