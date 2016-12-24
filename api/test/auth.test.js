var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var User = require('../schemas/userSchema');
var should = chai.should();
chai.use(chaiHttp);

describe('auth api', function() {
    describe('/login POST endpoint', function() {
        it('should log a user in with valid credentials', function(done) {
            // get a user that was created in the user test
            User.findOne({firstName: 'validName'}, function (err, user) {
                var validUser = {email: user.email, password: 'validPassword'};
                chai.request(server)
                    .post('/login')
                    .send(validUser)
                    .end(function(err, res){
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('firstName');
                        res.body.should.have.property('lastName');
                        res.body.should.have.property('email');
                        res.body.should.have.property('accessToken');
                        res.body.should.have.property('refreshToken');
                        res.body.should.have.property('accessTokenExpires');
                        res.body.should.have.property('refreshTokenExpires');
                        res.body.should.have.property('_id');
                        done();
                    });
            });
        });

        it('should NOT log a user in with an invalid email', function(done) {
            var validUser = {email: 'jnejrnherj23323r2gbmtbrg2', password: 'validPassword'};
            chai.request(server)
                .post('/login')
                .send(validUser)
                .end(function(err, res){
                    res.should.have.status(404);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should NOT log a user in with an invalid password', function(done) {
            User.findOne({firstName: 'validName'}, function (err, user) {
                var validUser = {email: user.email, password: 'ertseq68933efrdgredg212'};
                chai.request(server)
                    .post('/login')
                    .send(validUser)
                    .end(function(err, res){
                        res.should.have.status(400);
                        res.text.should.be.a('string');
                        res.text.should.equal('Invalid password.');
                        done();
                    });
            });

        });
    });

    describe('/logout POST endpoint', function() {
    });
    
    describe('/refresh POST endpoint', function() {
    });
});
