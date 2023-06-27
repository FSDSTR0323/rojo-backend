const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const userInfoMiddleware = require('../middleware/userInfoMiddleware');
const checkPermissionsMiddleware = require('../middleware/checkPermissionsMiddleware');
const checkRequiredParamsMiddleware = require('../middleware/checkRequiredParamsMiddleware');

const PERMISSIONS = require('../utils/constants/permissions');

const recipeController = require('../controllers/recipeController');

router.get(
  '/:recipeId?',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.RECIPE_READ),
  recipeController.getRecipes
);

router.post(
  '/',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.RECIPE_CREATE),
  checkRequiredParamsMiddleware(['name', 'haccps', 'action', 'imageUrl']),
  recipeController.addRecipe
);

router.put(
  '/:recipeId',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.RECIPE_UPDATE),
  recipeController.updateRecipe
);

router.delete(
  '/:recipeId',
  jwtMiddleware,
  userInfoMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.RECIPE_DELETE),
  recipeController.deleteRecipe
);

module.exports = router;
