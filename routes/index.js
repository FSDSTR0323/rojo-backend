const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const haccpRouter = require('./haccp');
const recipeRouter = require('./recipe');
const validationRouter = require('./validation');

router.use('/user', userRouter);
router.use('/haccp', haccpRouter);
router.use('/recipe', recipeRouter);
router.use('/validation', validationRouter);

module.exports = router;
