const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const haccpPreparationSchema = new Schema(
  {
    name: { type: String, required: true },
    status: { type: String, required: true },
    hazzzardControl: { type: String, required: true },
    procedure: { type: String, required: true },
    frequency: { type: String, required: true },
    limits: { type: String, required: true },
    correctiveActions: { type: [ObjectId], required: true},
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Haccp', haccpPreparationSchema);
