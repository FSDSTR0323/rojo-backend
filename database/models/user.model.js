const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = process.env.JWT_TOKEN;
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		customerId: {
			type: Schema.Types.ObjectId,
			ref: 'Customer',
			required: true,
		},
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		nickname: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		email: { type: String },
		role: { type: Number },
		deletedAt: { type: Date },
		createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
		modifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: true,
	}
);

UserSchema.pre('save', function (next) {
	const user = this;

	//si no se ha cambiado la contraseña, seguimos
	if (!user.isModified('password')) return next();

	//brcypt es una libreria que genera "hashes", encriptamos la contraseña
	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);

			// si no ha habido error en el encryptado, guardamos
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function () {
	const today = new Date();
	const expirationDate = new Date();

	expirationDate.setDate(today.getDate() + 60);

	let payload = {
		id: this._id,
		customerId: this.customerId,
		role: this.role,
		//TODO: permissions
	};
	// * This method is from the json-web-token library (who is in charge to generate the JWT
	return jwt.sign(payload, secret, {
		expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
	});
};

UserSchema.methods.getPermissions = () => {
	// TODO: Define permissions per role via an enum
	if (this.role === 1) return ['admin'];
};

module.exports = mongoose.model('User', UserSchema);
