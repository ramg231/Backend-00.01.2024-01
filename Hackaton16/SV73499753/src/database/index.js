const { Sequelize } = require("sequelize")

const sequelize = new Sequelize({
    host: 'localhost',
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dialect: 'mysql'
});

module.exports = sequelize;