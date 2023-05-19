const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		customerId: {
			type: Schema.Types.ObjectId,
			ref: 'Customer',
			required: true,
		},
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		nickname: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String },
		role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
		//TODO: permissions
		deletedAt: { type: Date },
		createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
		modifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
