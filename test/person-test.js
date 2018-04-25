//
// Testing the Person class (unittest)
//
const chai = require('chai')
const Person = require('../model/Person')
const assert = require('assert')

chai.should()

describe('Person', () => {
    
    it('should raise an exception when arguments are missing', (done) => {

        try {
            let person
            person = new Person('firstname')
            person = new Person('', 'lastname')
            person = new Person('firstname', '')
            assert.fail('We should not get here')
        }
        catch(ex){
            // should raise an exception
            done()
        }

    })
    
    it.skip('should raise an exception when arguments are not strings', (done) => {

        assert.throws(() => {
                // The following instances should not be created - 
                // an AssertionError should be thrown
                let person
                person = new Person(1, 2)
                person = new Person(1, [1, 2])
                person = new Person({ a: 2 }, [1, 2, 3])
            },
            assert.AssertionError
        );
        done()
    })
    
})