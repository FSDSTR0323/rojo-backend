const mongoose = require('mongoose');

const {
  ActionSchema,
  ActionSchemaValidator,
} = require('../schemas/action.schema');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    haccp: [{ type: Schema.Types.ObjectId, ref: 'Haccp', required: true }],
    action: {
      type: ActionSchema,
      ...ActionSchemaValidator,
      required: true,
    },
    image: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    modifiedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Recipe', RecipeSchema);
