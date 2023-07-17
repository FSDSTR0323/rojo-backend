const { Recipe, Validation, User } = require('../database');

const getKpis = async (req) => {
  const { start, end } = req.query;
  const { customerId } = req.jwtPayload;

  const filter = {
    customer: customerId,
  };
  if (start) filter.createdAt = { ...filter.createdAt, $gte: start };
  if (end) filter.createdAt = { ...filter.createdAt, $lte: end };

  const recipeCount = await Recipe.countDocuments(filter);
  const validationCount = await Validation.countDocuments(filter);
  const userCount = await User.countDocuments(filter);

  return {
    Recipes: recipeCount,
    Validations: validationCount,
    Users: userCount,
  };
};

const getData = async (req, res) => {
  const kpis = await getKpis(req, res);

  return res.status(200).json({
    kpis,
  });
};

module.exports = {
  getData,
};
