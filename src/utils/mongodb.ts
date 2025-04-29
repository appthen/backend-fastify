import { MongoClient } from 'mongodb'

// 打印当前的环境变量
console.log('MongoDB Config:', {
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME
});

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGODB_DB_NAME || 'default';

console.log('Using MongoDB connection:', { uri, dbName });

// 创建 MongoDB 客户端实例
export const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000, // 服务器选择超时时间
  connectTimeoutMS: 10000, // 连接超时时间
  socketTimeoutMS: 45000, // Socket 超时时间
  maxPoolSize: 10, // 连接池大小
  minPoolSize: 1, // 最小连接池大小
  retryWrites: true, // 启用重试写入
  retryReads: true, // 启用重试读取
  w: 'majority', // 写入确认级别
  readPreference: 'primary', // 读取偏好
  heartbeatFrequencyMS: 10000, // 心跳频率
  maxIdleTimeMS: 60000, // 最大空闲时间
  directConnection: true, // 强制直接连接
});

// 初始化连接
async function initMongoDB() {
  try {
    await client.connect();
    console.log('MongoDB connected successfully');
    // 打印连接信息
    const admin = client.db().admin();
    const serverInfo = await admin.serverStatus();
    console.log('MongoDB server version:', serverInfo.version);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default {
  db: client.db(dbName),
  client,
  initMongoDB
}