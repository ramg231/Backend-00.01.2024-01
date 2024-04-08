module.exports = (sequelize, DataTypes) => {
  const color = sequelize.define("color", {
      nombre: {
          type: DataTypes.STRING
      }
  },{
    timestamps: false // Esto evita la creación automática de createdAt y updatedAt
});

  return color;
};
