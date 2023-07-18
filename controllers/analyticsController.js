const { Recipe, Validation, User } = require('../database');
const formatDate = require('../utils/helperFunctions/formatDate');

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
  const validations = await Validation.find(filter)
    .populate({ path: 'createdBy', select: 'firstName lastName nickname' })
    .select('name validationStatus createdAt');

  return validations.map((validation) => ({
    _id: validation._id,
    name: validation.name,
    createdBy: `${validation.createdBy.firstName} ${validation.createdBy.lastName}`,
    nickname: validation.createdBy.nickname,
    status: validation.validationStatus,
    createdAt: formatDate(validation.createdAt),
  }));
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
