import jwt from 'jsonwebtoken';
import mongo from './mongodb';

const JWT_SECRET = process.env.JWT_SECRET || '-';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export default {
  database() {
    return mongo.db;
  },
  shared: new Map<string, any>(),
  // 生成 JWT token
  getToken: (payload: Record<string, number | string | object>) => {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });
  },

  // 解析 JWT token
  parseToken: (token: string) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.log(error)
      return null;
    }
  },

  // 验证 token 是否有效
  verifyToken: (token: string): boolean => {
    try {
      jwt.verify(token, JWT_SECRET);
      return true;
    } catch (error) {
      return false;
    }
  },

  // 获取 token 中的用户信息
  getUserFromToken: (token: string) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return decoded.user || null;
    } catch (error) {
      return null;
    }
  }
}