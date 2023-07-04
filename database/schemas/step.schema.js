const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StepSchema = new Schema(
  {
    haccp: { type: Schema.Types.ObjectId, ref: 'Haccp', required: true },
    valid: { type: Boolean, required: true },
    correctiveActions: {
      type: [String],
      validate: {
        validator: function () {
          return (
            !this.valid ||
            (this.correctiveActions && this.correctiveActions.length > 0)
          );
        },
        message: 'Corrective actions are required for invalid steps.',
      },
    },
    comment: {
      type: String,
      validate: {
        validator: function () {
          return !this.valid || this.comment;
        },
        message: 'A comment is required for invalid steps.',
      },
    },
  },
  { _id: false }
);

module.exports = { StepSchema };
