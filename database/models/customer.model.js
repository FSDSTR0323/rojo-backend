const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
	{
		name: { type: String, required: true },
		address: { type: String }, // TODO: Add required when needed
		email: { type: String, required: true, unique: true }, // Will be the same as the owner's
		cif: { type: String, required: true, unique: true }, // TODO: Add required when needed
		// TODO: Add IBAN
		//TODO: Add phone when needed
		deletedAt: { type: Date },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Customer', customerSchema);
