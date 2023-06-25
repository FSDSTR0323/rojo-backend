const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const userInfoMiddleware = require('../middleware/userInfoMiddleware');
const checkPermissionsMiddleware = require('../middleware/checkPermissionsMiddleware');
const checkRequiredParamsMiddleware = require('../middleware/checkRequiredParamsMiddleware');

const PERMISSIONS = require('../utils/constants/permissions');

const validationController = require('../controllers/validationController');

router.get(
  '/',
  jwtMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.VALIDATION_READ)
);

module.exports = router;
