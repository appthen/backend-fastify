import * as dotenv from 'dotenv';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加载环境变量，使用绝对路径
dotenv.config({ path: '/www/wwwroot/server/.env' });

// 打印环境变量
console.log('Environment variables:', {
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
  NODE_ENV: process.env.NODE_ENV
});

import AutoLoad from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import initHook from "./functions/__init__";
import { FunctionContext } from "./types/fastify";
import view from "@fastify/view";
import ejs from "ejs";
import mongo from './utils/mongodb';

// 设置默认环境变量
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb://localhost:27017';
}
if (!process.env.MONGODB_DB_NAME) {
  process.env.MONGODB_DB_NAME = 'your_database_name';
}

const app: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  try {
    // 初始化 MongoDB 连接
    try {
      await mongo.initMongoDB();
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      // 如果连接失败，等待 5 秒后重试
      await new Promise(resolve => setTimeout(resolve, 5000));
      await mongo.initMongoDB();
    }

    // 使用 TypeBox 类型提供者
    fastify.withTypeProvider<TypeBoxTypeProvider>();

    // 注册视图引擎
    await fastify.register(view, {
      engine: {
        ejs: ejs
      },
      root: join(__dirname, "views")
    });

    // 加载插件
    await fastify.register(AutoLoad, {
      dir: join(__dirname, "plugins"),
      options: Object.assign({}, opts),
    });

    // 加载路由
    await fastify.register(AutoLoad, {
      dir: join(__dirname, "routes"),
      options: Object.assign({}, opts),
    });

    // 应用启动后执行初始化钩子
    const ctx: FunctionContext = {
      request: null as any,
      response: null as any,
      method: "GET",
      params: {},
      query: {},
      body: {},
      headers: {},
      user: {},
    };
    await initHook(ctx);
  } catch (error) {
    console.error('Application startup error:', error);
    throw error;
  }
};

export default app;
