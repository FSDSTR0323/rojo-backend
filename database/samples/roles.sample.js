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
        permission.code.includes('validation')
    ),
  },
  {
    name: 'chef',
    permissions: permissions.filter((permission) =>
      permission.code.includes('validation')
    ),
  },
];

module.exports = roles;
