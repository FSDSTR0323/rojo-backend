const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { Recipe, Validation, User } = require('../database');
const {
  formatDate,
  generateDateRangeArray,
} = require('../utils/helperFunctions/formatDate');

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
  const data = await model
    .aggregate()
    .match(filter)
    .group({
      _id: { $dateToString: { format: '%d/%m/%Y', date: '$createdAt' } },
      count: { $sum: 1 },
    })
    .sort({ _id: 1 });

  return data;
};

const generateYAxis = (data, xAxis) => {
  const yAxis = Array(xAxis.length).fill(0);

  data.forEach(({ _id, count }) => {
    const index = xAxis.indexOf(_id);
    if (index !== -1) {
      yAxis[index] = count;
    }
  });

  return yAxis;
};

const getData = async (req, res) => {
  const { start, end } = req.query;
  const { customerId } = req.jwtPayload;

  const filter = {
    customer: new ObjectId(customerId),
    deletedAt: { $exists: false },
  };
  if (start) filter.createdAt = { ...filter.createdAt, $gte: new Date(start) };
  if (end) filter.createdAt = { ...filter.createdAt, $lte: new Date(end) };

  try {
    const kpis = await getKpis(filter);
    const validationList = await getValidations(filter);
    const recipesLineChartData = await getLineChart(Recipe, filter);
    const validationsLineChartData = await getLineChart(Validation, filter);

    const dateAxis = generateDateRangeArray(start, end);

    return res.status(200).json({
      kpis,
      validationList,
      lineCharts: [
        {
          seriesName: 'Recipes',
          data: {
            xAxis: generateDateRangeArray(start, end),
            yAxis: generateYAxis(recipesLineChartData, dateAxis),
          },
        },
        {
          seriesName: 'Validations',
          data: {
            xAxis: generateDateRangeArray(start, end),
            yAxis: generateYAxis(validationsLineChartData, dateAxis),
          },
        },
      ],
      pieChart: {
        labels: ['Accepted', 'Refused'],
        data: [
          validationList.filter((validation) => validation.status).length,
          validationList.filter((validation) => !validation.status).length,
        ],
      },
    });
  } catch (error) {
    return res.status(500).json({ error: { message: 'Error accessing data' } });
  }
};

module.exports = {
  getData,
};
