const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkRequiredProperties = require('../utils/helperFunctions/checkRequiredProperties');
const { ROLES } = require('../utils/constants/roles');
const { User, Customer, Role } = require('../database/');

const registerUser = async (req, res) => {
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
    const foundRole = await Role.findById(foundUser.role)
      .populate('permissions')
      .exec();

    if (!foundUser) {
      return res
        .status(400)
        .json({ error: { nickname: 'User not found, please register' } });
    }
    // validate password with bcrypt library
    if (!foundUser.comparePassword(password)) {
      return res.status(400).json({ error: { password: 'Invalid Password' } });
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

module.exports = { registerUser, login };
