import { account, functions } from '../config/appwrite.config';
import { ID } from 'appwrite';

/**
 * Authentication Service
 * Handles all user authentication and account management operations
 */
class AuthService {
    /**
     * User Signup / Registration
     * @param {Object} userData - User registration data
     * @param {string} userData.email - User email address
     * @param {string} userData.password - User password (min 8 characters)
     * @param {string} userData.name - User full name
     * @param {string} [userData.role='patient'] - User role (admin/doctor/patient)
     * @returns {Promise<Object>} Created user account object
     */
    async signup({ email, password, name, role = 'patient' }) {
        try {
            console.log('🔐 Starting user signup...');

            // Create user account
            const userAccount = await account.create(
                ID.unique(), // Appwrite generates unique ID
                email,
                password,
                name
            );

            console.log('✅ User account created:', userAccount);

            // Automatically log in after signup
            await this.login({ email, password });

            // Update user preferences to store role and additional metadata
            await account.updatePrefs({
                role,
                createdAt: new Date().toISOString(),
                profileComplete: false,
            });

            console.log('✅ User preferences updated');

            return userAccount;
        } catch (error) {
            console.error('❌ Signup error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * User Login
     * @param {Object} credentials - Login credentials
     * @param {string} credentials.email - User email address
     * @param {string} credentials.password - User password
     * @returns {Promise<Object>} Session object
     */
    async login({ email, password }) {
        try {
            console.log('🔐 Logging in user...');

            const session = await account.createEmailPasswordSession(email, password);

            console.log('✅ User logged in successfully');
            return session;
        } catch (error) {
            console.error('❌ Login error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Get Currently Logged In User
     * @returns {Promise<Object|null>} User object or null if not logged in
     */
    async getCurrentUser() {
        try {
            const user = await account.get();
            console.log('✅ Current user retrieved:', user.name);
            return user;
        } catch (error) {
            // User not logged in (401 = Unauthorized)
            if (error.code === 401) {
                console.log('ℹ️ No user currently logged in');
                return null;
            }
            console.error('❌ Get current user error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Get User Preferences (including role and custom metadata)
     * @returns {Promise<Object>} User preferences object
     */
    async getUserPreferences() {
        try {
            const prefs = await account.getPrefs();
            console.log('✅ User preferences retrieved');
            return prefs;
        } catch (error) {
            console.error('❌ Get preferences error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Update User Preferences
     * @param {Object} prefs - Preferences to update
     * @returns {Promise<Object>} Updated preferences
     */
    async updateUserPreferences(prefs) {
        try {
            const updatedPrefs = await account.updatePrefs(prefs);
            console.log('✅ User preferences updated');
            return updatedPrefs;
        } catch (error) {
            console.error('❌ Update preferences error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Update User Name
     * @param {string} name - New user name
     * @returns {Promise<Object>} Updated user object
     */
    async updateName(name) {
        try {
            const user = await account.updateName(name);
            console.log('✅ User name updated');
            return user;
        } catch (error) {
            console.error('❌ Update name error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Update User Email
     * @param {string} email - New email address
     * @param {string} password - Current password for verification
     * @returns {Promise<Object>} Updated user object
     */
    async updateEmail(email, password) {
        try {
            const user = await account.updateEmail(email, password);
            console.log('✅ User email updated');
            return user;
        } catch (error) {
            console.error('❌ Update email error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Update User Password
     * @param {string} newPassword - New password
     * @param {string} oldPassword - Current password for verification
     * @returns {Promise<Object>} Updated user object
     */
    async updatePassword(newPassword, oldPassword) {
        try {
            const user = await account.updatePassword(newPassword, oldPassword);
            console.log('✅ User password updated');
            return user;
        } catch (error) {
            console.error('❌ Update password error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Logout Current User (from current device)
     * @returns {Promise<boolean>} Success status
     */
    async logout() {
        try {
            await account.deleteSession('current');
            console.log('✅ User logged out');
            return true;
        } catch (error) {
            console.error('❌ Logout error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Logout from All Devices
     * @returns {Promise<boolean>} Success status
     */
    async logoutFromAllDevices() {
        try {
            await account.deleteSessions();
            console.log('✅ Logged out from all devices');
            return true;
        } catch (error) {
            console.error('❌ Logout all error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Get All Active Sessions
     * @returns {Promise<Array>} List of active sessions
     */
    async getSessions() {
        try {
            const sessions = await account.listSessions();
            console.log('✅ Active sessions retrieved:', sessions.total);
            return sessions.sessions;
        } catch (error) {
            console.error('❌ Get sessions error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Delete Specific Session
     * @param {string} sessionId - ID of session to delete
     * @returns {Promise<boolean>} Success status
     */
    async deleteSession(sessionId) {
        try {
            await account.deleteSession(sessionId);
            console.log('✅ Session deleted:', sessionId);
            return true;
        } catch (error) {
            console.error('❌ Delete session error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Send Password Recovery Email
     * @param {string} email - User email address
     * @returns {Promise<Object>} Recovery token
     */
    async sendPasswordRecovery(email) {
        try {
            const resetUrl = `${window.location.origin}/reset-password`;
            const token = await account.createRecovery(email, resetUrl);
            console.log('✅ Password recovery email sent');
            return token;
        } catch (error) {
            console.error('❌ Password recovery error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Complete Password Recovery
     * @param {string} userId - User ID from recovery email
     * @param {string} secret - Secret from recovery email
     * @param {string} newPassword - New password
     * @returns {Promise<Object>} Recovery completion token
     */
    async completePasswordRecovery(userId, secret, newPassword) {
        try {
            const token = await account.updateRecovery(userId, secret, newPassword);
            console.log('✅ Password reset successful');
            return token;
        } catch (error) {
            console.error('❌ Password recovery completion error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Send Email Verification
     * @returns {Promise<Object>} Verification token
     */
    async sendEmailVerification() {
        try {
            const verifyUrl = `${window.location.origin}/verify-email`;
            const token = await account.createVerification(verifyUrl);
            console.log('✅ Verification email sent');
            return token;
        } catch (error) {
            console.error('❌ Send verification error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Verify Email
     * @param {string} userId - User ID from verification email
     * @param {string} secret - Secret from verification email
     * @returns {Promise<Object>} Verification token
     */
    async verifyEmail(userId, secret) {
        try {
            const token = await account.updateVerification(userId, secret);
            console.log('✅ Email verified successfully');
            return token;
        } catch (error) {
            console.error('❌ Email verification error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Send Phone Verification Code
     * @returns {Promise<Object>} Verification token
     */
    async sendPhoneVerification() {
        try {
            const token = await account.createPhoneVerification();
            console.log('✅ Phone verification code sent');
            return token;
        } catch (error) {
            console.error('❌ Send phone verification error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Verify Phone
     * @param {string} userId - User ID
     * @param {string} secret - Verification code sent to phone
     * @returns {Promise<Object>} Verification token
     */
    async verifyPhone(userId, secret) {
        try {
            const token = await account.updatePhoneVerification(userId, secret);
            console.log('✅ Phone verified successfully');
            return token;
        } catch (error) {
            console.error('❌ Phone verification error:', error);
            throw this.handleError(error);
        }
    }

    /**
     * Check if User is Authenticated
     * @returns {Promise<boolean>} Authentication status
     */
    async isAuthenticated() {
        try {
            const user = await this.getCurrentUser();
            return user !== null;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get User Role
     * @returns {Promise<string|null>} User role or null
     */
    async getUserRole() {
        try {
            const prefs = await this.getUserPreferences();
            return prefs.role || null;
        } catch (error) {
            return null;
        }
    }

    /**
     * Request a Role (Adds user to Appwrite Team via Backend)
     * @param {string} role - Role to request (e.g., 'doctor')
     * @param {string} secret - Admin Secret (For demo/testing, usually handled via auth)
     */
    async requestRole(role) {
        try {
            const user = await this.getCurrentUser();
            if (!user) throw new Error("User not logged in");

            const functionId = import.meta.env.VITE_APPWRITE_FUNCTION_MANAGE_ROLES_ID;
            if (!functionId) {
                console.warn("Function ID not configured");
                throw new Error("Service Configuration Error");
            }

            const execution = await functions.createExecution(
                functionId,
                JSON.stringify({
                    userId: user.$id,
                    role
                })
            );

            if (execution.status === 'failed') {
                throw new Error(execution.response || 'Function execution failed');
            }

            const data = JSON.parse(execution.responseBody);
            if (!data.success) throw new Error(data.message || 'Failed to set role');

            return data;
        } catch (error) {
            console.error("❌ Request Role Error:", error);
            throw error;
        }
    }

    /**
     * Get Users Team Memberships
     */
    async getTeams() {
        try {
            // Team listing might require client SDK 'Teams' service if enabled,
            // or users.getMemberships() if available in client (Account service usually has getMemberships is deprecated/moved?)
            // Actually, we can check Account.getPrefs or specific Team APIs if client has access.
            // For now, let's rely on Account.get() -> prefs.role as the primary source of truth until Teams are fully used on frontend.
            return [];
        } catch (error) {
            return [];
        }
    }

    /**
     * Error Handler
     * Converts Appwrite errors to user-friendly messages
     * @param {Error} error - Appwrite error object
     * @returns {Error} User-friendly error
     */
    handleError(error) {
        // Common Appwrite error codes and their messages
        const errorMessages = {
            400: 'Invalid request. Please check your input.',
            401: 'Unauthorized. Please log in.',
            403: 'Forbidden. You do not have permission to perform this action.',
            404: 'Resource not found.',
            409: 'User with this email already exists.',
            429: 'Too many requests. Please try again later.',
            500: 'Server error. Please try again later.',
            503: 'Service unavailable. Please try again later.',
        };

        // Get user-friendly message
        const message = errorMessages[error.code] || error.message || 'An unexpected error occurred';

        // Create new error with friendly message but preserve original error
        const friendlyError = new Error(message);
        friendlyError.originalError = error;
        friendlyError.code = error.code;

        return friendlyError;
    }
}

// Export singleton instance
export default new AuthService();
