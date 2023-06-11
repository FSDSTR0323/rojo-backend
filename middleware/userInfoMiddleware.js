const { User } = require('../database/');

const userInfoMiddleware = async (req, res, next) => {
  const { id, customerId } = req.jwtPayload;

  try {
    const user = await User.findOne({ _id: id, customer: customerId })
      .populate('customer')
      .populate({
        path: 'role',
        populate: {
          path: 'permissions',
        },
      })
      .exec();

    

    req.userData = user;
    next();
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
};

module.exports = userInfoMiddleware;
