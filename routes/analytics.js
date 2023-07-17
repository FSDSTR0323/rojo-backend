const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const userInfoMiddleware = require('../middleware/userInfoMiddleware');
const checkPermissionsMiddleware = require('../middleware/checkPermissionsMiddleware');

const PERMISSIONS = require('../utils/constants/permissions');

const analyticsController = require('../controllers/analyticsController');

router.get(
  '/',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.CUSTOMER_READ),
  analyticsController.getData
);

module.exports = router;
