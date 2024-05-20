const { DataTypes } = require("sequelize");
const sequelize = require("../../database")

const ProductModel = sequelize.define("Product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false

    },
    stripeId: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    timestamps: true,
}

);

module.exports = ProductModel