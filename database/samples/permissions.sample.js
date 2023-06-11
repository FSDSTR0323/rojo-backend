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
    code: PERMISSIONS.PREPARATION_CREATE,
    description: 'Allows to create a preparation',
  },
  {
    code: PERMISSIONS.PREPARATION_READ,
    description: 'Allows to check all preparations',
  },
  {
    code: PERMISSIONS.PREPARATION_UPDATE,
    description: 'Allows to modify a preparation',
  },
  {
    code: PERMISSIONS.PREPARATION_UPDATE,
    description: 'Allows to delete a preparation',
  },
];

module.exports = permissions;
