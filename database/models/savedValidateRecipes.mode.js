const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedValidateReipesSchema = new Schema(
  {
    validateRecipeId: { type: ObjectId, required: true },
    haccpId: { type: ObjectId, required: true },
    typeHaccp: { type: String, required: true },
    status: { type: Boolean, required: true},
    correctiveActionId: { type: ObjectId },
    comment: { type: String },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Haccp', savedValidateReipesSchema);
