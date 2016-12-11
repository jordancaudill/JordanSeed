var router = require('express').Router();
var userSchema = require('../schemas/userSchema');

router.post('/users', createUser);

function createUser(req, res, next) {
    console.log('creating user:', req.body);
    userSchema.create(req.body, function (err, user) {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(201).send(user);
    });
}

// Make these endpoints available
module.exports = router;
