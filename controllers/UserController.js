const mongoose = require('mongoose');
const checkRequiredProperties = require('../utils/helperFunctions/checkRequiredProperties');
const { User, Customer, Role } = require('../database/');
const { ROLES } = require('../utils/constants/roles');

// Verify user by nickname or email, if it doesn't exists create new one
const registerCustomer = async (req, session) => {
  const { customerName, customerAddress, customerEmail, customerCif } =
    req.body;

  // Check required parameters for Customer
  const requiredProperties = ['customerName', 'customerEmail', 'customerCif'];
  const errorMessage = checkRequiredProperties(req, requiredProperties);
  if (errorMessage) return { error: { status: 400, message: errorMessage } };

  const existingCustomer = await Customer.findOne({ customerCif });
  if (existingCustomer)
    return { error: { status: 400, message: 'CIF already registered' } };

  // Save Customer
  const newCustomer = new Customer({
    customerName,
    customerAddress,
    customerEmail,
    customerCif,
  });
  const savedCustomer = await newCustomer.save({ session });
  return savedCustomer
    ? savedCustomer
    : { error: { status: 500, message: 'Error saving new Customer' } };
};

const registerUser = async (req, customerId, session) => {
  const { firstName, lastName, nickname, password, email, role } = req.body;

  // Check required parameters for User
  const requiredProperties = [
    'firstName',
    'lastName',
    'nickname',
    'password',
    'role',
  ];
  const errorMessage = checkRequiredProperties(req, requiredProperties);
  if (errorMessage) return { error: { status: 400, message: errorMessage } };

  const existingUser = await User.findOne({ nickname }).session(session);
  const existingCustomer = await Customer.findById(customerId).session(session);
  const existingRole = await Role.findOne({ name: role });

  if (existingUser)
    return { error: { status: 400, message: 'Nickname already registered' } };
  if (!existingCustomer)
    return { error: { status: 404, message: 'CustomerId not found' } };
  if (!existingRole)
    return { error: { status: 400, message: 'Invalid user role' } };

  // Save user
  const newUser = new User({
    customer: customerId,
    firstName,
    lastName,
    nickname,
    password,
    email: role === ROLES.OWNER ? existingCustomer.customerEmail : email,
    role: existingRole._id,
  });
  const savedUser = await newUser.save({ session });
  return savedUser
    ? savedUser
    : { error: { status: 500, message: 'Error saving new User' } };
};

const registerCustomerAndUser = async (req, res) => {
  const session = await mongoose.startSession(); // using sessions to make sure we only save a customer if a user is valid

  try {
    session.startTransaction();

    const savedCustomer = await registerCustomer(req, session);
    const savedUser = await registerUser(req, savedCustomer.id, session);

    // Close session and don't store anything if there's any error in either User or Customer
    if (savedCustomer.error || savedUser.error) {
      await session.abortTransaction();
      session.endSession();

      if (savedCustomer.error)
        return res
          .status(savedCustomer.error.status)
          .json({ error: savedCustomer.error.message });
      if (savedUser.error)
        return res
          .status(savedUser.error.status)
          .json({ error: savedUser.error.message });
    }

    await session.commitTransaction();
    session.endSession();

    if (savedUser) {
      return res.status(201).json({
        token: savedUser.generateJWT(),
      });
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      error: { register: 'Error Registering user', error: error.message },
    });
  }
};

const login = async (req, res) => {
  const { nickname, password } = req.body;

  // Check required parameters for User login
  const requiredProperties = ['nickname', 'password'];
  const errorMessage = checkRequiredProperties(req, requiredProperties);
  if (errorMessage) {
    return res.status(400).json({ error: { login: errorMessage } });
  }

  try {
    // check for duplicate user
    const foundUser = await User.findOne({ nickname });
    if (!foundUser) {
      return res
        .status(404)
        .json({ error: { nickname: 'User not found, please register' } });
    }
    // validate password with bcrypt library
    if (!foundUser.comparePassword(password)) {
      return res.status(400).json({ error: { password: 'Invalid Password' } });
    }

    // check for existing role
    const foundRole = await Role.findById(foundUser.role)
      .populate('permissions')
      .exec();

    if (!foundRole) {
      return res
        .status(404)
        .json({ error: { role: 'Role not found, please enter a valid one' } });
    }

    // if everything is ok, return the new token and user data
    return res.status(200).json({
      token: foundUser.generateJWT(),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: { register: 'Error Logging in', error: error.message } });
  }
};

