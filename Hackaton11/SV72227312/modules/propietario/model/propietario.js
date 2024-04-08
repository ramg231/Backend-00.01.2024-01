const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/config');

const Propietario = sequelize.define('propietario',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre:{
        type:DataTypes.STRING,
    }, 
    apellido:{
        type:DataTypes.STRING,
    }, 
    direccion:{
        type:DataTypes.STRING,
    },
    telefono:{
        type:DataTypes.STRING,
    }, 
    idNacionalidad:{
        type:DataTypes.INTEGER,
    }, 
    ubigeo:{
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
    tableName:"propietario",
    timestamps:false,
});

module.exports = Propietario;