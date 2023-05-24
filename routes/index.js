const express = require("express");
const generalRouter = express.Router();

const userRouter = require('./user');
const { jwtMiddleware, authRouter } = require("../security");

generalRouter.use("/", authRouter);
generalRouter.use("/user", jwtMiddleware, userRouter);


module.exports = generalRouter;
