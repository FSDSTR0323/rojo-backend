const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const userInfoMiddleware = require('../middleware/userInfoMiddleware');
const checkPermissionsMiddleware = require('../middleware/checkPermissionsMiddleware');

const PERMISSIONS = require('../utils/constants/permissions');

const customerController = require('../controllers/customerController');

router.get(
  '/',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.CUSTOMER_READ),
  customerController.getCustomerInfo
);

module.exports = router;
