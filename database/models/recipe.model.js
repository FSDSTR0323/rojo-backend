const mongoose = require('mongoose');

const {
  ActionSchema,
  ActionSchemaValidator,
} = require('../schemas/action.schema');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    name: { type: String, required: true, trim: true },
    haccps: [{ type: Schema.Types.ObjectId, ref: 'Haccp', required: true }],
    action: {
      type: ActionSchema,
      ...ActionSchemaValidator,
      required: true,
    },
    imageUrl: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    modifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    deletedAt: { type: Date },
    deletedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Recipe', RecipeSchema);
