const { DataTypes } = require("sequelize");
const sequelize = require("../../db/config");

const SexoSchema = sequelize.define('sexo',{
  id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  descripcion:{
      type:DataTypes.STRING,
  },
  activo:{
      type:DataTypes.TINYINT,
  }, 
  usuarioCreacion:{
      type:DataTypes.INTEGER,
  },
  fechaCreacion:{
      type:DataTypes.DATE,
  }, 
  usuarioModificacion:{
      type:DataTypes.INTEGER,
  },
  fechaModificacion:{
      type:DataTypes.DATE,
  },
},{
  tableName:"sexo",
  timestamps:false,
});

module.exports = SexoSchema;