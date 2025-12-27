require('dotenv').config();
const { Client, Databases } = require('node-appwrite');

const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const databaseId = 'medicoapp_db';
const collectionId = 'users';

async function updateSchema() {
    console.log('🛠 Updating Users Collection Schema for Lists...');

    try {
        // String Attributes
        const stringAttrs = [
            { key: 'username', size: 100, required: false },
            { key: 'engagement', size: 100, required: false },
            { key: 'status', size: 50, required: false }, // Active/Inactive
        ];

        // Integer Attributes
        const intAttrs = [
            { key: 'postsCount', min: 0, required: false },
            { key: 'followersCount', min: 0, required: false },
            { key: 'followingCount', min: 0, required: false },
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
                await databases.createIntegerAttribute(databaseId, collectionId, attr.key, attr.required, attr.min);
                console.log(`✅ Integer Attribute created: ${attr.key}`);
            } catch (e) {
                if (e.code === 409) console.log(`ℹ️ Attribute "${attr.key}" already exists.`);
                else console.error(`❌ Error creating attribute ${attr.key}:`, e.message);
            }
        }

        console.log('\n✨ Schema Updated for Lists! ✨');

    } catch (error) {
        console.error('❌ Schema update failed:', error.message);
    }
}

updateSchema();
