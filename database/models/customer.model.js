const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    customerName: { type: String, required: true, trim: true },
    customerAddress: { type: String, trim: true }, // TODO: Add required when needed
    customerEmail: { type: String, required: true, unique: true, trim: true }, //TODO: Validate email format
    customerCif: { type: String, required: true, unique: true, trim: true },
    // TODO: Add IBAN
    // TODO: Add phone when needed
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Customer', CustomerSchema);
