const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
	{
		customerName: { type: String, required: true },
		customerAddress: { type: String }, // TODO: Add required when needed
		customerEmail: { type: String, required: true }, // Will be the same as the owner's
		customerCif: { type: String, required: true, unique: true }, // TODO: Add required when needed
		// TODO: Add IBAN
		//TODO: Add phone when needed
		deletedAt: { type: Date },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Customer', CustomerSchema);
