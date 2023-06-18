const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    name: { type: String, required: true },
    address: { type: String }, // TODO: Add required when needed
    phoneNumber: { type: Number },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Restaurant', RestaurantSchema);
