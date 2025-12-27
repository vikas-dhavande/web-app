import { databases, storage, appwriteConfig } from '../config/appwrite.config';
import { ID, Query, Permission, Role } from 'appwrite';
import AuthService from './auth.service';

class BlogService {
    constructor() {
        this.databaseId = appwriteConfig.databaseId;
        this.collectionId = 'posts'; // Hardcoded for now, should ideally be in config
        this.bucketId = 'blog-images'; // New bucket for blog images
    }

    /**
     * Create a new blog post
     * @param {Object} postData
     * @param {File} imageFile
     * @returns {Promise<Object>} Created post
     */
    async createPost(postData, imageFile) {
        try {
            console.log('📝 Creating post...', postData);
            const user = await AuthService.getCurrentUser();
            if (!user) throw new Error("User must be logged in to create a post");

            let thumbnailId = null;
            if (imageFile) {
                console.log('🖼️ Uploading thumbnail...');
                const upload = await storage.createFile(
                    this.bucketId,
                    ID.unique(),
                    imageFile
                );
                thumbnailId = upload.$id;
            }

            const doc = await databases.createDocument(
                this.databaseId,
                this.collectionId,
                ID.unique(),
                {
                    ...postData,
                    thumbnailId,
                    authorId: user.$id,
                    authorName: user.name,
                    publishedAt: new Date().toISOString(),
                    likesCount: 0,
                    likedBy: []
                },
                [
                    Permission.read(Role.any()),               // Anyone can read
                    Permission.update(Role.user(user.$id)),    // Only author can update
                    Permission.delete(Role.user(user.$id))     // Only author can delete
                ]
            );

            console.log('✅ Post created:', doc.$id);
            return doc;
        } catch (error) {
            console.error('❌ Create post error:', error);
            throw error;
        }
    }

    /**
     * Get all posts (with pagination and sorting)
     * @param {number} limit
     * @returns {Promise<Object>} List of posts
     */
    async getPosts(limit = 10) {
        try {
            const result = await databases.listDocuments(
                this.databaseId,
                this.collectionId,
                [
                    Query.orderDesc('publishedAt'),
                    Query.limit(limit)
                ]
            );
            return result.documents;
        } catch (error) {
            console.error('❌ Get posts error:', error);
            return [];
        }
    }

    /**
     * Get a single post by ID
     * @param {string} postId
     * @returns {Promise<Object>} Post document
     */
    async getPost(postId) {
        try {
            return await databases.getDocument(
                this.databaseId,
                this.collectionId,
                postId
            );
        } catch (error) {
            console.error('❌ Get post error:', error);
            throw error;
        }
    }

    /**
     * Get thumbnail URL
     * @param {string} fileId
     * @returns {string} Image URL
     */
    getThumbnailUrl(fileId) {
        if (!fileId) return null;
        return storage.getFilePreview(
            this.bucketId,
            fileId,
            800, // width
            600, // height
            'center', // gravity
            100 // quality
        ).href;
    }

    /**
     * Delete a post
     * @param {string} postId 
     * @param {string} thumbnailId 
     */
    async deletePost(postId, thumbnailId) {
        try {
            await databases.deleteDocument(
                this.databaseId,
                this.collectionId,
                postId
            );

            if (thumbnailId) {
                await storage.deleteFile(
                    this.bucketId,
                    thumbnailId
                );
            }
            return true;
        } catch (error) {
            console.error('❌ Delete post error:', error);
            throw error;
        }
    }
}

export default new BlogService();
