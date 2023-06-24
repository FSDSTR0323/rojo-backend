const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validationSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
    name: { type: String, required: true },
    steps: [
      {
        haccp: { type: Schema.Types.ObjectId, ref: 'Haccp', required: true },
        valid: { type: Boolean, required: true },
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

module.exports = mongoose.model('Validation', validationSchema);
