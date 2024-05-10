const express = require("express");
const mongoose = require('mongoose');
const routesCourse = require("../modules/courses/routes");
const routesUsers = require("../modules/users/routes");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.port || 3000;
        this.originPath = "/api";
        this.mongoUri = `${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`;
        this.userPath = `${this.originPath}/users`;
        this.coursePath  = `${this.originPath}/courses`


        this.middleware();
        this.db();
        this.routes();
    }   

    middleware() {
        this.app.use(express.json());
    }

    async db() {
        await mongoose.connect(this.mongoUri).then(() => {
            console.log("Connected! Datasusbase.")
        })
    }

    routes() {
        this.app.use(this.userPath, routesUsers);
        this.app.use(this.coursePath, routesCourse);
        //this.app.use(this.ordersPath, routesOrders);
      }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on SUS ${this.port}`)
        });
    }
}

module.exports = Server;