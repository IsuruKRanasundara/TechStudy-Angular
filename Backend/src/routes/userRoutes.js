//declaire the user routes
import express from 'express';
import { getUser, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getAllUsers } from '../controller/userController.js';
const router = express.Router();
// Route to get all users
router.get('/', protect, getAllUsers);
router.get('/:id', protect, getUserProfile);

// Route to create a new user
router.post('/', protect, registerUser);
// Route to update a user by ID
router.put('/:id', protect, updateUserProfile);
// Route to delete a user by ID
router.delete('/:id', protect, removeUser);
// Export the router
export default router;
// This code defines the routes for user-related operations in an Express application.
