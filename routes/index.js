const express = require("express");
const router = express.Router();

const userRouter = require('./user');
const { jwtMiddleware, authRouter } = require("../security");

router.use("/", authRouter);
router.use("/user", jwtMiddleware, userRouter);


module.exports = router;
