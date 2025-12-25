import { storage, appwriteConfig } from '../config/appwrite.config';
import { ID } from 'appwrite';

/**
 * Storage Service
 * Handles file operations with Appwrite Storage buckets
 */
class StorageService {
    constructor() {
        this.buckets = appwriteConfig.buckets;
    }

    /**
     * Upload a file to a specific bucket
     * @param {File} file - The file object to upload
     * @param {string} bucketId - The Appwrite Bucket ID (from config)
     * @returns {Promise<Object>} The uploaded file metadata
     */
    async uploadFile(file, bucketId) {
        try {
            if (!bucketId) throw new Error("Bucket ID is required");

            const response = await storage.createFile(
                bucketId,
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            console.error("❌ Upload Error:", error);
            throw error;
        }
    }

    /**
     * Get a file for viewing (e.g. image source)
     * @param {string} fileId - The Appwrite File ID
     * @param {string} bucketId - The Appwrite Bucket ID
     * @returns {URL} The URL to view the file
     */
    getFileView(fileId, bucketId) {
        try {
            if (!fileId || !bucketId) return null;
            return storage.getFileView(bucketId, fileId);
        } catch (error) {
            console.error("❌ Get File View Error:", error);
            return null;
        }
    }

    /**
     * Get file for download
     * @param {string} fileId 
     * @param {string} bucketId 
     * @returns {URL}
     */
    getFileDownload(fileId, bucketId) {
        try {
            if (!fileId || !bucketId) return null;
            return storage.getFileDownload(bucketId, fileId);
        } catch (error) {
            console.error("❌ Get File Download Error:", error);
            return null;
        }
    }

    /**
     * Delete a file
     * @param {string} fileId 
     * @param {string} bucketId 
     */
    async deleteFile(fileId, bucketId) {
        try {
            await storage.deleteFile(bucketId, fileId);
            return true;
        } catch (error) {
            console.error("❌ Delete File Error:", error);
            throw error;
        }
    }
}

export default new StorageService();
