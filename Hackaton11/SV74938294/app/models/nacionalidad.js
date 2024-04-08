module.exports = (sequelize, DataTypes) => {
  const nacionalidad = sequelize.define("nacionalidad", {
      nombre: {
          type: DataTypes.STRING
      }
  },{
    timestamps: false // Esto evita la creación automática de createdAt y updatedAt
});

  return nacionalidad;
};
