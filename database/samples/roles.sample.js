const ROLES = require('../../utils/constants/roles');
const permissions = require('./permissions.sample');

console.log(permissions)

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
    permissions: permissions.filter((permission) =>
      permission.code.includes('validation')
    ),
  },
];

module.exports = roles;
