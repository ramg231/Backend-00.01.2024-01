const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");
const sequelize = new Sequelize(
    'veterinaria', 
    'root', 
    'admin123', 
    {
    host: 'localhost',
    dialect:'mysql',
  }
);

module.exports = sequelize;