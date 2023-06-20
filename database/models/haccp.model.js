const mongoose = require('mongoose');
const INGREDIENTS_STATUS = require('../../utils/constants/ingredientsStatus');
const RECIPE_ACTIONS = require('../../utils/constants/recipeActions');
const HACCP_STEPS = require('../../utils/constants/haccpSteps');

const Schema = mongoose.Schema;

const HaccpSchema = new Schema(
  {
    name: { type: String, required: true },
    step: { type: String, enum: Object.values(HACCP_STEPS), required: true },
    ingredientsStatus: [
      {
        type: String,
        enum: Object.values(INGREDIENTS_STATUS),
        required: true,
      },
    ],
    finalStatus: {
      keep: [{ type: String, enum: RECIPE_ACTIONS.keep }],
      use: [{ type: String, enum: RECIPE_ACTIONS.use }],
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

// Validate that finalStatus has at least one value in any of its keys
HaccpSchema.pre('save', function (next) {
  if (!this.finalStatus.keep.length && !this.finalStatus.use.length) {
    const error = new Error(
      'At least one option in finalStatus should have a value'
    );
    return next(error);
  }
  next();
});

module.exports = mongoose.model('Haccp', HaccpSchema);
