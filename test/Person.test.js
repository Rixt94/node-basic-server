//
// Unittest for the Person class
//
var chai = require('chai');

chai.should();

describe('A valid Person', () => {

    it('should return a valid person when posting a valid object', (done) => {
            const person = new Person('  FirstName  ', '  LastName  ')

            person.should.have.status(200);
            person.body.should.be.a('object');

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
                res.should.have.status(404);
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