const express=require('express');





const {
    getAllTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology
} = require('../controller/tecnologyController');


const protect=require('../middleware/userRoleMiddleware');
const router = express.Router();
// Route to get all technologies
router.get('/', protect, getAllTechnologies);

// Route to get a technology by ID

// Route to create a new technology
router.post('/', protect, createTechnology);

// Route to update a technology by ID
router.put('/:id', protect, updateTechnology);

// Route to delete a technology by ID
router.delete('/:id', protect, deleteTechnology);

// Export the router
module.exports=router;
