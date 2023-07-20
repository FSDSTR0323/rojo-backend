const ROLES = require('../../utils/constants/roles');
const permissions = require('./permissions.sample');

const roles = [
  {
    name: ROLES.OWNER,
    permissions: permissions,
  },
  {
    name: ROLES.HEAD,
    permissions: permissions.filter(
      (permission) =>
        permission.code.includes('recipe') ||
        permission.code.includes('validation') ||
        permission.code.includes('haccp')
    ),
  },
  {
    name: ROLES.CHEF,
    permissions: permissions.filter(
      (permission) =>
        permission.code.includes('recipe.read') ||
        permission.code.includes('validation')
    ),
  },
];

module.exports = roles;
