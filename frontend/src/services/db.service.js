import { databases, appwriteConfig } from '../config/appwrite.config';
import { ID, Query } from 'appwrite';
import AuthService from './auth.service';

class DBService {
    constructor() {
        this.dbId = appwriteConfig.databaseId;
        this.usersCollection = appwriteConfig.collections.users;
    }

    /**
     * Get Current User Profile
     * Tries to fetch from Appwrite DB. If 404, returns a default structure.
     */
    async getProfile(userId) {
        try {
            if (!this.dbId || !this.usersCollection) {
                console.warn('⚠️ Appwrite Database IDs not configured. Using local fallback.');
                return this.getLocalProfile(userId);
            }

            // Try to find profile document with same ID as User ID (best practice)
            const doc = await databases.getDocument(
                this.dbId,
                this.usersCollection,
                userId
            );
            return doc;
        } catch (error) {
            if (error.code === 404) {
                console.log('ℹ️ Profile not found, returning new/empty profile.');
                return this.getLocalProfile(userId);
            }
            console.error('❌ Get Profile Error:', error);
            throw error;
        }
    }

    /**
     * Update User Profile
     * Creates or Updates the document in Appwrite
     */
    async updateProfile(userId, data) {
        try {
            if (!this.dbId || !this.usersCollection) {
                throw new Error('Database not configured');
            }

            // Check if profile exists
            try {
                await databases.getDocument(this.dbId, this.usersCollection, userId);
                // Update
                return await databases.updateDocument(
                    this.dbId,
                    this.usersCollection,
                    userId,
                    data
                );
            } catch (err) {
                if (err.code === 404) {
                    // Create
                    return await databases.createDocument(
                        this.dbId,
                        this.usersCollection,
                        userId, // Use userId as docId
                        { ...data, userId }
                    );
                }
                throw err;
            }
        } catch (error) {
            console.error('❌ Update Profile Error:', error);
            throw error;
        }
    }

    /**
     * Submit Role Verification
     * In a real Appwrite setup, this might upload docs to Storage bucket first,
     * then create a verification document.
     */
    async submitVerification(userId, role, data) {
        console.log(`📝 Submitting verification for ${role}:`, data);
        // TODO: Implement Storage upload for documents
        // For now, we mock the success/database call

        // Update user prefs via Auth to mark status
        const prefs = await AuthService.getUserPreferences();
        await AuthService.updateUserPreferences({
            ...prefs,
            verificationStatus: 'pending',
            verificationRole: role
        });

        return { success: true, message: 'Verification submitted successfully' };
    }

    getLocalProfile(userId) {
        return {
            userId: userId,
            fullName: '',
            phoneNumber: '',
            address: {},
            photoUrl: null,
            completionStatus: 0
        };
    }
}

export default new DBService();
