module.exports = {
  HOST: "localhost",
  USER: "root",
  PORT: "3306",
  PASSWORD: "***",
  DB: "veterinaria",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
