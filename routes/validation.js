const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const userInfoMiddleware = require('../middleware/userInfoMiddleware');
const checkPermissionsMiddleware = require('../middleware/checkPermissionsMiddleware');

const PERMISSIONS = require('../utils/constants/permissions');

const validationController = require('../controllers/validationController');

router.get(
  '/',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.VALIDATION_READ),
  validationController.getValidationsForCustomer
);

router.post(
  '/',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.VALIDATION_CREATE),
  validationController.addValidation
);

router.delete(
  '/:validationId',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.VALIDATION_DELETE),
  validationController.deleteValidation
);

module.exports = router;
