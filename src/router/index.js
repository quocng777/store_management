const router = require('express').Router();
const requireAuth = require('../middleware/require-auth-middleware');
const authRouter = require('./auth-router');
const storeRouter = require('./store-router');

router.use('/auth', authRouter);

router.use('/stores', requireAuth, storeRouter);

module.exports = router;