import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

if (!uri || !dbName) {
  throw new Error('MONGODB_URI and MONGODB_DB_NAME must be set in environment variables');
}

// 创建 MongoDB 客户端实例
export const client = new MongoClient(uri);
export default {
  db: client.db(dbName),
  client,
}