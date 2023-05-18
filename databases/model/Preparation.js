const mongoose = require('mongoose');
const {Schema} = mongoose.Schema;

const preparationSchema = Schema ({
    _id: Schema.Types.ObjectId,
    user: [{ type: Schema.Types.ObjectId, ref: 'user'}],
    recipe: [{ type: Schema.Types.ObjectId, ref: 'recipe'}],
    violations: [{ type: Schema.Types.ObjectId, ref: 'haccp'}],
    status: [{ type: Schema.Types.ObjectId, ref: 'recipeStatus'}],
    createdAt: {type: Date},
    modifiedAt: {type: Date},
    deletedAt: {type: Date},
});



const model = mongoose.model ('preparation', preparationSchema);
module.exports = model;