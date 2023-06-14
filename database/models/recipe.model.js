const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    name: { type: String, required: true },
    haccp: [{ type: Schema.Types.ObjectId, ref: 'Haccp', required: true }],
    image: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    modifiedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

//TODO: CreatedBy, ModifiedBy

module.exports = mongoose.model('Recipe', RecipeSchema);
