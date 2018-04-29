//
// Unittest for the Person class
//
const chai = require('chai')
const Person = require('../model/Person')
const assert = require('assert')

chai.should()

describe('Person', () => {

    it('should accept exactly two arguments', (done) => {
        assert.throws(() => new Person())           // invalid: zero arguments
        assert.throws(() => new Person(''))         // invalid: one argument
        assert.throws(() => new Person('', '', '')) // invalid: three (or more) arguments
        done()            
    })

    it('should accept only two strings as arguments', (done) => {
        assert.throws(() => new Person(1, 2))       // invalid: numbers
        assert.throws(() => new Person({}, {}))     // invalid: objects
        assert.throws(() => new Person([], []))     // invalid: arrays
        assert.throws(() => new Person(true, true)) // invalid: booleans
        done()
    })

    it('should be intitialized successfully when providing valid arguments', (done) => {
        const person = new Person('  abc  ', '  def  ')
        person.should.have.property('name')
        const name = person.name
        name.should.have.property('firstname').equals('abc')
        name.should.have.property('lastname').equals('def')
        done()
    })

})
