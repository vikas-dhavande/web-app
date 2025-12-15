const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, submitVerification } = require('../controllers/profileController');
const auth = require('../middleware/auth');
// Assuming an auth middleware exists. I need to verify its location. 
// Based on file list, it's likely in src/modules/core/middleware or src/middleware. 
// Wait, I saw simple auth implementation in server.js imports? 
// No, server.js imported `authRoutes`. 
// I'll check `authRoutes` to see how it protects routes or if I need to create the middleware.
// For now, I'll assume standard middleware pattern and check next.

router.get('/me', auth, getProfile);
router.put('/update', auth, updateProfile);
router.post('/verify/:role', auth, submitVerification);

module.exports = router;
