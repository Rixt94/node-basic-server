var express = require('express');
var routes = express.Router();
var todoController = require('../controllers/person_controller_v2');

module.exports = {}

//
// andere benadering dan je tot nu toe zag - routes zijn gescheiden van de controllers;
// de controllers verzorgen de afhandeling.
//
routes.get('/person', todoController.getAll);
routes.get('/person/:id', todoController.getOneById);
routes.get('/person/errordemo', todoController.errorDemo);
routes.all('/person*', todoController.catchAll);

module.exports = routes;