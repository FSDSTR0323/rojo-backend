const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const userInfoMiddleware = require('../middleware/userInfoMiddleware');
const checkPermissionsMiddleware = require('../middleware/checkPermissionsMiddleware');

const PERMISSIONS = require('../utils/constants/permissions');

const haccpController = require('../controllers/haccpController');

router.get(
  '/',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.HACCP_READ),
  haccpController.getHaccps
);

module.exports = router;
