const { Router } = require('express');
const petServices = require('../services/index');

const routes = Router();

routes.get('/pets', petServices.findAll);
routes.post('/pets', petServices.createPet);
routes.delete('/pets/:id', petServices.deletePet);
routes.patch('/pets/:id', petServices.updatePet);

module.exports = routes;