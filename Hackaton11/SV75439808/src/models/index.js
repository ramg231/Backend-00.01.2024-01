const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config.js");

// Extrae la configuración de la base de datos del archivo de configuración
const { HOST, USER, PORT, PASSWORD, DB, dialect } = dbConfig;

// Crea una instancia de Sequelize con la configuración proporcionada
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: dialect,
  pool: dbConfig.pool,
});

// Intenta autenticar la conexión a la base de datos
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importa y define los modelos
db.mascota = require("./pet.model.js")(sequelize, DataTypes);
db.usuario = require("./user.model.js")(sequelize, DataTypes);

// Sincroniza los modelos con la base de datos
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized.");
});

module.exports = db;
