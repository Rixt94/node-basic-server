//
// Unittest for the Person class
//
const chai = require('chai')
const Person = require('../model/Person')
const assert = require('assert')

chai.should()

describe('Person', () => {

    it('should accept exactly two arguments', (done) => {
        assert.throws(() => new Person())
        assert.throws(() => new Person(''))
        assert.throws(() => new Person('', '', ''))
        done()            
    })

    it('should accept only two strings as arguments', (done) => {        
        assert.throws(() => new Person(1, 2))
        assert.throws(() => new Person({}, {}))
        assert.throws(() => new Person([], []))
        done()            
    })

    it('should be intitialized successfully when providing valid arguments', (done) => {
        const person = new Person('  abc  ', '  def  ')
        person.should.have.property('firstname').equals('abc')
        person.should.have.property('lastname').equals('def')
        done()
    })

})
