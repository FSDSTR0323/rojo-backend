const permissions = require('./permissions.sample');

const roles = [
  {
    name: 'owner',
    permissions: permissions,
  },
  {
    name: 'headchef',
    permissions: permissions.filter(
      (permission) =>
        permission.code.includes('recipe') ||
        permission.code.includes('preparation')
    ),
  },
  {
    name: 'chef',
    permissions: permissions.filter((permission) =>
      permission.code.includes('preparation')
    ),
  },
];

module.exports = roles;
