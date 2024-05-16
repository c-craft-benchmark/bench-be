
const express = require('express');
const connectDB = require('./src/config/db');
const bodyParser = require('body-parser');
const benchmarkRoutes = require('./src/routes/benchmarkRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/benchmark', benchmarkRoutes);

// Database connection
connectDB();


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));