const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validationRecipeSchema = new Schema(
  {
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
    steps: [
      {
        haccpId: { type: Schema.Types.ObjectId, ref: 'Haccp', required: true },
        valid: { type: Boolean, required: true },
        correctiveActions: [{ type: String }],
        comment: { type: String },
      },
    ],
    validationStatus: { type: Boolean, required: true },
    deletedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Haccp', validationRecipeSchema);
