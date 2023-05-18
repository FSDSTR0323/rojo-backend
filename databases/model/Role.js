const mongoose = require('mongoose');
const {Schema} = mongoose.Schema;

const roleSchema = Schema ({
    _id: Schema.Types.ObjectId,
    firstName: {type: String, required: true},
    permissions: [],
    createdAt: {type: Date},
    mofifiedAt: {type: Date},
    deletedAt: {type: Date},
});


const model = mongoose.model ('role', roleSchema);
module.exports = model;