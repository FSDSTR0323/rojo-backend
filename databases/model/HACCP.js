const mongoose = require('mongoose');
const {Schema} = mongoose.Schema;

const haccpSchema = Schema ({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    createdAt: {type: Date},
    modifiedAt: {type: Date},
    deletedAt: {type: Date},
});



const model = mongoose.model ('haccp', haccpSchema);
module.exports = model;