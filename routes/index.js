const express = require('express');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();
const userRouter = require('./user');
const authRouter = require('./auth');

router.use('/', authRouter);
router.use('/user', jwtMiddleware, userRouter);

module.exports = router;
