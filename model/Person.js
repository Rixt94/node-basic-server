// module.exports = {}

class Person {

    constructor(firstname, lastname, username, password){
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
    }

    getfirstname(){
        return this.firstname;
    }
}

module.exports = Person;
