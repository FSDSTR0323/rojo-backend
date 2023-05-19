const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const preparationSchema = Schema(
	{
		user: [{ type: Schema.Types.ObjectId, ref: 'user' }],
		recipe: [{ type: Schema.Types.ObjectId, ref: 'recipe' }],
		violations: [{ type: Schema.Types.ObjectId, ref: 'haccp' }],
		status: [{ type: Schema.Types.ObjectId, ref: 'recipeStatus' }],
		deletedAt: { type: Date },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('preparation', preparationSchema);