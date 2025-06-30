const express = require('express');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const technologyRoutes = require('./src/routes/technologyRoutes');

const app = express();
const port = 3000;

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/technologies', technologyRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
