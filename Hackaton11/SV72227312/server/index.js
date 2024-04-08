const express = require("express");
const routesUsers = require("../modules/users/routes");
const routesPets = require("../modules/mascota/routes");
const routesEspecie = require("../modules/especie/routes");
const routesNacionalidad = require("../modules/nacionalidad/routes");
const routesPropietario = require("../modules/propietario/routes");
const routesRaza = require("../modules/raza/routes");
const routesSexo = require("../modules/sexo/routes");
const routesUbigeo = require("../modules/ubigeo/routes");
const routesVacunas = require("../modules/vacunas/routes");

const { Sequelize } = require('sequelize');
const sequelize = require("../db/config");
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.originPath = '/api';
        this.userPath = `${this.originPath}/users`;
        this.petPath = `${this.originPath}/mascota`;
        this.especiePath = `${this.originPath}/especie`;
        this.nacionalidadPath = `${this.originPath}/nacionalidad`;
        this.propietarioPath = `${this.originPath}/propietario`;
        this.razaPath = `${this.originPath}/raza`;
        this.sexoPath = `${this.originPath}/sexo`;
        this.ubigeoPath = `${this.originPath}/ubigeo`;
        this.vacunasPath = `${this.originPath}/vacunas`;

        this.middleware();
        this.routes();
        this.db();
    }

    middleware(){
        this.app.use(express.json());
    }
    
    async db(){
          try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }

    routes(){
        this.app.use(this.userPath, routesUsers);
        this.app.use(this.petPath, routesPets);
        this.app.use(this.especiePath, routesEspecie);
        this.app.use(this.nacionalidadPath, routesNacionalidad);
        this.app.use(this.propietarioPath, routesPropietario);
        this.app.use(this.razaPath, routesRaza);
        this.app.use(this.sexoPath, routesSexo);
        this.app.use(this.ubigeoPath, routesUbigeo);
        this.app.use(this.vacunasPath, routesVacunas);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
          });
    }
}

module.exports = Server;