const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
	{
		customerId: {
			type: Schema.Types.ObjectId,
			ref: 'Customer',
			required: true,
		},
		name: { type: String, required: true },
		address: { type: String }, // TODO: Add required when needed
		//TODO: Add phone when needed
		deletedAt: { type: Date },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Restaurant', restaurantSchema);
