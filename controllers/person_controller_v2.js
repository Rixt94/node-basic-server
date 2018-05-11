//
// CRUD operaties op person
//
var db = require('../config/db.improved');
const assert = require('assert')


module.exports = {

    getAllPersons(req, res, next) {
        console.log('todo.controller getAll');
        db.query('SELECT * FROM person', function (error, rows, fields) {
            if (error) {
                next(error);
            } else {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: rows
                }).end();
            };
        });
    },

    readPerson(req, res, next) {
        res.status(200).json(personlist).end();
    },

    updatePerson(req, res, next) {
        let user = new Person("Robin", "Schellius")
        res.status(200).json(user).end();
    },

    deletePerson(req, res, next) {
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

        let user = new Person("Robin", "Schellius")
        res.status(200).json(user).end();
    }

}