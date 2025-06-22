const lecNote=require('../models/lecNote');
const lectureNoteRes=(lectureNote,res)=>({

    _id:lectureNote._id,
    category:lectureNote.category,
    title:lectureNote.title,
    description:lectureNote.description,
    filePath:lectureNote.filePath,
    createdBy:lectureNote.createdBy
})
const createLecNote = async (req, res) => {
    try {

        const {title, filePath,category,description,createdAt} = req.body;
        const createdBy = req.user._id;

        const lecNoteData = new lecNote({
            category,
            title,
            description,
            filePath,
            createdAt,
            createdBy,
        });
        await lecNoteData.save();
        res.status(201).json(lectureNoteRes(lecNoteData,'Lecture note Created Successfully!'));

    }catch (e){
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }




};
const getAllLecNotes = async (req, res) => {
    try {
        const lecNotes = await lecNote.find();
        const response=lecNotes.map((lecNote)=>{

        })
        res.status(200).json(lectureNoteRes(lecNoteData,'Lecture note Created Successfully!'));
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }
}
const getLecNoteById = async (req, res) => {
    try {
        const lecNoteId = req.params.id;
        const lecNoteData = await lecNote.findById({_id:lecNoteId}).populate('createdBy', 'name email');
        if (!lecNoteData) {
            return res.status(404).json({message: 'Lecture note not found'});
        }
        res.status(200).json(lecNoteData);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }
}
const getLecNoteByUserId = async (req, res) => {
    try {
        const userId = req.user._id;
        const lecNotes = await lecNote.find({createdBy: userId});
        if (!lecNotes) {
            return res.status(404).json({message: 'Lecture notes not found'});
        }
        res.status(200).json(lecNotes);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }
}
const updateLecNote = async (req, res) => {
    try {
        const lecNoteId = req.params.id;
        const {title, filePath} = req.body;
        const updatedLecNote = await lecNote.findByIdAndUpdate(lecNoteId, {title, filePath}, {new: true});
        if (!updatedLecNote) {
            return res.status(404).json({message: 'Lecture note not found'});
        }
        res.status(200).json({message: 'Lecture note updated successfully', updatedLecNote});
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }
}
const deleteLecNote = async (req, res) => {
    try {
        const lecNoteId = req.params.id;
        const deletedLecNote = await lecNote.findByIdAndDelete(lecNoteId);
        if (!deletedLecNote) {
            return res.status(404).json({message: 'Lecture note not found'});
        }
        res.status(200).json({message: 'Lecture note deleted successfully'});
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }
}
const lecNoteController = {
    createLecNote,
    getAllLecNotes,
    getLecNoteById,
    getLecNoteByUserId,
    updateLecNote,
    deleteLecNote
}



module.exports = lecNoteController;

