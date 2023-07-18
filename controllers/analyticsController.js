const { Recipe, Validation, User } = require('../database');

const getKpis = async (filter) => {
  const recipeCount = await Recipe.countDocuments(filter);
  const validationCount = await Validation.countDocuments(filter);
  const userCount = await User.countDocuments(filter);

  return {
    Recipes: recipeCount,
    Validations: validationCount,
    Users: userCount,
  };
};

const getValidations = async (filter) => {
  const validations = Validation.find(filter)
    .populate({ path: 'createdBy', select: 'firstName lastName nickname' })
    .select('name validationStatus');

  return validations;
};

const getData = async (req, res) => {
  const { start, end } = req.query;
  const { customerId } = req.jwtPayload;

  const filter = {
    customer: customerId,
  };
  if (start) filter.createdAt = { ...filter.createdAt, $gte: start };
  if (end) filter.createdAt = { ...filter.createdAt, $lte: end };

  const kpis = await getKpis(filter);
  const validationList = await getValidations(filter);

  return res.status(200).json({
    kpis,
    validationList,
  });
};

module.exports = {
  getData,
};
