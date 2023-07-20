const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StepSchema = new Schema(
  {
    haccp: { type: Schema.Types.ObjectId, ref: 'Haccp', required: true },
    valid: { type: Boolean, required: true },
    correctiveAction: {
      type: String,
      // required: function () {
      //   return this.valid !== 'true';
      // },
    },
    comment: {
      type: String,
      // required: function () {
      //   return this.valid !== 'true';
      // },
    },
  },
  { _id: false }
);

module.exports = { StepSchema };
