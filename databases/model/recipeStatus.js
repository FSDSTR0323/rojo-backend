const mongoose = require('mongoose');
const {Schema} = mongoose.Schema;

const recipeSatusSchema = Schema ({
    _id: Schema.Types.ObjectId,
    status: {type: String, required: true},
    createdAt: {type: Date},
    modifiedAt: {type: Date},
    deletedAt: {type: Date},
});



const model = mongoose.model ('recipeStatus', recipeSatusSchema);
module.exports = model;