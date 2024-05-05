const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const UserModel = sequelize.define('User',{
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      githubID: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
        timestamps: true,
    }
)

module.exports = UserModel;