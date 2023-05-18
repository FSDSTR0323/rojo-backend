const mongoose = require('mongoose');
const {Schema} = mongoose.Schema;

const userSchema = Schema ({
    _id: Schema.Types.ObjectId,
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    role: [{ type: Schema.Types.ObjectId, ref: 'role'}],
    createdAt: {type: Date},
    mofifiedAt: {type: Date},
    deletedAt: {type: Date},
});



const model = mongoose.model ('user', userSchema);
module.exports = model;