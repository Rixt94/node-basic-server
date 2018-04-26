//
// CRUD operations on person
//
const Person = require('../model/Person')
const ApiError = require('../model/ApiError')
const assert = require('assert')

let personlist = []

module.exports = {

    //
    // Create a new person and add it to the list.
    //
    createPerson(req, res, next) {
        console.log('personcontroller.createPerson')
        const person = req.body
        
        try {
            assert(typeof (person.firstname) === 'string', 'firstname must be a string')
            assert(typeof (person.lastname) === 'string', 'lastname must be a string')
        }
        catch(ex) {
            const error = new ApiError(ex.toString(), 500)
            next(error)
            return
        }

        const firstname = person.firstname
        const lastname = person.lastname

        let user = new Person(firstname, lastname)
        personlist.push(user)

        res.status(200).json(user).end();
    },

    //
    // Get the list of persons. Returns the list as an array.
    //
    getAllPersons(req, res, next) {
        res.status(200).json(personlist).end();
    },

    //
    // Get a person by given id. The id is the index in the personlist.
    // When given an invalid index, respond with an error 
    //
    getPersonById(req, res, next) {
        const id = req.params.id
        try {
            assert(isNumber(id) && id >= 0 && id < personlist.length, 'parameter id is invalid: ' + id)
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 500)
            next(error)
            return
        }
        res.status(200).json(personlist[id]).end();
    },

    //
    // Replace an existing person in the list. We need an id and a new person 
    // object. The new person will be stored at index id.
    //
    updatePersonById(req, res, next) {
        const id = req.params.id
        const person = req.body
        try {
            // We need a valid id 
            assert(isNumber(id) && id >= 0 && id < personlist.length, 'parameter id is invalid: ' + id)
            // And we need a valid person
            assert(person.firstname, 'firstname must be provided')
            assert(typeof (person.firstname) === 'string', 'firstname must be a string')
            assert(req.body.lastname, 'lastname must be provided')
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 500)
            next(error)
            return
        }
        res.status(200).json(personlist[id]).end();



        let user = new Person("Robin", "Schellius")
        res.status(200).json(user).end();
    },
    
    deletePersonById(req, res, next) {
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
    }
}