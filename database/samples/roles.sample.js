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
        permission.code.includes('validation')
    ),
  },
  {
    name: ROLES.CHEF,
    permissions: permissions.filter((permission) =>
      permission.code.includes('validation')
    ),
  },
];

module.exports = roles;
