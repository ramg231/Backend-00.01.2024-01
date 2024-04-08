module.exports = (sequelize, DataTypes) => {
  const especie = sequelize.define("especie", {
      nombre: {
          type: DataTypes.STRING
      }
  },{
    timestamps: false // Esto evita la creación automática de createdAt y updatedAt
});

  return especie;
};
