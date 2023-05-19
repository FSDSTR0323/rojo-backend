const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const haccpSchema = Schema(
	{
		name: { type: String, required: true },
		deletedAt: { type: Date },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('haccp', haccpSchema);
