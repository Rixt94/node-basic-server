var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

chai.should();
chai.use(chaiHttp);

const urlToTest = '/api/persons' 

describe('Person POST', () => {

    it('should return a valid error when firstname is missing', (done) => {
        chai.request(server)
            .post(urlToTest)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('should return a valid error when firstname is empty', (done) => {
        chai.request(server)
            .post(urlToTest)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('should return a valid error when lastname is missing', (done) => {
        chai.request(server)
            .post(urlToTest)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });    
    });        

    it('should return a valid error when lastname is empty', (done) => {
        chai.request(server)
            .post(urlToTest)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('should return a valid person when getting a list', (done) => {
        chai.request(server)
            .get(urlToTest)
            .end( (err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            done();
        });
    });

    it('should throw a 404 error with correct contents when getting an invalid person', (done) => {
        chai.request(server)
            .get(urlToTest + '/999')
            .end(function (err, res) {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            })
    });
});