
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const dbURI = process.env.MONGO_URI;
const express = require('express');
const app = express();
const port = 3000;


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
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
module.exports = connectDB;
