const router = require('express').Router();
const authController = require('../controller/auth-controller');
const passport = require('../config/passport');

router.post('/register', authController.register);

router.post('/login', passport.authenticate('local'), authController.login);

router.post('/verify-account', authController.verifyAccount);

module.exports = router;