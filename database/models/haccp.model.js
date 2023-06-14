const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HaccpSchema = new Schema(
  {
    name: { type: String, required: true },
    step: { type: String, required: true }, // Pre-preparation, Preparation, FInalization
    ingredientsStatus: { type: String, required: true }, // chill, frozen, dry, defrost
    hazzardControl: { type: String, required: true },
    procedure: { type: String, required: true },
    frequency: { type: String, required: true },
    limits: { type: String, required: true },
    correctiveActions: [
      {
        //Objecte d'objectes
        id: { type: String, required: true }, //Es podria crear amb uuid4
        description: { type: String, required: true },
      },
    ],
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Haccp', HaccpSchema);
