var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

chai.should();

chai.use(chaiHttp);

describe('Person API POST', () => {
    it('should return a valid person when posting a valid object', (done) => {
        chai.request(server)
            .post('/api/persons')
            .send({
                "firstname": "  FirstName  ",
                "lastname": "  LastName   "
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                let response = res.body
                response.should.have.property('firstname').equals('FirstName')
                response.should.have.property('lastname').equals('LastName')
                done();
        });
    });

    it('should throw an error when no firstname is provided', (done) => {
        chai.request(server)
            .post('/api/persons')
            .send({
                "lastname": "LastName"
            })
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(500)
                error.should.have.property('datetime')

                done();
            });
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

});

describe('Person API GET', () => {
    it('should return an array of persons', (done) => {
        // Write your test here
        done()
    })

});