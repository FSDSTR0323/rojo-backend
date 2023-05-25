const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkRequiredProperties = require('../utils/checkRequiredProperties');
const { User, Customer } = require('../database/');

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
		const existingCustomer = await Customer.findOne({ cif: customerCif });

		// Checking if trying to register an already existing User and Customer
		if (existingUser) {
			return res
				.status(400)
				.json({ error: { nickname: 'Nickname already registered' } });
		} else if (existingCustomer) {
			return res.status(400).json({ error: { cif: 'CIF already registered' } });
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

			//Register user
			const newUser = new User({
				customerId: savedCustomer._id,
				firstName,
				lastName,
				nickname,
				password,
				email,
				role: 1,
			});
			const savedUser = await newUser.save();
			if (savedUser) {
				return res.status(201).json({
					token: savedUser.generateJWT(),
					user: {
						firstName: savedUser.firstName,
						email: savedUser.email,
						role: savedUser.role,
						permissions: savedUser.getPermissions(),
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
				.json({ error: { nickname: 'User not found, please Register' } });
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
				email: foundUser.email,
				role: foundUser.role,
				permissions: foundUser.getPermissions(),
			},
		});
	} catch (err) {
		return res
			.status(500)
			.json({ error: { register: 'Error Logging in', error: err.message } });
	}
};

module.exports = { registerUser, login };
