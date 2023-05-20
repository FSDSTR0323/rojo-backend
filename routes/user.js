const express = require('express');
const router = express.Router();
const User = require('../database/models/user.model');
const userController = require('../controllers/UserController.js');



/* GET home page. */
router.get('/:id?', (req, res, next) => {
  User.find({}).then(userDoc => console.log(userDoc))
  res.send('user OK');
});

// POST create a new user if doesn't exists
router.post('/', userController.createUser);

// GET user by ID
router.get('/:id', userController.getUser);

// PUT update user by ID
router.put('/:id', userController.updateUser);

// DELETE user by ID
router.delete('/:id', userController.deleteUser);

// DELETE (soft)

router.delete('/:id', userController.softdeleteUser);





module.exports = router;
