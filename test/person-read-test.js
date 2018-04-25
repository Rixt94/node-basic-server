var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

chai.should();

chai.use(chaiHttp);

const urlToTest = '/api/persons' 

describe('Person GET', () => {

    it('should return an array of persons when getting a list', (done) => {
        chai.request(server)
            .get(urlToTest)
            .end( (err, res) => {
                res.should.have.status(200);
                console.log(res.body)
                // res.body.should.be.an('array').with.lengthOf(0);
                done();
            });
    });

    it.skip('should throw a 404 error with correct contents when getting a person by invalid id', (done) => {
        chai.request(server)
            .get(urlToTest + '/999')
            .end(function (err, res) {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            })
    });

    it.skip('should return the correct person when getting a person by valid id', (done) => {
        chai.request(server)
            .get(urlToTest + '/1')
            .end(function (err, res) {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            })
    });

});