const mongoose = require('mongoose');
const ROLES = require('../../utils/constants/roles');

const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    name: { type: String, required: true, enum: Object.values(ROLES) },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Permission',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Role', RoleSchema);
