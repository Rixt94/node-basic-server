var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

chai.should();
chai.use(chaiHttp);

const urlToTest = '/api/persons' 

describe('Person POST', () => {
    
    after(() => {
        // server.close()
        console.log('after was called')
    });
    
    it('should return a valid error when firstname is missing', (done) => {
        chai.request(server)
            .post(urlToTest)
            .send({
                lastname: 'lastname'
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });

    it('should return a valid error when firstname is empty', (done) => {
        chai.request(server)
            .post(urlToTest)
            .send({
                firstname: '',
                lastname: 'lastname'
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });

    it('should return a valid error when lastname is missing', (done) => {
        chai.request(server)
            .post(urlToTest)
            .send({
                firstname: 'firstname'
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });

    it('should return a valid error when lastname is empty', (done) => {
        chai.request(server)
            .post(urlToTest)
            .send({
                firstname: 'firstname',
                lastname: ''
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });

    it('should return a valid person when posting valid information', (done) => {
        chai.request(server)
            .post(urlToTest)
            .send({
                firstname: 'FirstName',
                lastname: 'LastName'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                const person = res.body
                person.should.have.property('name')
                const name = res.body.name
                name.should.have.property('firstname').equal('FirstName')
                name.should.have.property('lastname').equal('LastName')
                done();
            });
    });

});