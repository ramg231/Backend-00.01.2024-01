module.exports = (sequelize, DataTypes) => {
  const sexo = sequelize.define("sexo", {
      nombre: {
          type: DataTypes.STRING
      }
  },{
    timestamps: false // Esto evita la creación automática de createdAt y updatedAt
});

  return sexo;
};
