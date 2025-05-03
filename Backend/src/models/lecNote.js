const mongoose = require('mongoose');
const { Schema } = mongoose;
const lecNoteSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    
    filePath: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
    },





   
    technology: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technology', // Reference to the Technology model
        required: false,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model
        required: true,
    },
});





const lecNote = mongoose.model('LecNote', lecNoteSchema);
module.exports = lecNote;


