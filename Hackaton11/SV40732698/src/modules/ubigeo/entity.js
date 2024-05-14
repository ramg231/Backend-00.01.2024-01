const { DataTypes } = require("sequelize");
const sequelize = require("../../db/config");

const UbigeoSchema = sequelize.define('ubigeo',{
    ubigeo:{
        type:DataTypes.STRING,
        primaryKey: true,
    },
    ubicacion:{
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
    tableName:"ubigeo",
    timestamps:false,
});

module.exports = UbigeoSchema;