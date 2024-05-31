
const express = require('express');
const connectDB = require('./src/config/db');
const bodyParser = require('body-parser');
const benchmarkRoutes = require('./src/routes/benchmarkRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
app.get('/', (req, res) => {
    res.send('Selamat Datang di Halaman Depan');
  });
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/benchmark', benchmarkRoutes);
app.use('/api/auth', authRoutes);

// Database connection
connectDB();


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));