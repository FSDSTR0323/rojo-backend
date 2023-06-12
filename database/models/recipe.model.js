const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    name: { type: String, required: true },
    haccpPrePreparation: { type: [ObjectId], required: true },
    haccpPreparation: { type: [ObjectId], required: true },
    haccpFinalitzation: { type: [ObjectId], required: true },
    image: { type: String, required: true },
    createdBy: { type: ObjectId, required: true},
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

//TODO: CreatedBy, ModifiedBy

module.exports = mongoose.model('Recipe', RecipeSchema);
