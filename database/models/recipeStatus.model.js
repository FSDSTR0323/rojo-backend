const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSatusSchema = new Schema(
	{
		status: { type: String, required: true },
		deletedAt: { type: Date },
	},
	{
		timestamps: true,
	}
);

//TODO: CreatedBy, ModifiedBy

module.exports = mongoose.model('RecipeStatus', RecipeSatusSchema);
