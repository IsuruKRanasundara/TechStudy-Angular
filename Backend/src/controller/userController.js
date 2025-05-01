
const User = require('../models/user.js'); // Assuming a User model exists
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};




// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        const updatedUser = await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
// Login user

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
//Remove User
const removeUser=async (req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        await user.deleteOne();
        res.status(200).json({message:'User deleted successfully'});

    }catch (e) {
        res.status(500).json({message:'Server error',e});




    }
};


module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
};
