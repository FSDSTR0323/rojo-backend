const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Customer } = require('../database/');
const jwtSecret = process.env.JWT_SECRET;

const authRouter = express.Router();

const properties = ['firstName', 'lastName', 'nickname', 'password', 'email'];

authRouter.post('/register', async (req, res) => {
	const { firstName, lastName, nickname, password, email } = req.body;
	const { customerName, customerAddress, customerEmail, customerCif } =
		req.body;

	console.log(req.body);
	// * Make sure request has the email
	if (!firstName || !lastName || !nickname || !password || !email) {
		let errorMessage = '';

		properties.forEach((prop) => {
			if (!req.body[prop]) {
				errorMessage += `${prop} not received\n`;
			}
		});

		return res.status(400).json({ error: { register: errorMessage } });
	}

	// TODO: Try - catch
	const existingUser = await User.findOne({ nickname: nickname });
	const existingCustomer = await Customer.findOne({ cif: customerCif });
	// * If the user is found, return an error because there is already a user registered
	if (existingUser) {
		return res
			.status(400)
			.json({ error: { nickname: 'Nickname already registered' } });
	} else if (existingCustomer) {
		return res.status(400).json({ error: { cif: 'CIF already registered' } });
	} else {
		// Register company first
		//TODO: Try-catch (return 500 error)
		const newCustomer = new Customer({
			name: customerName,
			address: customerAddress,
			email: customerEmail,
			cif: customerCif,
		});
		const savedCustomer = await newCustomer.save();

		//Register user
		//TODO: Try-catch
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
					permissions: savedUser.getPermissions(), //TODO: Depending on the role generate permissions
				},
			});
		} else {
			return res
				.status(500)
				.json({ error: { firstName: 'Error creating new User :(', err } });
		}
	}
});

// ! --------------------------------------

authRouter.post('/login', async (req, res) => {
	const { nickname, password } = req.body;
	// * Validate, email and password were provided in the request
	if (!nickname || !password) {
		return res
			.status(400)
			.json({ error: { login: 'Missing email or password' } });
	}
	try {
		const foundUser = await User.findOne({ nickname });
		if (!foundUser) {
			return res
				.status(400)
				.json({ error: { nickname: 'User not found, please Register' } });
		}
		// * Validate password with bcrypt library
		if (!foundUser.comparePassword(password)) {
			return res.status(400).json({ error: { password: 'Invalid Password' } });
		}
		// * if everything is ok, return the new token and user data
		return res.status(200).json({
			token: foundUser.generateJWT(),
			user: {
        firstName: foundUser.firstName,
        email: foundUser.email,
        role: foundUser.role,
        permissions: foundUser.getPermissions(), //TODO: Depending on the role generate permissions
			},
		});
	} catch (err) {
    console.log(err)
		return res
			.status(500)
			.json({ error: { register: 'Error Login in :(', error: err.message } });
	}
});

const jwtMiddleware = (req, res, next) => {
	// Recogemos el header "Authorization". Sabemos que viene en formato "Bearer XXXXX...",
	// así que nos quedamos solo con el token y obviamos "Bearer "
	const authHeader = req.headers['authorization'];

	if (!authHeader)
		return res.status(401).json({ error: 'Unauthorized MISSING HEADER' });
	const token = authHeader.split(' ')[1];
	// Si no hubiera token, respondemos con un 401
	if (!token)
		return res.status(401).json({ error: 'Unauthorized and missing token' });

	let tokenPayload;

	try {
		// Si la función verify() funciona, devolverá el payload del token
		tokenPayload = jwt.verify(token, jwtSecret);
	} catch (error) {
		// Si falla, será porque el token es inválido, por lo que devolvemo error 401
		return res.status(401).json({ error: 'Unauthorized' });
	}

	// Guardamos los datos del token dentro de req.jwtPayload, para que esté accesible en los próximos objetos req
	req.jwtPayload = tokenPayload;
	next();
};

module.exports = {
	authRouter,
	jwtMiddleware,
};
