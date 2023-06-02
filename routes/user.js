const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');

const userController = require('../controllers/userController.js');

router.post('/register', userController.registerCustomerAndUser);
router.post('/login', userController.login);

// GET user by ID
// router.get('/:id?', (req, res, next) => {
//   User.find({})
//     .then((userDoc) => {
//       console.log(userDoc);
//       res.send('user OK');
//     })
//     .catch((error) => {
//       res.status(500).json({ error: error.message });
//     });
// });

// // POST create a new user if doesn't exists
// router.post('/', userController.createUser);

// // PUT update user by ID
// router.put('/:id', userController.updateUser);

// // DELETE user by ID
// router.delete('/:id', userController.deleteUser);

// // DELETE (soft)

// router.delete('/:id/softdelete', userController.softdeleteUser);

module.exports = router;
