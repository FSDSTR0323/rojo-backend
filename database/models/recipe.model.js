const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const recipeSchema = Schema(
	{
		name: { type: String, required: true },
		steps: [
			{
				name: { type: String },
				haccp: { type: Schema.Types.ObjectId, ref: 'haccp' },
			},
		], //// això no ho tinc gaire clar, si es ok així
		deletedAt: { type: Date },
	},
	{
		timestamps: true,
	}
);

//TODO: CreatedBy, ModifiedBy

module.exports = mongoose.model('Recipe', recipeSchema);