const getCurrentUserInfo = async (req, res) => {
  const { id } = req.jwtPayload;

  try {
    const foundUser = await User.findById(id)
      .populate({
        path: 'role',
        populate: {
          path: 'permissions',
        },
      })
      .exec();

    if (!foundUser)
      return res.status(404).json({ error: { id: 'User not found' } });

    const userInfo = {
      nickname: foundUser.nickname,
      email: foundUser.email,
      role: foundUser.role.name,
      permissions: foundUser.role.permissions.map(
        (permission) => permission.code
      ),
    };
    return res.status(200).json(userInfo);
  } catch (error) {
    return res.status(500).json({
      error: { userInfo: 'Error getting user info', error: error.message },
    });
  }
};

const getCustomerUsers = async (req, res) => {
  const { customerId } = req.jwtPayload;

  try {
    const foundUsers = await User.find({
      customer: customerId,
      deletedAt: { $exists: false },
    });

    if (foundUsers.length === 0)
      return res.status(404).json({
        error: { customer: 'No users for the given customerId' },
      });

    const userList = foundUsers.map((user) => {
      return {
        _id: user._id,
        customer: user.customer,
        firstName: user.firstName,
        lastName: user.lastName,
        nickname: user.nickname,
        email: user.email,
        role: user.role,
      };
    });

    return res.status(200).json(userList);
  } catch (error) {
    return res.status(500).json({
      error: {
        getUserList: 'Error getting user list from customer',
        error: error.message,
      },
    });
  }
};

const addUserInExistingCustomer = async (req, res) => {
  const { customerId, id } = req.jwtPayload;
  const { firstName, lastName, nickname, password, email, role } = req.body;

  // Check required parameters for User
  const requiredProperties = [
    'firstName',
    'lastName',
    'nickname',
    'password',
    'role',
  ];
  const errorMessage = checkRequiredProperties(req, requiredProperties);
  if (errorMessage)
    return res.status(400).json({ error: { message: errorMessage } });

  try {
    const existingUser = await User.findOne({ nickname });
    if (existingUser)
      return res.status(400).json({
        error: {
          message: 'nickname already registered for the given customerId',
        },
      });

    const foundRole = await Role.findOne({ name: role });
    if (!foundRole)
      return res.status(400).json({
        error: {
          message: 'Invalid user role',
        },
      });

    const newUser = new User({
      customer: customerId,
      firstName,
      lastName,
      nickname,
      password,
      email,
      role: foundRole._id,
      createdBy: id,
    });

    const savedUser = await newUser.save();
    return res.status(201).json({
      token: savedUser.generateJWT(),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: { message: 'Error adding a new user into customer' } });
  }
};

const editUserInExistingCustomer = async (req, res) => {
  const { id } = req.jwtPayload;
  const userId = req.params.userId;
  const { firstName, lastName, email, role } = req.body;

  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        error: {
          message: 'userId does not exist',
        },
      });
    }

    const existingRole =
      (await Role.findOne({ name: role })) ||
      (await Role.findById(existingUser.role));

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          firstName: firstName || existingUser.firstName,
          lastName: lastName || existingUser.lastName,
          email: email || existingUser.email,
          role: existingUser.role || existingRole._id,
          modifiedBy: id,
        },
      },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: { message: 'Error editing user' } });
  }
};

const deleteUserInExistingCustomer = async (req, res) => {
  const userId = req.params.userId;

  try {
    //TODO: Encapsulate into a function
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({
        error: {
          message: 'userId does not exist',
        },
      });
    }

    await User.findByIdAndUpdate(userId, {
      $set: {
        deletedAt: new Date(),
      },
    });
    return res.status(200).send('User Deleted');
  } catch (error) {
    return res.status(500).json({ error: { message: 'Error editing user' } });
  }
};

module.exports = {
  registerCustomerAndUser,
  login,
  getCurrentUserInfo,
  getCustomerUsers,
  addUserInExistingCustomer,
  editUserInExistingCustomer,
  deleteUserInExistingCustomer,
};
