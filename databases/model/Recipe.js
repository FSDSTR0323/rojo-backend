const mongoose = require('mongoose');
const {Schema} = mongoose.Schema;

const recipeSchema = Schema ({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    steps: [{ 
        name: {type: String},
        haccp: {type: Schema.Types.ObjectId, ref: 'haccp'}}],         //// això no ho tinc gaire clar, si es ok així
    createdAt: {type: Date},
    mofifiedAt: {type: Date},
    deletedAt: {type: Date},
});



const model = mongoose.model ('recipe', recipeSchema);
module.exports = model;