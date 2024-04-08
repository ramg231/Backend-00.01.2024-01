const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require ("../../../db/config")

const Pet = sequelize.define(
    "mascota", 
    {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type:DataTypes.STRING
    },
    fechaNacimiento:{
        type:DataTypes.DATE
    },
    idEspecie:{
        type:DataTypes.INTEGER
    },
    idRaza:{
        type:DataTypes.INTEGER
    },
    idSexo:{
        type:DataTypes.INTEGER
    },
    idPropietario:{
        type:DataTypes.INTEGER
    },
    activo:{
        type:DataTypes.TINYINT
    },
    fechaCreacion:{
        type:DataTypes.DATE
    },
    usuarioCreacion:{
        type:DataTypes.INTEGER
    },
    fechaModificacion:{
        type:DataTypes.DATE
    },
}, {

    tableName: "mascota",
    timestamps: false,

})

module.exports = Pet;
