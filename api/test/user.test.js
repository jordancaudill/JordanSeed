var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

describe('users api', function() {
    // it('should list ALL users on /users GET', function(done) {
    // });

    it('should add a SINGLE user on /users POST', function(done) {
        var user = {'firstName': 'validName', 'lastName': 'validLastName', 'email': 'validEmail@jsman.com', 'password': 'validPassword'};
        chai.request(server)
            .post('/users')
            .send(user)
            .end(function(err, res){
                res.should.have.status(201);
                done();
            });
    });
    it('should list a SINGLE user on /user/<id> GET');
    it('should update a SINGLE user on /user/<id> PUT');
    it('should delete a SINGLE user on /user/<id> DELETE');
});
