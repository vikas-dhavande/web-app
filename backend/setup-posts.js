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
            { key: 'title', size: 255, required: true },
            { key: 'content', size: 50000, required: false }, // Markdown content
            { key: 'thumbnailId', size: 255, required: false },
            { key: 'authorId', size: 36, required: true },
            { key: 'authorName', size: 128, required: false },
            { key: 'publishedAt', size: 64, required: false },
        ];

        const intAttrs = [
            { key: 'likesCount', min: 0, required: false, default: 0 },
        ];

        const arrayAttrs = [
            { key: 'likedBy', size: 36, required: false } // Array of user IDs
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

        // 3. String Array Attributes
        if (typeof arrayAttrs !== 'undefined') {
            for (const attr of arrayAttrs) {
                try {
                    // createStringAttribute with array=true (last param? No, array is set via type usually or specific method? 
                    // node-appwrite uses createStringAttribute(databaseId, collectionId, key, size, required, default, array)
                    // Let's check signature. 
                    // Actually createStringAttribute(databaseId, collectionId, key, size, required, default, array)
                    await databases.createStringAttribute(databaseId, collectionId, attr.key, attr.size, attr.required, undefined, true);
                    console.log(`✅ String Array Attribute created: ${attr.key}`);
                } catch (e) {
                    if (e.code === 409) console.log(`ℹ️ Attribute "${attr.key}" already exists.`);
                    else console.error(`❌ Error creating attribute ${attr.key}:`, e.message);
                }
            }
        }

        console.log('\n✨ Posts Schema Setup Complete! ✨');

    } catch (error) {
        console.error('❌ Schema setup failed:', error.message);
    }
}

createPostsCollection();
