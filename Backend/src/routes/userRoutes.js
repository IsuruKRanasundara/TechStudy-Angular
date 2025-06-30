//declaire the user routes
const express=require('express');
const router = express.Router();


const authenticateToken=require('../middleware/authMiddleware');

const role=require('../middleware/userRoleMiddleware')

const {getAllUsers, getUserProfile, updateUserProfile, removeUser, registerUser} = require("../controller/userController");

//Login Route
router.get('/protected',authenticateToken,(req,res)=>{
    res.json({message:'Protected data',user:req.user});
})
router.get('/', authenticateToken, role,getAllUsers);
router.get('/:id', authenticateToken, getUserProfile);
router.post('/',  registerUser);
router.put('/:id', authenticateToken, updateUserProfile);
router.delete('/:id', authenticateToken, role,removeUser);


// Export the router
module.exports = router;
