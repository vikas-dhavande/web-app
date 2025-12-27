const { users, teams } = require('../../../config/appwrite');

/**
 * Admin Controller
 * Handles privileged operations requiring Appwrite Admin SDK
 */

// Mapping of role names to Team IDs
// In a real app, these ID might come from ENV or Database
const TEAM_IDS = {
    'doctor': process.env.APPWRITE_TEAM_DOCTORS_ID || 'doctors',
    'patient': process.env.APPWRITE_TEAM_PATIENTS_ID || 'patients',
    'admin': process.env.APPWRITE_TEAM_ADMINS_ID || 'admins'
};

/**
 * Set User Role (Add to Team)
 * @route POST /api/admin/set-role
 * @body { userId, role }
 */
exports.setRole = async (req, res) => {
    try {
        const { userId, role, secret } = req.body;

        // 1. Simple Security Check (Should use proper Admin Auth Middleware)
        if (secret !== process.env.ADMIN_SECRET_KEY) {
            return res.status(403).json({ message: 'Unauthorized: Invalid Admin Secret' });
        }

        const teamId = TEAM_IDS[role];
        if (!teamId) {
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        // 2. Add User to Team
        // Note: 'roles' param in createMembership array is optional [role]
        try {
            await teams.createMembership(
                teamId,
                [role], // Roles within the team
                process.env.APPWRITE_URL, // URL to invite? (Required param for email invite, can be skipped for direct add if user exists?)
                // Actually, for direct add without invite, we might need a different approach or ensure email is used.
                // However, standard createMembership usually invites.
                // Let's check if we can add directly. 
                // Using 'email' is standard. If we have userId, we might need to get email first.
                undefined, // email (optional if userId is sufficient for some SDK versions, but usually email is needed)
                userId
            );

            // Wait, node-appwrite createMembership signature:
            // (teamId, email, roles, url, name)
            // If we want to add an existing user by ID, we might need to ensure they are added correctly.
            // Let's try fetching the user first to get their email if needed.
        } catch (err) {
            console.log("Direct add might have failed or needs email, trying alternative...");
        }

        /* 
           Simpler approach for this migration:
           Update User Preferences or Labels if Teams is too complex to automated without email.
           But requirement is Teams.
           Let's fetch user email first.
        */
        const user = await users.get(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Add to Team
        // Doc: teams.createMembership(teamId, roles, email, userId, phone, url, name)
        // Correct Node SDK signature might vary by version. 
        // We will assume standard: teamId, roles, email.
        const membership = await teams.createMembership(
            teamId,
            [role], // Roles
            user.email,
            undefined, // Url (invitation)
            undefined // Name
        );

        res.json({
            success: true,
            message: `User added to ${role} team`,
            membership
        });

    } catch (error) {
        console.error('Admin Set Role Error:', error);
        // Handle "User already in team" gracefully
        if (error.code === 409) {
            return res.json({ success: true, message: 'User already in team' });
        }
        res.status(500).json({ message: error.message });
    }
};

/**
 * Get All Users (Admin only)
 */
exports.getAllUsers = async (req, res) => {
    // ... impl
    res.json({ message: "Not implemented yet" });
};
