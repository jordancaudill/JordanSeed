var router = require('express').Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refresh);

function login(req, res, next) {

}

function logout(req, res, next) {

}

function refresh(req, res, next) {

}

// Make these endpoints available
module.exports = router;
