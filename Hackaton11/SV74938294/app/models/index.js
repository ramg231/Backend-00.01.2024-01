// models/index.js

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// Creamos la conexión a la base de datos
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false
});

const db = {};

// Importamos los modelos y los asignamos a propiedades del objeto db
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.EspecieMascota = require("./especieMascota.js")(sequelize, Sequelize);
db.Raza = require("./raza.js")(sequelize, Sequelize);
db.Sexo = require("./sexo.js")(sequelize, Sequelize);
db.Color = require("./color.js")(sequelize, Sequelize);
db.Nacionalidad = require("./nacionalidad.js")(sequelize, Sequelize);
db.Propietario = require("./propietario.js")(sequelize, Sequelize);
db.Mascota = require("./mascota.js")(sequelize, Sequelize);

// Definimos las relaciones entre los modelos
db.Mascota.belongsTo(db.EspecieMascota);
db.Mascota.belongsTo(db.Raza);
db.Mascota.belongsTo(db.Sexo);
db.Mascota.belongsTo(db.Color);
db.Mascota.belongsTo(db.Propietario);

module.exports = db;
