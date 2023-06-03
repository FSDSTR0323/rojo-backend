const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret = process.env.JWT_SECRET;
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String }, //TODO: Validate email format
    roleId: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    deletedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    modifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', function (next) {
  const user = this;

  // if structure is unchanged, continue
  if (!user.isModified('password')) return next();

  // bcrypt is a lib to generate "hashes" to encrypt the password
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // if no error with the encryption, override password
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date();

  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    customerId: this.customerId,
  };
  // method from the json-web-token library (who is in charge to generate the JWT)
  return jwt.sign(payload, jwtSecret, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};

module.exports = mongoose.model('User', UserSchema);
