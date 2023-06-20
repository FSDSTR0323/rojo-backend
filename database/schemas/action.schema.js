const mongoose = require('mongoose');
const RECIPE_ACTIONS = require('../../utils/constants/recipeActions');

const Schema = mongoose.Schema;

const ActionSchema = new Schema(
  {
    keep: [{ type: String, enum: RECIPE_ACTIONS.keep }],
    use: [{ type: String, enum: RECIPE_ACTIONS.use }],
  },
  { _id: false }
);

const ActionSchemaValidator = () => ({
  validate: {
    validator: (value) => value.keep.length > 0 || value.use.length > 0,
    message: 'At least one option in action (keep or use) should have a value',
  },
});

module.exports = { ActionSchema, ActionSchemaValidator };
