const { User, Customer, Role } = require('../database/');

const userInfoMiddleware = async (req, res, next) => {
  const { id, customerId } = req.jwtPayload;

  try {
    const user = await User.findOne({ _id: id, customerId })
      .populate('customerId')
      .populate({
        path: 'roleId',
        populate: {
          path: 'permissions',
        },
      })
      .exec();



    console.log(user);
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }

  next();

  /*
  const user = await User.findOne({ customerId, id });
  const customer = await Customer.findById(user.customerId);
  const role = await Role.findById(user.roleId).populate('permissions').exec();

  if (!user)
    return res.status(404).json({
      error: {
        message:
          'Authentication user error. The user does not exist in the database',
      },
    });
  if (!customer)
    return res.status(404).json({
      error: {
        message:
          'Authentication user error. The user does not exist in the database',
      },
    });
  if (!role)
    return res.status(404).json({
      error: {
        message:
          'Authentication user error. User role does not exist in the database',
      },
    });


  req.user = next();*/
};

module.exports = userInfoMiddleware;
