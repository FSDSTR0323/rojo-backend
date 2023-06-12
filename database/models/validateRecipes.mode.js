const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateRecipesSchema = new Schema(
  {
    recipeId: { type: ObjectId, required: true },
    createdBy: { type: ObjectId, required: true },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Haccp', validateRecipesSchema);
