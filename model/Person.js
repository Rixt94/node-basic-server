//
// Person class
//
const assert = require('assert')

class Person {

    constructor(firstname, lastname){
        assert(typeof (firstname) === 'string', 'firstname must be a string')
        assert(typeof (lastname) === 'string', 'lastname must be a string')
        assert(firstname.trim().length > 2, 'firstname must be at least 3 characters')
        assert(lastname.trim().length > 2, 'lastname must be at least 3 characters')

        this.firstname = firstname.trim();
        this.lastname = lastname.trim();
    }

    getfirstname(){
        return this.firstname;
    }
}

module.exports = Person;
