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

    if (!user) {
      return res.status(404).json({ error: { id: 'User not found' } });
    }

    req.userData = user;

    // Logs
    console.log('Permissions', user.role.permissions.map(permission => permission.code))
    next();
  } catch (error) {
    return res.status(500).json({ error: { message: error.message } });
  }
};

module.exports = userInfoMiddleware;
