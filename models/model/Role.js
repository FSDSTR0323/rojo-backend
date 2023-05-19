const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const roleSchema = Schema(
	{
		firstName: { type: String, required: true },
		permissions: [],
		deletedAt: { type: Date },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('role', roleSchema);
