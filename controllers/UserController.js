const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkRequiredProperties = require('../utils/helperFunctions/checkRequiredProperties');
const { ROLES } = require('../utils/constants/roles');
const { User, Customer, Role } = require('../database/');

// Verify user by nickname or email, if it doesn't exists create new one



const register = async (req, res) => {
  const { firstName, lastName, nickname, password, email } = req.body;
  const { customerName, customerAddress, customerEmail, customerCif } =
    req.body;

  // Check required parameters for User and Customer
  const requiredProperties = [
    'firstName',
    'lastName',
    'nickname',
    'password',
    'email',
    'customerName',
    'customerAddress',
    'customerEmail',
    'customerCif',
  ];
  const errorMessage = checkRequiredProperties(req, requiredProperties);
  if (errorMessage) {
    return res.status(400).json({ error: { register: errorMessage } });
  }

  // Register user and customer
  try {
    const existingUser = await User.findOne({ nickname });
    const existingCustomer = await Customer.findOne({ customerCif });
    const role = await Role.findOne({ name: ROLES.OWNER })
      .populate('permissions')
      .exec(); // TODO: Change the type of role if a new user is registered or if this function is refactored (to be passed via params)

    // Checking if trying to register an already existing User and Customer
    if (existingUser) {
      return res
        .status(400)
        .json({ error: { nickname: 'Nickname already registered' } });
    } else if (existingCustomer) {
      return res
        .status(400)
        .json({ error: { customerCif: 'CIF already registered' } });
    } else {
      // No duplicated user nor customer
      // Register Customer
      const newCustomer = new Customer({
        customerName,
        customerAddress,
        customerEmail,
        customerCif,
      });
      const savedCustomer = await newCustomer.save();

      // Register User
      const newUser = new User({
        customerId: savedCustomer._id,
        firstName,
        lastName,
        nickname,
        password,
        email,
        role,
      });

      const savedUser = await newUser.save();
      if (savedUser) {
        return res.status(201).json({
          token: savedUser.generateJWT(),
          user: {
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
            role: savedUser.role,
          },
        });
      } else {
        return res
          .status(500)
          .json({ error: { firstName: 'Error creating new User :(', err } });
      }
    }
  } catch (err) {
    return res.status(500).json({
      error: { register: 'Error Registering user', error: err.message },
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
        .status(400)
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
    if(!foundRole) {
      return res
        .status(400)
        .json({ error: { role: 'Role not found, please enter a valid one' } });
    }

    // if everything is ok, return the new token and user data
    return res.status(200).json({
      token: foundUser.generateJWT(),
      user: {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        role: foundRole,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: { register: 'Error Logging in', error: err.message } });
  }
};



// const createUser = async (req, res) => {
//   try {
//     const { customerId, firstName, lastName, nickname, email, password, role } =
//       req.body;

//     const existingUser = await User.findOne({
//       $or: [{ nickname: nickname }, { email: email }],
//     });

//     if (existingUser) {
//       return res.status(409).json({ msg: 'User already exists' });
//     }

//     // Validate if customerId is a valid ObjectId (24 num)
//     if (!mongoose.Types.ObjectId.isValid(customerId)) {
//       return res.status(400).json({ msg: 'Invalid customerId' });
//     }

//     // Validate if role is a valid ObjectId (24 num)
//     if (!mongoose.Types.ObjectId.isValid(role)) {
//       return res.status(400).json({ msg: 'Invalid role' });
//     }

//     const newUser = new User({
//       customerId,
//       firstName,
//       lastName,
//       nickname,
//       email,
//       password,
//       role,
//     });

//     const savedUser = await newUser.save();

//     res.status(200).json({
//       msg: 'User successfully created',
//       user: savedUser,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { createUser };

// // Verify user by nickname or userId and update it

// const updateUser = (req, res) => {
//   const userId = req.params.id;
//   const { firstName, lastName, nickname, email, password, role } = req.body;

//   User.findOneAndUpdate(
//     { $or: [{ _id: userId }, { nickname: nickname }] },
//     {
//       $set: {
//         firstName,
//         lastName,
//         nickname,
//         email,
//         password,
//         role,
//       },
//     },
//     { new: true }
//   )
//     .then((updatedUser) => {
//       if (updatedUser) {
//         res.status(200).json(updatedUser);
//       } else {
//         res.status(404).json({ msg: 'User not found' });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ error: error.message });
//     });
// };

// // Delete user (removed from data base)

// const deleteUser = (req, res) => {
//   const userId = req.params.id;

//   User.findByIdAndRemove(userId)
//     .then((deletedUser) => {
//       if (deletedUser) {
//         res.status(200).json({ msg: 'User deleted successfully' });
//       } else {
//         res.status(404).json({ msg: 'User not found' });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ error: error.message });
//     });
// };

// // Soft delete

// const softdeleteUser = (req, res) => {
//   const userId = req.params.id;

//   User.findByIdAndUpdate(userId, { isDeleted: true })
//     .then((updatedUser) => {
//       if (updatedUser) {
//         res.status(200).json({ msg: 'User deleted successfully' });
//       } else {
//         res.status(404).json({ msg: 'User not found' });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ error: error.message });
//     });
// };

module.exports = {
  register,
  login,
};
