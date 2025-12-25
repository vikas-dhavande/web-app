const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load config
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running... (Appwrite Admin Mode)');
});

// Import Routes
const adminRoutes = require('./src/modules/admin/routes/adminRoutes');

// Mount Admin Routes
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
