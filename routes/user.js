const express = require('express');
const router = express.Router();



const { User } = require('../database');
const userController = require('../controllers/UserController.js');



/* GET home page. */
router.get('/:id?', (req, res, next) => {
  User.find({}).then(userDoc => console.log(userDoc))
  res.send('user OK');
});

// POST create a new user if doesn't exists
router.post('/user', userController.createUser);




module.exports = router;
