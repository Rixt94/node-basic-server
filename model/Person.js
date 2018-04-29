//
// Person class
//
const assert = require('assert')

class Person {

    constructor(firstname, lastname){
        // Verify that we create a valid person
        assert(typeof (firstname) === 'string', 'firstname must be a string')
        assert(typeof (lastname) === 'string', 'lastname must be a string')
        assert(firstname.trim().length > 2, 'firstname must be at least 3 characters')
        assert(lastname.trim().length > 2, 'lastname must be at least 3 characters')

        this.name = {
            firstname: firstname.trim(),  // remove whitespace in front and at end
            lastname:  lastname.trim()
        }
    }

    getfirstname(){
        return this.name.firstname;
    }

    getlastname(){
        return this.name.lastname;
    }

    // Other class functions here
}

module.exports = Person;
