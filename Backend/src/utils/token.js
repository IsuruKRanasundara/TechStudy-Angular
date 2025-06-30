const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = require('../models/user');

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userSchema.findOne({ email }); // Use findOne instead of find
        if (!user) {
            return res.status(404).json({ message: 'User Not Found!' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(404).json({ message: 'Password is invalid!' });
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'SecretKey',
            { expiresIn: '1h' }
        );
        res.status(200).json({ token, user: { id: user._id, name: user.name } });
    } catch (e) {
        res.status(500).json({ message: 'Server Error!' });
    }
};

module.exports = loginUser;
