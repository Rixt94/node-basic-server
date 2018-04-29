var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../server')

chai.should()

chai.use(chaiHttp)

describe('Person API POST', () => {
    it('should return a valid person when posting a valid object', (done) => {
        chai.request(server)
            .post('/api/persons')
            .send({
                "name": {
                    "firstname": "  FirstName  ",
                    "lastname": "  LastName   "
                }
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('name').which.is.an('object')
                const name = response.name
                name.should.have.property('firstname').equals('FirstName')
                name.should.have.property('lastname').equals('LastName')
                done()
        })
    })

    it('should throw an error when no firstname is provided', (done) => {
        chai.request(server)
            .post('/api/persons')
            .send({
                "name": {
                    "lastname": "  LastName   "
                }
            })
            .end((err, res) => {
                res.should.have.status(422)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(422)
                error.should.have.property('datetime')

                done()
            })
    })

    it('should throw an error when no valid firstname is provided', (done) => {
        // Write your test here
        done()
    })

    it('should throw an error when no lastname is provided', (done) => {
        // Write your test here
        done()
    })

    it('should throw an error when no valid lastname is provided', (done) => {
        // Write your test here
        done()
    })

})

describe('Person API GET', () => {
    it('should return an array of persons', (done) => {
        // Write your test here
        done()
    })

})

describe('Person API PUT', () => {
    it('should return the updated person when providing valid input', (done) => {
        chai.request(server)
            .put('/api/persons/0')
            .send({
                "name": {
                    "firstname": "NewFirstName",
                    "lastname": "NewLastName"
                }
            })
            .end((err, res) => {
                // Check: 
                // Verify that the person that we get is the updated person.
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('name').which.is.an('object')
                const name = response.name
                name.should.have.property('firstname').equals('NewFirstName')
                name.should.have.property('lastname').equals('NewLastName')

                // Double check:
                // Send a GET-request to verify that the person has been updated.
                chai.request(server)
                    .get('/api/persons')
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.an('array')
                        const result = res.body
                        result[0].name.should.have.property('firstname').equals('NewFirstName')
                        result[0].name.should.have.property('lastname').equals('NewLastName')

                        done()
                    })
            })
    })

})