import { Client, Account, Databases, Storage, Teams, Functions } from 'appwrite';

/**
 * Validates required Appwrite environment variables
 * @throws {Error} If required variables are missing
 * @returns {Object} Validated configuration object
 */
const validateConfig = () => {
  const requiredVars = {
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  };

  const missing = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Missing required Appwrite configuration: ${missing.join(', ')}\n` +
      `Please check your .env file and ensure all required variables are set.`
    );
  }

  return requiredVars;
};

// Validate configuration on initialization
const config = validateConfig();

/**
 * Initialize Appwrite Client
 * This is the main SDK instance that connects to your Appwrite server
 */
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

/**
 * Initialize Appwrite Services
 * Each service provides specialized functionality
 */

// Account: User authentication and account management
export const account = new Account(client);

// Databases: CRUD operations for databases and collections
export const databases = new Databases(client);

// Storage: File upload, download, and management
export const storage = new Storage(client);

// Teams: Team/organization management for role-based access
export const teams = new Teams(client);

// Functions: Serverless function execution
export const functions = new Functions(client);

/**
 * Appwrite Configuration Object
 * Contains all environment-based configuration for easy access
 */
export const appwriteConfig = {
  endpoint: config.endpoint,
  projectId: config.projectId,
  projectName: import.meta.env.VITE_APPWRITE_PROJECT_NAME || 'medicoapp',

  // Database configuration
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,

  // Collection IDs
  collections: {
    users: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    appointments: import.meta.env.VITE_APPWRITE_APPOINTMENTS_COLLECTION_ID,
    medicalRecords: import.meta.env.VITE_APPWRITE_MEDICAL_RECORDS_COLLECTION_ID,
  },

  // Storage Bucket IDs
  buckets: {
    profilePictures: import.meta.env.VITE_APPWRITE_PROFILE_PICTURES_BUCKET_ID,
    medicalRecords: import.meta.env.VITE_APPWRITE_MEDICAL_RECORDS_BUCKET_ID,
    prescriptions: import.meta.env.VITE_APPWRITE_PRESCRIPTIONS_BUCKET_ID,
  },
};

/**
 * Health Check Function
 * Use this to verify Appwrite connection is working
 */
export const checkAppwriteConnection = async () => {
  try {
    const health = await fetch(`${config.endpoint}/health`);
    if (health.ok) {
      console.log('✅ Appwrite connection successful');
      return true;
    }
    console.error('❌ Appwrite health check failed');
    return false;
  } catch (error) {
    console.error('❌ Appwrite connection error:', error);
    return false;
  }
};

// Export the client for advanced usage
export default client;

// Auto-check connection in development
if (import.meta.env.DEV) {
  checkAppwriteConnection();
}
