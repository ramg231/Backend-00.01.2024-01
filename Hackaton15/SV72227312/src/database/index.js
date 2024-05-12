const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    host: 'localhost',
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql'
});

module.exports = sequelize;
