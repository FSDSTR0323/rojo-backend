const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');

const userController = require('../controllers/userController.js');

router.post('/register', userController.registerCustomerAndUser);
router.post('/login', userController.login);
router.get('/', jwtMiddleware, userController.getCurrentUserInfo);
router.get('/list', jwtMiddleware, userController.getCustomerUsers);
router.post('/', jwtMiddleware, userController.addUserInExistingCustomer);

// // PUT update user by ID
// router.put('/:id', userController.updateUser);

// // DELETE user by ID
// router.delete('/:id', userController.deleteUser);

// // DELETE (soft)

// router.delete('/:id/softdelete', userController.softdeleteUser);

module.exports = router;
