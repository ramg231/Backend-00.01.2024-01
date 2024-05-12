const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const SalesModel = sequelize.define(
  "Sales",
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      default: 1,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stripeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = SalesModel;
