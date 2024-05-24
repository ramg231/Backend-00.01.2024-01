const { DataTypes } = require("sequelize");
const sequelize = require("../../database")

const SalesModel = sequelize.define("Sale",{
    productId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 1
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stripeId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
})

module.exports = SalesModel