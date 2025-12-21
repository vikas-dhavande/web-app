/**
 * Partners Controller
 * Handles API endpoints for managing partner/trusted organization logos
 * Admin can add, update, delete, and reorder partners
 */

// Sample in-memory data structure (replace with actual database in production)
let partnersData = {
    enabled: true,
    partners: [
        {
            id: 1,
            name: "Apollo Hospitals",
            logoUrl: "/images/partners/apollo-hospitals.svg",
            altText: "Apollo Hospitals logo",
            category: "hospital",
            order: 1,
            isActive: true,
            websiteUrl: "https://www.apollohospitals.com",
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-15T10:00:00Z"
        },
        {
            id: 2,
            name: "Pfizer",
            logoUrl: "/images/partners/pfizer.svg",
            altText: "Pfizer pharmaceutical company logo",
            category: "pharma",
            order: 2,
            isActive: true,
            websiteUrl: "https://www.pfizer.com",
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-15T10:00:00Z"
        },
        {
            id: 3,
            name: "Medtronic",
            logoUrl: "/images/partners/medtronic.svg",
            altText: "Medtronic medical equipment logo",
            category: "equipment",
            order: 3,
            isActive: true,
            websiteUrl: "https://www.medtronic.com",
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-15T10:00:00Z"
        },
        {
            id: 4,
            name: "AIIMS Delhi",
            logoUrl: "/images/partners/aiims.svg",
            altText: "All India Institute of Medical Sciences logo",
            category: "institution",
            order: 4,
            isActive: true,
            websiteUrl: "https://www.aiims.edu",
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-15T10:00:00Z"
        },
        {
            id: 5,
            name: "Fortis Healthcare",
            logoUrl: "/images/partners/fortis.svg",
            altText: "Fortis Healthcare logo",
            category: "hospital",
            order: 5,
            isActive: true,
            websiteUrl: "https://www.fortishealthcare.com",
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-15T10:00:00Z"
        },
        {
            id: 6,
            name: "Dr. Reddy's Laboratories",
            logoUrl: "/images/partners/dr-reddys.svg",
            altText: "Dr. Reddy's Laboratories logo",
            category: "pharma",
            order: 6,
            isActive: true,
            websiteUrl: "https://www.drreddys.com",
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-15T10:00:00Z"
        },
        {
            id: 7,
            name: "GE Healthcare",
            logoUrl: "/images/partners/ge-healthcare.svg",
            altText: "GE Healthcare logo",
            category: "equipment",
            order: 7,
            isActive: true,
            websiteUrl: "https://www.gehealthcare.com",
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-15T10:00:00Z"
        },
        {
            id: 8,
            name: "Johns Hopkins Medicine",
            logoUrl: "/images/partners/johns-hopkins.svg",
            altText: "Johns Hopkins Medicine logo",
            category: "institution",
            order: 8,
            isActive: true,
            websiteUrl: "https://www.hopkinsmedicine.org",
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-15T10:00:00Z"
        }
    ]
};

/**
 * GET /api/partners
 * Get all active partners for frontend display
 */
exports.getPartners = async (req, res) => {
    try {
        // Only return active partners, sorted by order
        const activePartners = partnersData.partners
            .filter(partner => partner.isActive)
            .sort((a, b) => a.order - b.order)
            .map(partner => ({
                id: partner.id,
                name: partner.name,
                logoUrl: partner.logoUrl,
                altText: partner.altText,
                category: partner.category,
                websiteUrl: partner.websiteUrl
            }));

        res.status(200).json({
            success: true,
            enabled: partnersData.enabled,
            count: activePartners.length,
            data: activePartners
        });
    } catch (error) {
        console.error('Error fetching partners:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch partners',
            error: error.message
        });
    }
};

/**
 * GET /api/admin/partners
 * Get all partners (including inactive) for admin panel
 * Requires authentication and admin role
 */
