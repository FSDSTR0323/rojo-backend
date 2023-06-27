const { Recipe } = require('../database');

const getRecipeList = async (customerId) => {
  const recipeList = await Recipe.find({
    customer: customerId,
  }).select('name imageUrl');
  return recipeList;
};

const getRecipeById = async (customerId, recipeId) => {
  const recipe = await Recipe.find({
    customer: customerId,
    _id: recipeId,
  })
    .select('name haccps action imageUrl createdBy modifiedBy')
    .populate({
      path: 'haccps',
      options: { sort: { order: 1 } },
    })
    .populate('createdBy modifiedBy')
    .exec();

  return recipe;
};

const getRecipes = async (req, res) => {
  const { customerId } = req.jwtPayload;
  const recipeId = req.params.recipeId;

  try {
    if (recipeId) {
      const recipe = await getRecipeById(customerId, recipeId);
      return res.status(200).json(recipe);
    } else {
      const recipeList = await getRecipeList(customerId);
      return res.status(500).json(recipeList);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
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
    return res.status(500).json({ error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  const { customerId, id } = req.jwtPayload;
  const recipeId = req.params.recipeId;
  const updatedFields = req.body;

  try {
    const recipe = await Recipe.findOne({
      _id: recipeId,
      customer: customerId,
    });

    if (!recipe) {
      return res.status(404).json({ error: { message: 'Recipe not found' } });
    }

    Object.assign(recipe, updatedFields, { modifiedBy: id });

    await recipe.save();

    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.jwtPayload;
  const recipeId = req.params.recipeId;

  try {
    const existingRecipe = await Recipe.findById(recipeId);

    if (!existingRecipe)
      return res.status(404).json({
        error: {
          message: 'recipeId does not exist',
        },
      });

    await Recipe.findByIdAndUpdate(recipeId, {
      $set: {
        deletedAt: new Date(),
        deletedBy: id,
      },
    });
    return res.status(200).send('Recipe Deleted');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
