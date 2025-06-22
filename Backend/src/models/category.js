const mongoose = require('mongoose');
const { Schema } = mongoose;
const categorySchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true,
    },
    
    
});
const category = mongoose.model('Category', categorySchema);
module.exports = category;

