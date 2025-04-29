const mongoose = require('mongoose');

// Load environment variables
//Todo:have to replace with mongoDb database
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/database';

// Connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
