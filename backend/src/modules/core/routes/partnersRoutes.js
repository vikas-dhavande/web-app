/**
 * Partners Routes
 * API routes for partner/trusted organization management
 */

const express = require('express');
const router = express.Router();
const partnersController = require('../controllers/partnersController');

// Public routes (no authentication required)
router.get('/partners', partnersController.getPartners);

// Admin routes (require authentication and admin role)
// TODO: Add authentication and authorization middleware
// Example: router.use('/admin/partners', authMiddleware, adminMiddleware);

router.get('/admin/partners', partnersController.getAllPartnersAdmin);
router.post('/admin/partners', partnersController.createPartner);
router.put('/admin/partners/:id', partnersController.updatePartner);
router.delete('/admin/partners/:id', partnersController.deletePartner);
router.put('/admin/partners/reorder', partnersController.reorderPartners);
router.put('/admin/partners/toggle', partnersController.togglePartnersSection);

module.exports = router;
