require('module-alias/register');
const path = require('path');
import cluster from 'cluster';
import type { Worker } from 'cluster';
const fs = require('fs');
import { createStream } from 'rotating-file-stream';

// 创建日志目录
const logDirectory = path.join(process.cwd(), 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// 创建访问日志流
const accessLogStream = createStream('access.log', {
  interval: '1d', // 每天轮转
  size: '10M',    // 当文件达到10MB时轮转
  path: logDirectory,
  compress: 'gzip' // 压缩旧的日志文件
});

// 创建错误日志流
const errorLogStream = createStream('error.log', {
  interval: '1d', // 每天轮转
  size: '10M',    // 当文件达到10MB时轮转
  path: logDirectory,
  compress: 'gzip' // 压缩旧的日志文件
});

// 自定义日志函数
const logToFile = (message: string, isError = false) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  if (isError) {
    errorLogStream.write(logMessage);
    console.error(message); // 同时保持控制台输出
  } else {
    accessLogStream.write(logMessage);
    console.log(message); // 同时保持控制台输出
  }
};

// 注册路径别名
const moduleAlias = require('module-alias');
moduleAlias.addAliases({
  '@': path.join(__dirname, 'functions'),
  '@@': __dirname
});

const Fastify = require('fastify');
const cors = require('@fastify/cors');
const multipart = require('@fastify/multipart');
const app = require('./app');

// 保存 PID 到文件
function savePid() {
  const pidFile = path.join(process.cwd(), 'app.pid');
  fs.writeFileSync(pidFile, process.pid.toString());
}

// 移除 PID 文件
function removePid() {
  const pidFile = path.join(process.cwd(), 'app.pid');
  if (fs.existsSync(pidFile)) {
    fs.unlinkSync(pidFile);
  }
}

// 等待指定时间
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 等待工作进程准备就绪
async function waitForWorkerReady(worker: Worker): Promise<boolean> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(false);
    }, 10000); // 10秒超时

    worker.once('listening', () => {
      clearTimeout(timeout);
      resolve(true);
    });

    worker.once('exit', () => {
      clearTimeout(timeout);
      resolve(false);
    });
  });
}

