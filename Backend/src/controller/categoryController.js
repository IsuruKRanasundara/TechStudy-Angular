const category = require('../models/categoryModel');
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        let userId = req.user._id;
        const categoryNew = new category({
            name
        });
        await categoryNew.save();
        res.status(201).json({ message: "Category Created Successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error, Try again shortly" });

    }
};

const getAllCategory = async (req, res) => {
    try {
        const getCategory = await category.find();
        res.status(201).json(getAllCategory);

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error ,Try Again Shortly" });

    }
};
const getCategoryById = async (res, req) => {
    try {
        const getCategory = await category.findById({ _id: req.params._id });
        res.status(201).json(getCategory);




    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Serer error,Try again shortly" });

    }
};
const updateCategory = async (res, req) => {
    try {
        const categoryNew = new category({
            name
        });
        const updatedCategory = await category.findByIdAndUpdate({ _id: req.params._id });
        res.status(201).json(updateCategory);

    
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error,try again shortly" });

    }
}

    const deleteCategory = async(res,req) => {
    try {
        const deleteCategory = await category.findByIdAndDelete({ _id: req.params._id });
        res.status(201).json(deleteCategory);

    }
    catch (e) {
        
        console.error(e);
        res.status(500).json({ message: "Server error,try again shortly" });
    }
        
    
    
};

const categoryController = {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}
module.exports = categoryController;