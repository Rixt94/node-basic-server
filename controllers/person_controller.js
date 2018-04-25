//
// CRUD operaties op person
//
const Person = require('../model/Person')
const assert = require('assert')

let personlist = []

module.exports = {

    createPerson(req, res, next) {
        console.log('personcontroller.createPerson called')

        // Check that req.body has the expected properties
        assert(req.body.firstname, "Parameter 'firstname' is missing.");
        assert(req.body.lastname, "Argument 'lastname' is missing.");
        assert.equal(typeof (req.body.firstname), 'string', "Argument 'firstname' must be a string.");
        assert.equal(typeof (req.body.lastname), 'string', "Argument 'lastname' must be a string.");

        const firstname = req.body.firstname
        const lastname = req.body.lastname
        console.log("We got " + firstname + " " + lastname)

        let user = new Person(firstname, lastname)
        // Add to database
        personlist.push(user)

        res.status(200).json(user).end();
    },

    getAllPersons(req, res, next) {
        res.status(200).json(personlist).end();
    },

    //
    //
    //
    deletePersonById(req, res, next) {
        // Check that req.body has the expected properties
        assert(req.params.id, "Argument 'id' is missing.");
        assert.ok(!isNaN(req.params.id) && req.params.id >= 0, "Argument 'id' must be a positive integer");
        
        logger.debug('deletePersonById called. id = ', req.params.id);
        // vind de juiste person om te deleten
        const id = req.params.id
        console.log('deletePerson id = ' + id)

        // delete die person
        const removedPerson = personlist.splice(id, 1)
        if(removedPerson.length === 1) {
            // gelukt; status = 200
            res.status(200).json(removedPerson).end();
        } else {
            // mislukt; fout -> next(error)
            let error = {
                message: "Person was not found"
            }
            next(error)
        }
    },

    getPersonById(req, res, next) {
        next('Not implemented yet')
    },

    replacePersonById(req, res, next) {
        next('Not implemented yet')
    },

    updatePersonById(req, res, next) {
        next('Not implemented yet')
    }


}