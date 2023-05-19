const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const recipeSatusSchema = Schema(
	{
		status: { type: String, required: true },
		deletedAt: { type: Date },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('RecipeStatus', recipeSatusSchema);
