const mongoose = require('mongoose');
const { Recipe } = require('../database');

const getRecipesForCustomer = async (req, res) => {
  const { customerId } = req.jwtPayload;

  const foundRecipes = await Recipe.find({
    customer: customerId,
    deletedAt: { $exists: false },
  })
    .select('name haccps action image createdBy modifiedBy')
    .populate('haccps createdBy modifiedBy')
    .exec();
  return res.status(200).json(foundRecipes);
};

const addRecipe = async (req, res) => {
  const { customerId, id } = req.jwtPayload;
  const { name, haccps, action, imageUrl } = req.body;

  try {
    const newRecipe = new Recipe({
      customer: customerId,
      name,
      haccps,
      action,
      imageUrl,
      createdBy: id,
    });

    const savedRecipe = await newRecipe.save();
    return res.status(201).json(savedRecipe);
  } catch (error) {
    return res
      .status(500)
      .json({ error: { message: 'Error adding a new recipe' } });
  }
};

const updateRecipe = async (req, res) => {};

const deleteRecipe = async (req, res) => {};

module.exports = {
  getRecipesForCustomer,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
