require('dotenv').config();
const { Client, Databases, ID } = require('node-appwrite');

const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const databaseId = 'medicoapp_db';
const collectionId = 'users';

async function seedUsers() {
    console.log('🧪 Seeding mock users for lists...');

    const mockUsers = [
        {
            userId: 'user_001',
            fullName: 'Ali Spagnola',
            username: 'alispagnola',
            location: 'Los Angeles, CA',
            postsCount: 50066,
            followersCount: 2317828,
            followingCount: 1376394,
            status: 'Active',
            engagement: 'High Engagement user',
            avatarUrl: 'https://i.pravatar.cc/150?u=user_001',
            education: 'Music University'
        },
        {
            userId: 'user_002',
            fullName: 'Müthiş Bilim',
            username: 'muthisbilimnet',
            location: 'İstanbul, Türkiye',
            postsCount: 3689,
            followersCount: 433004,
            followingCount: 192403,
            status: 'Active',
            engagement: 'High Engagement user',
            avatarUrl: 'https://i.pravatar.cc/150?u=user_002',
            education: 'Science Academy'
        },
        {
            userId: 'user_003',
            fullName: 'Funny Pics',
            username: 'LetsLaughAllDay',
            location: 'USA',
            postsCount: 0,
            followersCount: 47069,
            followingCount: 39556,
            status: 'Inactive',
            engagement: 'Low Engagement user',
            avatarUrl: 'https://i.pravatar.cc/150?u=user_003',
            education: 'Comedy School'
        },
        {
            userId: 'user_004',
            fullName: 'Halil İbrahim ER - SEO',
            username: 'halil_ibrahimer',
            location: 'İstanbul',
            postsCount: 282,
            followersCount: 35043,
            followingCount: 30496,
            status: 'Moderate Active',
            engagement: 'Medium Engagement user',
            avatarUrl: 'https://i.pravatar.cc/150?u=user_004',
            education: 'Business School'
        }
    ];

    for (const user of mockUsers) {
        try {
            await databases.createDocument(databaseId, collectionId, user.userId, user);
            console.log(`✅ Seeded user: ${user.fullName}`);
        } catch (e) {
            if (e.code === 409) {
                await databases.updateDocument(databaseId, collectionId, user.userId, user);
                console.log(`ℹ️ Updated existing user: ${user.fullName}`);
            } else {
                console.error(`❌ Error seeding user ${user.fullName}:`, e.message);
            }
        }
    }

    console.log('\n✨ Seeding Complete! ✨');
}

seedUsers();
