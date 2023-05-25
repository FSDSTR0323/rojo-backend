const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const authRouter = require('../security');

const jwtMiddleware = require('../middleware/jwtMiddleware');

router.use('/', authRouter);
router.use('/user', jwtMiddleware, userRouter);

module.exports = router;
