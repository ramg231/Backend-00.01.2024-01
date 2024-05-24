
const path = require('path');
const express = require('express');

const githubRoutes = require('../modules/github/routes/github.route');
const climaRoutes = require('../modules/clima/routes/clima.route');
const pokemonRoutes = require('../modules/pokemon/routes/pokemon.route');
const productoRoutes = require('../modules/productos/routes/productos.route');
const rickMortyRoutes = require("../modules/rickandmorty/routes/rickandmorty.route");
const dolar = require("../modules/dolar/routes/dolar.route");

class Server {
  constructor() {
    this.app = express();
    this.port = 4000;
    this.originPath = "/api"; 

    this.middleware();
    this.routes();
    // this.listen();
    // this.viewEngine();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname,'../../public')));
  }

  routes() {
    this.app.use(this.originPath, githubRoutes); 
    this.app.use(this.originPath, climaRoutes); 
    this.app.use(this.originPath, pokemonRoutes); 
    this.app.use(this.originPath, productoRoutes); 
    this.app.use(this.originPath, dolar);
    this.app.use(this.originPath, rickMortyRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listen in port ${this.port}`)
    });
    
    console.log(`Server listen in port }`)
  }
}

module.exports = Server;