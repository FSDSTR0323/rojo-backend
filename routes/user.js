const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const userInfoMiddleware = require('../middleware/userInfoMiddleware');
const checkPermissionsMiddleware = require('../middleware/checkPermissionsMiddleware');
const checkRequiredParamsMiddleware = require('../middleware/checkRequiredParamsMiddleware');

const PERMISSIONS = require('../utils/constants/permissions');

const userController = require('../controllers/UserController');

router.post(
  '/register',
  checkRequiredParamsMiddleware([
    'customerName',
    'customerCif',
    'firstName',
    'lastName',
    'nickname',
    'email',
    'password',
    'role',
  ]),
  userController.registerCustomerAndUser
);
router.post(
  '/login',
  checkRequiredParamsMiddleware(['nickname', 'password']),
  userController.login
);
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
  checkRequiredParamsMiddleware([
    'firstName',
    'lastName',
    'nickname',
    'password',
    'role',
  ]),
  userController.addUser
);
router.put(
  '/:userId',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.USER_UPDATE),
  userController.editUser
);
router.delete(
  '/:userId',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.USER_DELETE),
  userController.deleteUser
);

module.exports = router;
