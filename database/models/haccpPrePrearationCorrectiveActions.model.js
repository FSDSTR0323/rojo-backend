const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const haccpPrePreparationCorrectiveActionsSchema = new Schema(
  {
    haccpPrePreparationId: { type: ObjectId, required: true},
    description: { type: String, required: true},
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Haccp', haccpPrePreparationCorrectiveActionsSchema);
