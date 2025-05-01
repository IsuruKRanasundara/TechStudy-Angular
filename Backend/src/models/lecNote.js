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
}

});





const LecNote = mongoose.model('LecNote', lecNoteSchema);
module.exports = LecNote;


