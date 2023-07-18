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

const getLineChart = async (model, filter) => {
  const result = await model
    .aggregate()
    .match(filter)
    .group({
      _id: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } },
      count: { $sum: 1 },
    })
    .sort({ _id: 1 });

  console.log('result', result);
  return result;
};

const getData = async (req, res) => {
  const { start, end } = req.query;
  const { customerId } = req.jwtPayload;

  const filter = {
    //customer: customerId,
  };
  if (start) filter.createdAt = { ...filter.createdAt, $gte: new Date(start) };
  if (end) filter.createdAt = { ...filter.createdAt, $lte: new Date(end) };

  const kpis = await getKpis(filter);
  const validationList = await getValidations(filter);
  const recipesLineChartData = await getLineChart(Recipe, filter);

  return res.status(200).json({
    kpis,
    validationList,
    lineCharts: [
      {
        seriesName: 'Recipes',
        data: recipesLineChartData,
      },
    ],
  });
};

module.exports = {
  getData,
};
