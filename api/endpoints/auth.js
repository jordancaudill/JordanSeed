var router = require('express').Router();
var User = require('../schemas/userSchema');
var bcrypt = require('bcrypt');
var randToken = require('rand-token');

router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refresh);

function login(req, res, next) { 
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(400).send(err);
        } else if (user == null) {
            return res.status(404).send({});
        } else {
            bcrypt.compare(req.body.password, user.password, function(err, same) {
                if (err) {
                    return res.status(400).send(err);
                } else if (same === false) {
                    return res.status(400).send('Invalid password.');
                } else {
                    // attach token info
                    user.accessToken = randToken.generate(32);
                    user.refreshToken = randToken.generate(32);
                    var currentTime = (new Date()).getTime();
                    // accessToken is valid for 1 hour
                    var hours = 1;
                    user.accessTokenExpires =  currentTime + (1000 * 60 * 60 * hours);
                    // refreshToken is valid for 24 hours
                    hours = 24;
                    user.refreshTokenExpires = currentTime + (1000 * 60 * 60 * hours);
                    User.findByIdAndUpdate(user._id, user, {runValidators: true, new: true}, function (err, savedUser) {
                        if (err) {
                            return res.status(400).send(err);
                        } else if (savedUser == null) {
                            return res.status(404).send({});
                        } else {
                            return res.status(200).send(savedUser);
                        }
                    });
                }
            });
        }
    });
}

function logout(req, res, next) {

}

function refresh(req, res, next) {

}

// Make these endpoints available
module.exports = router;
