
var router = require('express').Router();
var userSchema = require('../schemas/userSchema');

router.get('/users', createUser);

function createUser(req, res, next) {
    return res.status(201).send(user);
    User.create(req.body, function (err, user) {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(201).send(user);
    });
}

// Make these endpoints available
module.exports = router;
