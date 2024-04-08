module.exports = (sequelize, DataTypes) => {
  const raza = sequelize.define("raza", {
      nombre: {
          type: DataTypes.STRING
      }
  },{
    timestamps: false // Esto evita la creación automática de createdAt y updatedAt
});

  return raza;
};
