const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const ProductModel = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    stripeId: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["name"],
      },
    ],
  }
);

module.exports = ProductModel;
