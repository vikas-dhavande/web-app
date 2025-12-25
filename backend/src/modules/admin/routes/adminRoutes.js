const express = require('express');
const router = express.Router();
const { setRole, getAllUsers } = require('../controllers/adminController');

// All routes here should be protected by secret or admin middleware
router.post('/set-role', setRole);
router.get('/users', getAllUsers);

module.exports = router;
