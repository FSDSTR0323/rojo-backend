const { Haccp } = require('../database');

const getHaccps = async (req, res) => {
  let { ingredientsStatus, keep, use } = req.query;

  ingredientsStatus = ingredientsStatus?.split(',');
  keep = keep?.split(',');
  use = use?.split(',');

  const filter = { $or: [] };

  if (ingredientsStatus && ingredientsStatus.length > 0)
    filter['ingredientsStatus'] = { $in: ingredientsStatus };

  if (keep && keep.length > 0)
    filter.$or.push({ 'action.keep': { $in: keep } });

  if (use && use.length > 0) filter.$or.push({ 'action.use': { $in: use } });

  if (filter.$or.length === 0) delete filter.$or;

  try {
    const haccps = await Haccp.find(filter).sort('order');

    return res.status(200).send(haccps);
  } catch (error) {
    return res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
};

module.exports = {
  getHaccps,
};
