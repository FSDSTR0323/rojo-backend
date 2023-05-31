const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HaccpSchema = new Schema(
  {
    name: { type: String, required: true },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Haccp', HaccpSchema);
