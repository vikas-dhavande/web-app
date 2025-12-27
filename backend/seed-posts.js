require('dotenv').config();
const { Client, Databases, ID } = require('node-appwrite');

const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT)
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const databaseId = 'medicoapp_db';
const collectionId = 'posts';

async function seedPosts() {
    console.log('🧪 Seeding mock posts...');

    const mockPosts = [
        {
            userId: 'user_001',
            name: 'Ali Spagnola',
            username: 'alispagnola',
            community: 's/figma',
            title: 'Guy with fear of heights gets the courage make it to the cliffside view',
            content: 'I like movies where they start out in a way that you think you\'re in for a typical movie where you have a pretty good idea how things will work out. Like it could be a typical family drama, a romantic comedy, a guy in a small town going to work or some kids coming back from school, whatever it is, it doesn\'t make you take notice.',
            upvotes: 87,
            commentsCount: 16,
            imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
        },
        {
            userId: 'user_002',
            name: 'Müthiş Bilim',
            username: 'muthisbilimnet',
            community: 's/singularity',
            title: 'Film starting out normal but gradually become freakish?',
            content: 'The opposite is something like A Clockwork Orange, where the intro tells you that you\'re in for some strange experience. Nothing wrong with it, just that there is less of a surprise than when the movies I\'m talking about. Any that you recall?',
            upvotes: 8200,
            commentsCount: 198,
        },
        {
            userId: 'user_004',
            name: 'Halil İbrahim ER',
            username: 'halil_ibrahimer',
            community: 's/lifeprotips',
            title: 'Sparrow feed its youngling.',
            upvotes: 987,
            commentsCount: 225,
            imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800'
        }
    ];

    for (const post of mockPosts) {
        try {
            await databases.createDocument(databaseId, collectionId, ID.unique(), post);
            console.log(`✅ Seeded post: ${post.title.substring(0, 30)}...`);
        } catch (e) {
            console.error(`❌ Error seeding post:`, e.message);
        }
    }

    console.log('\n✨ Seeding Complete! ✨');
}

seedPosts();
