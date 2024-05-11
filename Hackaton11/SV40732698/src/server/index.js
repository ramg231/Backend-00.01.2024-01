const express = require("express");
const routesUsers = require("../modules/users/route"); 
const routersOwner = require("../modules/owner/route"); 
const routerPets = require("../modules/pets/route"); 
const routerBreed = require("../modules/breed/route"); 
const routerKind = require("../modules/kind/route"); 
const routerNationality = require("../modules/nationality/route"); 
const routerSex = require("../modules/sex/route"); 
const routerUbigeo = require("../modules/ubigeo/route"); 
const routerVaccines = require("../modules/vaccines/route"); 

const sequelize = require("../db/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.originPath = "/api";
       
        this.userPath = `${this.originPath}/users`;
        this.ownerPath = `${this.originPath}/owners`;
        this.petPath = `${this.originPath}/pets`;
        this.breedPath = `${this.originPath}/breed`;
        this.kindPath = `${this.originPath}/kind`;
        this.nationalityPath = `${this.originPath}/nationality`;
        this.sexPath = `${this.originPath}/sex`;
        this.ubigeoPath = `${this.originPath}/ubigeo`;
        this.vaccinesPath = `${this.originPath}/vaccines`;
        this.middleware();
        this.routes();
        this.db();
    }

    middleware() {
        this.app.use(express.json());
    }

    async db(){
        try {
          await sequelize.authenticate();
          console.log('Base de datos conectada');
        } catch (error) {
          console.error('Ocurrio un error: ', error);
        }
  }

    routes() {
        this.app.use(this.userPath, routesUsers);
        this.app.use(this.ownerPath, routersOwner);
        this.app.use(this.petPath, routerPets);
        this.app.use(this.breedPath, routerBreed);
        this.app.use(this.kindPath, routerKind);
        this.app.use(this.nationalityPath, routerNationality);
        this.app.use(this.sexPath, routerSex);
        this.app.use(this.ubigeoPath, routerUbigeo);
        this.app.use(this.vaccinesPath, routerVaccines);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Port ${this.port}`);
        });
    }
}

module.exports = Server;