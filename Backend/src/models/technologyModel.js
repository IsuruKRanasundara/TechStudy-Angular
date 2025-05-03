const mongoose = require('mongoose');
const { Schema } = mongoose;
const technologySchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        required: true,
    },
    tags: {
        type: [String],
        required: false,
    },
});

const lecNoteTechStack = mongoose.model('Technology', technologySchema);
module.exports = lecNoteTechStack;