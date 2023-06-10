const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const userInfoMiddleware = require('../middleware/userInfoMiddleware');
const checkPermissionsMiddleware = require('../middleware/checkPermissionsMiddleware')

const PERMISSIONS = require('../utils/constants/permissions')

const userController = require('../controllers/userController.js');

router.post('/register', userController.registerCustomerAndUser);
router.post('/login', userController.login);
router.get(
  '/',
  jwtMiddleware,
  userInfoMiddleware,
  userController.getCurrentUserInfo
);
router.get(
  '/list',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.USER_READ),
  userController.getCustomerUsers
);
router.post(
  '/',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.USER_CREATE),
  userController.addUserInExistingCustomer
);
router.put(
  '/:userId',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.USER_UPDATE),
  userController.editUserInExistingCustomer
);
router.delete(
  '/:userId',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.USER_DELETE),
  userController.deleteUserInExistingCustomer
);

module.exports = router;
