const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PermissionSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Permission', PermissionSchema);
