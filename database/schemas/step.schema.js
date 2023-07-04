const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StepSchema = new Schema(
  {
    haccp: { type: Schema.Types.ObjectId, ref: 'Haccp', required: true },
    valid: { type: Boolean, required: true },
    correctiveActions: {
      type: [String],
      validate: {
        validator: function (value) {
          return this.valid || value.length > 0;
        },
        message: 'Corrective actions are required for invalid steps.',
      },
    },
    comment: {
      type: String,
      required: function () {
        return !this.valid;
      },
    },
  },
  { _id: false }
);

module.exports = { StepSchema };