exports.getAllPartnersAdmin = async (req, res) => {
    try {
        // TODO: Add authentication middleware to verify admin role

        const allPartners = partnersData.partners.sort((a, b) => a.order - b.order);

        res.status(200).json({
            success: true,
            enabled: partnersData.enabled,
            count: allPartners.length,
            data: allPartners
        });
    } catch (error) {
        console.error('Error fetching partners for admin:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch partners',
            error: error.message
        });
    }
};

/**
 * POST /api/admin/partners
 * Add a new partner
 * Requires authentication and admin role
 */
exports.createPartner = async (req, res) => {
    try {
        // TODO: Add authentication middleware

        const { name, logoUrl, altText, category, websiteUrl } = req.body;

        // Validation
        if (!name || !logoUrl) {
            return res.status(400).json({
                success: false,
                message: 'Name and logo URL are required'
            });
        }

        // Get next order number
        const maxOrder = Math.max(...partnersData.partners.map(p => p.order), 0);

        // Create new partner
        const newPartner = {
            id: partnersData.partners.length + 1,
            name,
            logoUrl,
            altText: altText || `${name} logo`,
            category: category || 'other',
            order: maxOrder + 1,
            isActive: true,
            websiteUrl: websiteUrl || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        partnersData.partners.push(newPartner);

        res.status(201).json({
            success: true,
            message: 'Partner added successfully',
            data: newPartner
        });
    } catch (error) {
        console.error('Error creating partner:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create partner',
            error: error.message
        });
    }
};

/**
 * PUT /api/admin/partners/:id
 * Update a partner
 * Requires authentication and admin role
 */
exports.updatePartner = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const partnerIndex = partnersData.partners.findIndex(p => p.id === parseInt(id));

        if (partnerIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Partner not found'
            });
        }

        // Update partner
        partnersData.partners[partnerIndex] = {
            ...partnersData.partners[partnerIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        res.status(200).json({
            success: true,
            message: 'Partner updated successfully',
            data: partnersData.partners[partnerIndex]
        });
    } catch (error) {
        console.error('Error updating partner:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update partner',
            error: error.message
        });
    }
};

/**
 * DELETE /api/admin/partners/:id
 * Delete a partner
 * Requires authentication and admin role
 */
exports.deletePartner = async (req, res) => {
    try {
        const { id } = req.params;

        const partnerIndex = partnersData.partners.findIndex(p => p.id === parseInt(id));

        if (partnerIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Partner not found'
            });
        }

        const deletedPartner = partnersData.partners.splice(partnerIndex, 1)[0];

        res.status(200).json({
            success: true,
            message: 'Partner deleted successfully',
            data: deletedPartner
        });
    } catch (error) {
        console.error('Error deleting partner:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete partner',
            error: error.message
        });
    }
};

/**
 * PUT /api/admin/partners/reorder
 * Reorder partners
 * Requires authentication and admin role
 */
exports.reorderPartners = async (req, res) => {
    try {
        const { orderedIds } = req.body; // Array of partner IDs in new order

        if (!Array.isArray(orderedIds)) {
            return res.status(400).json({
                success: false,
                message: 'orderedIds must be an array'
            });
        }

        // Update order for each partner
        orderedIds.forEach((id, index) => {
            const partner = partnersData.partners.find(p => p.id === id);
            if (partner) {
                partner.order = index + 1;
                partner.updatedAt = new Date().toISOString();
            }
        });

        res.status(200).json({
            success: true,
            message: 'Partners reordered successfully',
            data: partnersData.partners.sort((a, b) => a.order - b.order)
        });
    } catch (error) {
        console.error('Error reordering partners:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reorder partners',
            error: error.message
        });
    }
};

/**
 * PUT /api/admin/partners/toggle
 * Enable/disable the entire partners section
 * Requires authentication and admin role
 */
exports.togglePartnersSection = async (req, res) => {
    try {
        const { enabled } = req.body;

        partnersData.enabled = Boolean(enabled);

        res.status(200).json({
            success: true,
            message: `Partners section ${partnersData.enabled ? 'enabled' : 'disabled'}`,
            enabled: partnersData.enabled
        });
    } catch (error) {
        console.error('Error toggling partners section:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to toggle partners section',
            error: error.message
        });
    }
};
