var router = require('express').Router();
var User = require('../schemas/userSchema');

router.post('/users', createUser);
router.get('/users', getUsers);

function createUser(req, res, next) {
    User.findOne({ email: req.body.email }, function (err, existingUser) {
        if (existingUser) {
            return res.status(400).send('A user with that email already exists.');
        } else {
            User.create(req.body, function (err, user) {
                if (err) {
                    return res.status(400).send(err);
                }
                return res.status(201).send(user);
            });
        }
    });
}

function getUsers(req, res, next) {
    User.find({}, function (err, users) {
         if (err) {
             return res.status(400).send(err);
         }
         return res.status(200).send(users);
    });
}

// Make these endpoints available
module.exports = router;
