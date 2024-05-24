const http = require("node:http");
const path = require("node:path");
 
const express = require("express");
const { Server: SocketServer } = require("socket.io");
 
const sequelize = require("../database");
const userRoutes = require("../modules/users/route");
const authRoutes = require("../auth/route") 
const productRoutes = require("../modules/products/route")
const salesRoutes = require("../modules/sales/route")

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4002;
    this.server = http.createServer(this.app);
    this.usersPath = "/users";
    this.authPath = "/auth";
    this.productPath = "/products";
    this.salesPath = "/sales";
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
 
    //routes
    this.routes();

     
  }
 
  middleware() {
    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.use(express.json());
  }
 
  routes() {
    this.app.use(this.usersPath, userRoutes);
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.productPath, productRoutes);
    this.app.use(this.salesPath, salesRoutes);
  }
  async connectionDb() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
 
  socket() {
    this.io.on("connection", (socket) => {
      console.log("usuario conectado");
 
      socket.on("chat message", (msg) => {
        console.log(msg);
        ///guarda en una base de datos
 
        this.io.emit("chat message", msg);
      });
    });
  }
 
  listen() {
    this.server.listen(this.port, () => {
      console.log(`server escuchando en el puerto ${this.port}`);
    });
  }
}
 
module.exports = Server;
 