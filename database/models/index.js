// Customer and User Management
const Customer = require('./customer.model');
const User = require('./user.model');
const Role = require('./role.model');
const Permission = require('./permission.model');

// Rules and recipes
const Haccp = require('./haccp.model');
// const Recipe = require('./recipe.model');
// const ValidationRecipe = require('./validationRecipe.model')

module.exports = { User, Role, Customer, Permission, Haccp };
