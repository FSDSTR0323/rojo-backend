const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preparationSchema = new Schema(
	{
		user: [{ type: Schema.Types.ObjectId, ref: 'user' }],
		recipe: [{ type: Schema.Types.ObjectId, ref: 'recipe' }],
		violations: [{ type: Schema.Types.ObjectId, ref: 'haccp' }],
		status: [{ type: Schema.Types.ObjectId, ref: 'recipeStatus' }],
		deletedAt: { type: Date },
		createdBy: { type: Schema.Types.ObjectId, ref: 'user' }
		//TODO: Created by, Modified by
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Preparation', preparationSchema);