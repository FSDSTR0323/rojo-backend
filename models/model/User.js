const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const userSchema = Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		role: [{ type: Schema.Types.ObjectId, ref: 'role' }],
		deletedAt: { type: Date },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('user', userSchema);