if (cluster.isPrimary) {  // 使用 isPrimary 替代 isMaster
  // 主进程
  console.log(`主进程 ${process.pid} 正在运行`);
  savePid();

  // 启动工作进程
  cluster.fork();

  // 监听工作进程退出
  cluster.on('exit', (worker, code, signal) => {
    if (signal !== 'SIGTERM') {
      console.log(`工作进程 ${worker.process.pid} 已退出，正在重启...`);
      cluster.fork();
    }
  });

  // 监听 SIGUSR2 信号，用于优雅重启
  process.on('SIGUSR2', async () => {
    console.log('收到重启信号，准备重启工作进程...');
    const workers = Object.values(cluster.workers || {}) as Worker[];
    
    // 逐个重启工作进程
    for (const worker of workers) {
      console.log(`准备重启工作进程 ${worker.process.pid}...`);
      
      // 创建新的工作进程
      const newWorker = cluster.fork();
      
      // 等待新工作进程准备就绪
      console.log('等待新工作进程准备就绪...');
      const isReady = await waitForWorkerReady(newWorker);
      
      if (!isReady) {
        console.error('新工作进程启动失败，回滚到旧进程');
        newWorker.kill('SIGTERM');
        continue;
      }

      // 给新进程一些时间来预热
      await sleep(2000);
      
      // 优雅关闭旧工作进程
      console.log(`新工作进程 ${newWorker.process.pid} 已就绪，正在关闭旧工作进程 ${worker.process.pid}...`);
      worker.disconnect();
      
      // 等待旧进程处理完现有请求
      const disconnectTimeout = setTimeout(() => {
        console.log(`工作进程 ${worker.process.pid} 关闭超时，强制终止`);
        worker.kill('SIGTERM');
      }, 30000); // 30秒超时
      
      worker.once('disconnect', () => {
        clearTimeout(disconnectTimeout);
        worker.kill('SIGTERM');
      });

      // 等待旧进程完全退出
      await new Promise<void>(resolve => {
        worker.once('exit', () => {
          console.log(`旧工作进程 ${worker.process.pid} 已完全退出`);
          resolve();
        });
      });

      // 确保在处理下一个工作进程之前有一些间隔
      await sleep(1000);
    }
    
    console.log('所有工作进程已更新完成');
  });

  // 处理进程终止信号
  process.on('SIGTERM', async () => {
    console.log('收到终止信号，准备关闭服务...');
    const workers = Object.values(cluster.workers || {}) as Worker[];
    
    // 逐个关闭工作进程
    for (const worker of workers) {
      console.log(`正在关闭工作进程 ${worker.process.pid}...`);
      worker.disconnect();
      
      // 等待进程优雅退出，或在超时后强制终止
      const exitPromise = new Promise<void>(resolve => {
        worker.once('exit', () => resolve());
      });
      
      const timeoutPromise = sleep(30000).then(() => {
        console.log(`工作进程 ${worker.process.pid} 关闭超时，强制终止`);
        worker.kill('SIGTERM');
      });
      
      await Promise.race([exitPromise, timeoutPromise]);
    }

    // 移除 PID 文件
    removePid();
    
    // 等待所有工作进程退出后结束主进程
    console.log('所有工作进程已关闭，主进程退出');
    process.exit(0);
  });

} else {
  // 工作进程
  const server = Fastify({
    logger: false,
    pluginTimeout: 60000,
    bodyLimit: 50 * 1024 * 1024,
    caseSensitive: true,
    ignoreTrailingSlash: true,
    maxParamLength: 100,
    trustProxy: true
  });

  // 注册 multipart 插件
  server.register(multipart, {
    limits: {
      fileSize: 50 * 1024 * 1024,
      files: 1
    },
    attachFieldsToBody: true,
    sharedSchemaId: '#MultipartFileSchema',
    throwFileSizeLimit: true
  });

  // 添加请求日志中间件
  server.addHook('onRequest', (request, reply, done) => {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
    done();
  });

  // 添加响应日志中间件
  server.addHook('onResponse', (request, reply, done) => {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url} - ${reply.statusCode}`);
    done();
  });

  // 全局错误处理
  server.setErrorHandler((error, request, reply) => {
    const statusCode = error.statusCode || 500;
    console.error(`[ERROR] ${error.message}`);
    console.error('错误堆栈:', error.stack);
    
    let errorMessage = '服务器内部错误';
    if (error.validation) {
      errorMessage = '请求参数验证失败：' + error.message;
    } else if (error.code === 'UNAUTHORIZED') {
      errorMessage = '未授权访问';
    } else if (error.code === 'FORBIDDEN') {
      errorMessage = '禁止访问';
    } else if (error.code === 'NOT_FOUND') {
      errorMessage = '请求的资源不存在';
    } else {
      errorMessage = error.message || errorMessage;
    }

    const errorResponse = {
      code: statusCode,
      msg: errorMessage,
      data: null,
      requestId: request.id
    };
    
    console.error(`[ERROR] ${JSON.stringify({
      err: error,
      requestId: request.id,
      url: request.url,
      method: request.method,
      statusCode
    })}`);

    reply.status(statusCode).send(errorResponse);
  });

  // 配置跨域
  server.register(cors, {
    origin: [
      'https://editor.appthen.com',
      'https://work.shuangkuai.xin',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:8000',
      'http://127.0.0.1:8001',
      'http://127.0.0.1:8002',
      'http://127.0.0.1:5174',
      'http://localhost:5174',
      'http://localhost:5173',
      'http://192.168.110.92:8000',
      'https://api.shuangkuai.xin',
      'http://192.168.110.92:3000',
      'http://localhost:8000'
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: '*',  // 允许所有请求头
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    maxAge: 86400,
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  // 移除或修改这个 hook，因为它可能与 CORS 插件冲突
  server.addHook('onSend', (request, reply, payload, done) => {
    if (request.method === 'OPTIONS' && request.headers['access-control-request-private-network']) {
      // 只处理私有网络请求的情况
      reply.header('Access-Control-Allow-Private-Network', 'true');
    }
    done();
  });

  // 注册应用插件
  server.register(app);

  // 优雅关闭
  async function gracefulShutdown() {
    console.log('工作进程正在关闭...');
    try {
      await server.close();
      console.log('工作进程已关闭');
      process.exit(0);
    } catch (err) {
      console.error('关闭过程中出错:', err);
      process.exit(1);
    }
  }

  // 监听关闭信号
  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);

  // 启动服务器
  const start = async () => {
    try {
      const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
      const host = process.env.HOST || '0.0.0.0';

      await server.listen({ port, host });
      console.log(`工作进程 ${process.pid} 运行在 http://${host}:${port}`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

  start();
}