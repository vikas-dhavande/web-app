require('dotenv').config();
const { Client, Databases } = require('node-appwrite');

const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const databaseId = 'medicoapp_db';
const collectionId = 'posts';

async function createPostsCollection() {
    console.log('🛠 Creating Posts Collection Schema...');

    try {
        // 1. Create Collection
        try {
            await databases.createCollection(databaseId, collectionId, 'User Posts');
            console.log('✅ Collection created: posts');
        } catch (e) {
            if (e.code === 409) console.log('ℹ️ Collection "posts" already exists.');
            else throw e;
        }

        // 2. Define Attributes
        const stringAttrs = [
            { key: 'userId', size: 100, required: true },
            { key: 'name', size: 100, required: false },
            { key: 'username', size: 100, required: false },
            { key: 'community', size: 50, required: false },
            { key: 'title', size: 500, required: true },
            { key: 'content', size: 5000, required: false },
            { key: 'imageUrl', size: 1000, required: false },
        ];

        const intAttrs = [
            { key: 'upvotes', min: -1000000, required: false, default: 0 },
            { key: 'commentsCount', min: 0, required: false, default: 0 },
        ];

        for (const attr of stringAttrs) {
            try {
                await databases.createStringAttribute(databaseId, collectionId, attr.key, attr.size, attr.required);
                console.log(`✅ String Attribute created: ${attr.key}`);
            } catch (e) {
                if (e.code === 409) console.log(`ℹ️ Attribute "${attr.key}" already exists.`);
                else console.error(`❌ Error creating attribute ${attr.key}:`, e.message);
            }
        }

        for (const attr of intAttrs) {
            try {
                await databases.createIntegerAttribute(databaseId, collectionId, attr.key, attr.required, attr.min, attr.default);
                console.log(`✅ Integer Attribute created: ${attr.key}`);
            } catch (e) {
                if (e.code === 409) console.log(`ℹ️ Attribute "${attr.key}" already exists.`);
                else console.error(`❌ Error creating attribute ${attr.key}:`, e.message);
            }
        }

        console.log('\n✨ Posts Schema Setup Complete! ✨');

    } catch (error) {
        console.error('❌ Schema setup failed:', error.message);
    }
}

createPostsCollection();
