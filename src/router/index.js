const router = require('express').Router();
const authRouter = require('./auth-router');

router.use('/api/v1/auth', authRouter);

module.exports = router;