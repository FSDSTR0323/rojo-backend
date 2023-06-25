const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/jwtMiddleware');
const checkPermissionsMiddleware = require('../middleware/checkPermissionsMiddleware');
const checkRequiredParamsMiddleware = require('../middleware/checkRequiredParamsMiddleware');

const PERMISSIONS = require('../utils/constants/permissions');

const recipeController = require('../controllers/recipeController');

router.get(
  '/',
  jwtMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.RECIPE_READ),
  recipeController.getRecipesForCustomer
);

router.post(
  '/',
  jwtMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.RECIPE_CREATE),
  checkRequiredParamsMiddleware(['name', 'haccps', 'action', 'imageUrl']),
  recipeController.addRecipe
);

router.put(
  '/:recipeId',
  jwtMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.RECIPE_UPDATE),
  recipeController.updateRecipe
);

router.delete(
  '/:recipeId',
  jwtMiddleware,
  checkPermissionsMiddleware(PERMISSIONS.RECIPE_DELETE),
  recipeController.deleteRecipe
);

module.exports = router;
