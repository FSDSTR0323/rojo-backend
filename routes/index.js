const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const haccpRouter = require('./haccp');

router.use('/user', userRouter);
router.use('/haccp', haccpRouter);

module.exports = router;
