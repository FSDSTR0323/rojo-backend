const mongoose = require('mongoose');
const INGREDIENTS_STATUS = require('../../utils/constants/ingredientsStatus');
const HACCP_STEPS = require('../../utils/constants/haccpSteps');

const Schema = mongoose.Schema;

const HaccpSchema = new Schema(
  {
    name: { type: String, required: true },
    step: { type: String, enum: Object.values(HACCP_STEPS), required: true },
    ingredientsStatus: {
      type: String,
      enum: Object.values(INGREDIENTS_STATUS),
      required: true,
    },
    hazzard: [{ type: String, required: true }],
    control: [{ type: String, required: true }],
    procedure: [{ type: String, required: true }],
    frequency: [{ type: String, required: true }],
    limits: [{ type: String, required: true }],
    correctiveActions: [{ type: String, required: true }],
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Haccp', HaccpSchema);