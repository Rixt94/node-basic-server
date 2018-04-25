//
//
//
let express = require('express')
let routes = express.Router()
let personcontroller = require('../controllers/person_controller')

// hier schrijven we router endpoints
routes.get('/persons', personcontroller.getAllPersons)
routes.post('/persons', personcontroller.createPerson)
// routes.put('/persons', personcontroller.updateAllPerson)

routes.get('/persons/:id', personcontroller.getPersonById)
routes.put('/persons/:id', personcontroller.replacePersonById)
routes.patch('/persons/:id', personcontroller.updatePersonById)
routes.delete('/persons/:id', personcontroller.deletePersonById)

module.exports = routes
