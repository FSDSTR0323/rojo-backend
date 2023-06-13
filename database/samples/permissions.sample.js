const PERMISSIONS = require('../../utils/constants/permissions');

const permissions = [
  {
    code: PERMISSIONS.USER_CREATE,
    description: 'Allows to create new users inside a Customer',
  },
  {
    code: PERMISSIONS.USER_READ,
    description: 'Allows to check the list of users inside a Customer',
  },
  {
    code: PERMISSIONS.USER_UPDATE,
    description: 'Allows to edit existing users inside a Customer',
  },
  {
    code: PERMISSIONS.USER_DELETE,
    description: 'Allows to (soft) delete users inside a Customer',
  },
  {
    code: PERMISSIONS.RECIPE_CREATE,
    description: 'Allows to create a recipe',
  },
  {
    code: PERMISSIONS.RECIPE_READ,
    description: 'Allows to check all recipes',
  },
  {
    code: PERMISSIONS.RECIPE_UPDATE,
    description: 'Allows to modify a recipe',
  },
  {
    code: PERMISSIONS.RECIPE_DELETE,
    description: 'Allows to delete a recipe',
  },
  {
    code: PERMISSIONS.VALIDATION_CREATE,
    description: 'Allows to create a validation',
  },
  {
    code: PERMISSIONS.VALIDATION_READ,
    description: 'Allows to check all validations',
  },
  {
    code: PERMISSIONS.VALIDATION_UPDATE,
    description: 'Allows to modify a validation',
  },
  {
    code: PERMISSIONS.VALIDATION_UPDATE,
    description: 'Allows to delete a validation',
  },
];

module.exports = permissions;
