const http = require("node:http");
const path = require("node:path");

const express = require("express");
const { Server: SocketServer } = require("socket.io");

const sequelize = require("../database/index");
const userRoutes = require("../modules/users/route");
const authRoutes = require("../auth/route");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4002;
        this.server = http.createServer(this.app);
        this.userPath = "/users";
        this.authPath = "/auth";
        this.io = new SocketServer(this.server, {
            cors: {
                origin: "http://localhost:4002",
            },
        });
        //middleware
        this.middleware();

        //database
        this.connectionDb();

        //socket
        this.socket();
        
        //routes
        this.routes();
    }

    middleware() {
        this.app.use(express.static(path.join(__dirname, "../public")));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.userPath,userRoutes);
        this.app.use(this.authPath,authRoutes);
    }

    async connectionDb() {
        try{
            await sequelize.authenticate();
            console.log("La conexión se estableció correctamente.");
            
        } catch(error) {
            console.error('No se pudo conectar a la base de datos', error);
        }
    }

    socket() {
        this.io.on("connection", (socket) => {  
            console.log("Usuario Conectado!!");

            socket.on("chat message", (msg) => {
                console.log(msg);

                this.io.emit("chat message", msg);
            });
        });
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server escuchando en puerto ${this.port}`);
        });
    }
}

module.exports = Server;