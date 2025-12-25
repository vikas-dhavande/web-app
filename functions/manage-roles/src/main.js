import { Client, Teams } from 'node-appwrite';

// Helper for env vars (Appwrite injection)
// APPWRITE_FUNCTION_ENDPOINT, APPWRITE_FUNCTION_PROJECT_ID, APPWRITE_API_KEY need to be set in Console.

const TEAM_IDS = {
    'doctor': process.env.APPWRITE_TEAM_DOCTORS_ID || 'doctors',
    'patient': process.env.APPWRITE_TEAM_PATIENTS_ID || 'patients',
    'admin': process.env.APPWRITE_TEAM_ADMINS_ID || 'admins'
};

export default async ({ req, res, log, error }) => {
    // Check if Method is POST (optional, but good practice)
    if (req.method !== 'POST') {
        return res.json({ success: false, message: 'Method not allowed' }, 405);
    }

    try {
        const client = new Client()
            .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
            .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
            .setKey(process.env.APPWRITE_API_KEY);

        const teams = new Teams(client);

        // Parse Payload
        let payload;
        try {
            payload = JSON.parse(req.body);
        } catch (e) {
            // Fallback if body is already object (depending on runtime version/invocation)
            payload = typeof req.body === 'object' ? req.body : {};
        }

        const { userId, role } = payload;

        if (!userId || !role) {
            return res.json({ success: false, message: 'Missing userId or role' }, 400);
        }

        const teamId = TEAM_IDS[role];
        if (!teamId) {
            return res.json({ success: false, message: 'Invalid role' }, 400);
        }

        log(`Assigning user ${userId} to team ${teamId}...`);

        try {
            // Add user to team
            // Note: roles is ['owner'] or similar. For simpler RBAC we might just care about membership.
            // Using default roles/empty array if just membership is needed.
            await teams.createMembership(
                teamId,
                [], // roles
                undefined, // email (optional if userId sufficient or if invite not sent? SDK quirk, checking...)
                userId
            );

            // Note: If createMembership fails because "email is required" or similar, 
            // the user might need to be fetched first. Assuming standard Appwrite 1.5+ behavior.
        } catch (err) {
            // If user is already member (409), treat as success
            if (err.code === 409) {
                return res.json({ success: true, message: 'User already in team' });
            }
            throw err;
        }

        return res.json({ success: true, message: `User added to ${role}` });

    } catch (err) {
        error(err.message);
        return res.json({ success: false, message: err.message }, 500);
    }
};
