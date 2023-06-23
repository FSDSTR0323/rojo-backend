const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const haccpRouter = require('./haccp');
const recipeRouter = require('./recipe')

router.use('/user', userRouter);
router.use('/haccp', haccpRouter);
router.use('/recipe', recipeRouter)

module.exports = router;
