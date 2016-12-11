var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();
chai.use(chaiHttp);

describe('users api', function() {
    it('should list ALL users on /users GET', function(done) {
        chai.request(server)
            .get('/users')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

    it('should add a SINGLE user on /users POST', function(done) {
        chai.request(server)
            .post('/users')
            .send({'name': 'Java', 'lastName': 'Script', 'email': 'javascript@jsman.com', 'password': 'javascriptiscool'})
            .end(function(err, res){
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('SUCCESS');
                res.body.SUCCESS.should.be.a('object');
                res.body.SUCCESS.should.have.property('firstName');
                res.body.SUCCESS.should.have.property('lastName');
                res.body.SUCCESS.should.have.property('email');
                res.body.SUCCESS.should.have.property('lastName');
                res.body.SUCCESS.should.have.property('_id');
                res.body.SUCCESS.firstName.should.equal('Java');
                res.body.SUCCESS.lastName.should.equal('Script');
                res.body.SUCCESS.email.should.equal('javascript@jsman.com');
                res.body.SUCCESS.password.should.equal('javascriptiscool');
                done();
            });
    });
    it('should list a SINGLE user on /user/<id> GET');
    it('should update a SINGLE user on /user/<id> PUT');
    it('should delete a SINGLE user on /user/<id> DELETE');
});
