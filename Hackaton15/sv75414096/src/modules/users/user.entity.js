const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../../database")

const userModel = sequelize.define("User",{
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    githubId: {
        type: DataTypes.STRING,
        defaultValue: null,
    }
}, {
    timestamps:true,
});

module.exports = userModel;

