const { Haccp } = require('../database');

const getHaccps = async (req, res) => {
  const { ingredientsStatus } = req.query;

  const filter = ingredientsStatus.split(',');

  try {
    const haccps = await Haccp.find({ ingredientsStatus: { $in: filter } });

    return res.status(200).send(haccps);
  } catch (error) {
    return res
      .status(500)
      .json({ error: { message: 'Invalid ingredientsStatus' } });
  }
};

module.exports = {
  getHaccps,
};
