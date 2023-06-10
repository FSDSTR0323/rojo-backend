const permissions = [
  {
    code: 'user.create',
    description: 'Allows to create new users inside a Customer',
  },
  {
    code: 'user.read',
    description: 'Allows to check the list of users inside a Customer',
  },
  {
    code: 'user.update',
    description: 'Allows to edit existing users inside a Customer',
  },
  {
    code: 'user.delete',
    description: 'Allows to (soft) delete users inside a Customer',
  },
  {
    code: 'recipe.create',
    description: 'Allows to create a recipe',
  },
  {
    code: 'recipe.read',
    description: 'Allows to check all recipes',
  },
  {
    code: 'recipe.update',
    description: 'Allows to modify a recipe',
  },
  {
    code: 'recipe.delete',
    description: 'Allows to delete a recipe',
  },
  {
    code: 'preparation.create',
    description: 'Allows to create a recipe',
  },
  {
    code: 'preparation.read',
    description: 'Allows to check all recipes',
  },
  {
    code: 'preparation.update',
    description: 'Allows to modify a recipe',
  },
  {
    code: 'preparation.delete',
    description: 'Allows to delete a recipe',
  },
];

module.exports = permissions;
