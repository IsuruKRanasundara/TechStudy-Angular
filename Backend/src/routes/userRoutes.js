//declaire the user routes
import {
    getAllUsers,
    getUserProfile,
    removeUser,
    updateUserProfile,
    registerUser
} from "../controller/userController";

const express=require('express');
const authenticateToken=require('../middleware/authMiddleware');

const router = express.Router();

//Login Route
router.get('/protected',authenticateToken,(req,res)=>{
    res.json({message:'Protected data',user:req.user});
})
router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserProfile);
router.post('/', authenticateToken, registerUser);
router.put('/:id', authenticateToken, updateUserProfile);
router.delete('/:id', authenticateToken, removeUser);


// Export the router
export default router;
