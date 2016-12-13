var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

describe('users api', function() {
    describe('/users POST endpoint', function() {
        it('should add a user with valid data', function(done) {
            var validUser = {'firstName': 'validName', 'lastName': 'validLastName', 'email': new Date().getTime(), 'password': 'validPassword'};
            chai.request(server)
                .post('/users')
                .send(validUser)
                .end(function(err, res){
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('lastName');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('_id');
                    done();
                });
        });

        it('should NOT add a user with invalid data', function(done) {
            var inValidUser = {};
            chai.request(server)
                .post('/users')
                .send(inValidUser)
                .end(function(err, res){
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    done();
                });
        });

        it('should NOT add a user with an existing email address', function(done) {
            var uniqueEmail = new Date().getTime();
            var user = {'firstName': 'validName', 'lastName': 'validLastName', 'email': uniqueEmail, 'password': 'validPassword'};
            chai.request(server)
                .post('/users')
                .send(user)
                .end(function(err, res){
                     chai.request(server)
                    .post('/users')
                    .send(user)
                    .end(function(err, res){
                        res.should.have.status(400);
                        res.error.text.should.be.a('string');
                        res.error.text.should.equal('A user with that email already exists.');
                        done();
                    });
                });
        });
    });

    describe('/users GET endpoint', function() {
        it('should list ALL users', function(done) {
            chai.request(server)
                .get('/users')
                .send()
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/users/:id GET endpoint', function() {
        it('should return a user with a valid ID', function(done) {

        });

        it('should NOT return a user with an invalid ID', function(done) {

        });
    });


    it('should list a SINGLE user on /user/<id> GET');
    it('should update a SINGLE user on /user/<id> PUT');
    it('should delete a SINGLE user on /user/<id> DELETE');
});
