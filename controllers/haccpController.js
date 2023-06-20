const { Haccp } = require('../database');

const getHaccps = async (req, res) => {
  const { ingredientsStatus } = req.query;
  let { keep, use } = req.query;

  const filter = {
    ingredientsStatus: { $in: ingredientsStatus },
    $or: [],
  };

  keep = keep?.split(',');
  use = use?.split(',');

  if (keep && keep.length > 0)
    filter.$or.push({ 'action.keep': { $in: keep } });

  if (use && use.length > 0) filter.$or.push({ 'action.use': { $in: use } });

  if (filter.$or.length === 0) delete filter.$or;

  // let filter = {};

  // if (ingredientsStatus) {
  //   filter = {
  //     ...filter,
  //     ingredientsStatus: {
  //       $in: ingredientsStatus?.split(','),
  //     },
  //   };
  // }

  // if (keep) {
  //   filter = {
  //     ...filter,
  //     'action.keep': {
  //       $in: keep.split(','),
  //     },
  //   };
  // }

  // if (use) {
  //   filter = {
  //     ...filter,
  //     'action.use': {
  //       $in: use.split(','),
  //     },
  //   };
  // }

  try {
    const haccps = await Haccp.find(filter);

    console.log(filter);

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
