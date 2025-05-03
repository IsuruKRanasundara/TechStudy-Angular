const technology=require('../models/technologyModel');



const createTechnology = async (req, res) => {
    try {
        const { name, category, tags } = req.body;
        const technologyData = new technology({
            name,
            category,
            tags
        });
        await technologyData.save();
        res.status(201).json({ message: 'Technology created successfully', technologyData });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllTechnologies = async (req, res) => {
    try {
        const technologies = await technology.find();
        res.status(200).json(technologies);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
};










const getTechnologyByTechId = async (req, res) => {
    try {
        const technologyContext = await technology.findById({ _id: req.params._id });
        res.status(200).json(technologyContext);


    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
    }
};
const updateTechnology = async (req, res) => {
    


    try {
        const { name, category, tags } = req.body;
        const technologyData = new technology({
            name,
            category,
            tags
        });
        const technologYContent = await technology.findByIdAndUpdate({ _id: req.params._id });
        res.status(200).json({ message: "Technology updated successfully" });

    
    
    
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error,Try Again Shortly" });
    }
};
const deleteTechnology = async (req, res) => {
    try {
        const toBeDeletedTechnology = await technology.findByIdAndDelete({ _id: req.params._id });
        res.status(200).json(toBeDeletedTechnology);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error,Try Again Shortly" });
    }
};
const technologyController = {
    createTechnology,
    getAllTechnologies,
    getTechnologyByTechId,
    updateTechnology,
    deleteTechnology
}

module.exports = technologyController;