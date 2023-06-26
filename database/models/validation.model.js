const mongoose = require('mongoose');
const { StepSchema } = require('../schemas/step.schema');

const Schema = mongoose.Schema;

const validationSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
    name: { type: String, required: true },
    steps: [StepSchema],
    validationStatus: { type: Boolean, required: true },
    deletedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Validation', validationSchema);
