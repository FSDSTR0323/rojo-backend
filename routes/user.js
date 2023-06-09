const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const userInfoMiddleware = require('../middleware/userInfoMiddleware');

const userController = require('../controllers/userController.js');

router.post('/register', userController.registerCustomerAndUser);
router.post('/login', userController.login);
router.get(
  '/',
  jwtMiddleware,
  userInfoMiddleware,
  userController.getCurrentUserInfo
);
router.get('/list', jwtMiddleware, userController.getCustomerUsers);
router.post('/', jwtMiddleware, userController.addUserInExistingCustomer);
router.put(
  '/:userId',
  jwtMiddleware,
  userController.editUserInExistingCustomer
);
router.delete(
  '/:userId',
  jwtMiddleware,
  userController.deleteUserInExistingCustomer
);

module.exports = router;
