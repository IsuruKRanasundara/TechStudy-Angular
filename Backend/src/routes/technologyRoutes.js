import express from 'express';
import { getAllTechnologies, getTechnologyById, createTechnology, updateTechnology, deleteTechnology } from '../controllers/technologyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get all technologies
router.get('/', protect, getAllTechnologies);

// Route to get a technology by ID
router.get('/:id', protect, getTechnologyByTechId);

// Route to create a new technology
router.post('/', protect, createTechnology);

// Route to update a technology by ID
router.put('/:id', protect, updateTechnology);

// Route to delete a technology by ID
router.delete('/:id', protect, deleteTechnology);

// Export the router
export default router;