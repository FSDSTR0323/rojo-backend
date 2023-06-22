const mongoose = require('mongoose');
const { Recipe } = require('../database');

const getRecipesForCustomer = async (req, res) => {
  const { customerId } = req.jwtPayload;

  const foundRecipes = await Recipe.find({
    customer: customerId,
  })
    .select('name haccps action image createdBy modifiedBy')
    .populate('haccps createdBy modifiedBy')
    .exec();
  return res.status(200).json(foundRecipes);
};

const addRecipe = async (req, res) => {
};

const updateRecipe = async (req, res) => {};

const deleteRecipe = async (req, res) => {};

module.exports = {
  getRecipesForCustomer,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
