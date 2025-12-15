const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Load config
dotenv.config();

// Connect Database (Skipped for Mock Mode)
// connectDB();
console.log('Mock Database Mode: Using local JSON file for persistence');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import Routes
const authRoutes = require('./src/modules/core/routes/authRoutes');
const profileRoutes = require('./src/modules/core/routes/profileRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
