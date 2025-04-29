export const MONGODB_URI = process.env.MONGODB_URI || '';
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || '';

if (!MONGODB_URI || !MONGODB_DB_NAME) {
  throw new Error('MONGODB_URI and MONGODB_DB_NAME must be set in environment variables');
} 