const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/config');

const Mascota = sequelize.define('mascota',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre:{
        type:DataTypes.STRING,
    }, 
    fechaNacimiento:{
        type:DataTypes.DATE,
    },
    idEspecie:{
        type:DataTypes.INTEGER,
    }, 
    idRaza:{
        type:DataTypes.INTEGER,
    }, 
    idSexo:{
        type:DataTypes.INTEGER,
    }, 
    idPropietario:{
        type:DataTypes.INTEGER,
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
    tableName:"mascota",
    timestamps:false,
});

module.exports = Mascota;