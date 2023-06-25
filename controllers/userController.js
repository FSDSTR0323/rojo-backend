const mongoose = require('mongoose');
const { User, Customer, Role } = require('../database');
const { ROLES } = require('../utils/constants/roles');

const registerCustomer = async (req, session) => {
  const { customerName, customerAddress, email, customerCif } = req.body;

  const existingCustomer = await Customer.findOne({ customerCif });
  if (existingCustomer)
    return { error: { status: 400, message: 'CIF already registered' } };

  // Save Customer
  const newCustomer = new Customer({
    customerName,
    customerAddress,
    customerEmail: email,
    customerCif,
  });
  const savedCustomer = await newCustomer.save({ session });
  return savedCustomer
    ? savedCustomer
    : { error: { status: 500, message: 'Error saving new Customer' } };
};

const registerUser = async (req, customerId, session) => {
  const {
    firstName,
    lastName,
    nickname,
    password,
    email,
    role,
    profileImageUrl,
  } = req.body;

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
    profileImageUrl,
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
  const userData = req.userData;

  const userInfo = {
    nickname: userData.nickname,
    email: userData.email,
    role: userData.role.name,
    permissions: userData.role.permissions.map((permission) => permission.code),
    profileImageUrl: userData.profileImageUrl,
  };

  return res.status(200).json(userInfo);
};

const getCustomerUsers = async (req, res) => {
  const { customerId } = req.jwtPayload;

  try {
    const foundUsers = await User.find({
      customer: customerId,
      deletedAt: { $exists: false },
    })
      .populate('role')
      .exec();

    if (foundUsers.length === 0)
      return res.status(404).json({
        error: { customer: 'No users for the given customerId' },
      });

    const userList = foundUsers.map((user) => {
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        nickname: user.nickname,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role.name,
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

const addUser = async (req, res) => {
  const { customerId, id } = req.jwtPayload;
  const {
    firstName,
    lastName,
    nickname,
    password,
    email,
    role,
    profileImageUrl,
  } = req.body;

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
      profileImageUrl,
      createdBy: id,
    });

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ error: { message: 'Error adding a new user into customer' } });
  }
};

const editUser = async (req, res) => {
  const { id } = req.jwtPayload;
  const userId = req.params.userId;
  const { firstName, lastName, email, role, profileImageUrl } = req.body;

  try {
    const existingUser = await User.findById(userId).populate('role').exec();
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

    if (role !== undefined && existingUser.role.name === ROLES.OWNER) {
      return res.status(400).json({
        error: { message: 'User with Owner role cannnot edit its own role' },
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          firstName: firstName || existingUser.firstName,
          lastName: lastName || existingUser.lastName,
          email: email || existingUser.email,
          role: existingUser.role._id || existingRole._id,
          profileImageUrl: profileImageUrl || existingUser.profileImageUrl,
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

const deleteUser = async (req, res) => {
  const { id } = req.jwtPayload;
  const userId = req.params.userId;

  if (userId === id)
    return res.status(400).json({
      error: {
        message:
          'User to delete is the same as the user requesting the deletion. Unauthorised action',
      },
    });

  try {
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
        deletedBy: id,
      },
    });
    return res.status(200).send('User Deleted');
  } catch (error) {
    return res.status(500).json({ error: { message: 'Error deleting user' } });
  }
};

module.exports = {
  registerCustomerAndUser,
  login,
  getCurrentUserInfo,
  getCustomerUsers,
  addUser,
  editUser,
  deleteUser,
};
