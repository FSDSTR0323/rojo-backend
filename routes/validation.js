const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const checkPermissionsMiddleware = require('../middleware/checkPermissionsMiddleware');
const checkRequiredParamsMiddleware = require('../middleware/checkRequiredParamsMiddleware');

const PERMISSIONS = require('../utils/constants/permissions');

const validationController = require('../controllers/validationController');

router.get(
  '/',
  jwtMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.VALIDATION_READ),
  validationController.getValidationsForCustomer
);

router.post(
  '/',
  jwtMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.VALIDATION_CREATE),
  validationController.addValidation
);

router.delete(
  '/:validationId',
  jwtMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.VALIDATION_DELETE),
  validationController.deleteValidation
);

module.exports = router;
