const express = require("express");
const routesServices = require("../routes/servicios");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.originPath = '/api';

        this.middleware;
        this.routes;
        this.db;
    }

    middleware(){
        this.app.use(express.json());
    }
    
    db(){

    }

    routes(){
        this.app.use(this.originPath, routesServices);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
          });
    }
}

module.exports = Server;