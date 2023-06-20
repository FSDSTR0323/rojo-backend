const { Haccp } = require('../database');

const getHaccps = async (req, res) => {
  const { ingredientsStatus, keep, use } = req.query;

  let filter = {};

  if (ingredientsStatus) {
    filter = {
      ...filter,
      ingredientsStatus: {
        $in: ingredientsStatus?.split(',') || [],
      },
    };
  }

  if (keep) {
    filter = {
      ...filter,
      'finalStatus.keep': {
        $in: keep.split(','),
      },
    };
  }

  if (use) {
    filter = {
      ...filter,
      'finalStatus.use': {
        $in: use.split(','),
      },
    };
  }

  try {
    const haccps = await Haccp.find(filter);

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
