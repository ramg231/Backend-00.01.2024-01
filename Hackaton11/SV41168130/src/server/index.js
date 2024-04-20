const express = require("express");

const routesUsers = require("../modules/users/routes");
const routesPets = require("../modules/mascotas/routes");

const sequelize = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.originPath = "/api";
    // this.userPath = `${this.originPath}/users`;
    this.path = `${this.originPath}`;
    

    this.middleare();
    this.routes();
    this.db();
  }

  middleare() {
    this.app.use(express.json());
  }

  async db() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  routes() {
    this.app.use(this.path, routesUsers);
    this.app.use(this.path, routesPets);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
