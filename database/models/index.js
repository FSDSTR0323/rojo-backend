// Customer and User Management
const Customer = require('./customer.model');
const User = require('./user.model');
const Role = require('./role.model');
const Permission = require('./permission.model');
const Restaurant = require('./restaurant.model');

// Rules and recipes
const Haccp = require('./haccp.model');
const Preparation = require('./preparation.model');
const Recipe = require('./recipe.model');
const RecipeStatus = require('./recipeStatus.model');

module.exports = { User, Role, Customer, Permission };
