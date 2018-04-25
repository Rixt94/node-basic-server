// 
//
//
const assert = require('assert')

class Person {

    constructor(firstname, lastname){
        assert(firstname, "Parameter 'firstname' is missing.");
        assert(lastname, "Argument 'lastname' is missing.");

        this.name = {
            firstname: firstname,
            lastname: lastname
        }
    }

    getfirstname(){
        return this.name.firstname;
    }
}

module.exports = Person;
