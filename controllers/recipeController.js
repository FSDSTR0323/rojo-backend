const { Recipe } = require('../database');

const getRecipesForCustomer = async (req, res) => {
  const { customerId } = req.jwtPayload;

  try {
    const foundRecipes = await Recipe.find({
      customer: customerId,
      deletedAt: { $exists: false },
    })
      .select('name haccps action imageUrl createdBy modifiedBy')
      .populate({
        path: 'haccps',
        select: '-order',
        options: { sort: { order: 1 } },
      })
      .populate('createdBy modifiedBy')
      .exec();
    return res.status(200).json(foundRecipes);
  } catch (error) {
    return res.status(500).json(error);
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
    return res.status(500).json(error);
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
    return res.status(500).json(error);
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
    return res.status(500).json(error);
  }
};

module.exports = {
  getRecipesForCustomer,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
