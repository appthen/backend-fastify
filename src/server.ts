import Fastify from 'fastify'
import cors from '@fastify/cors'
import app from './app'

const server = Fastify({
  // logger: {
  //   transport: {
  //     target: 'pino-pretty',
  //     options: {
  //       translateTime: 'HH:MM:ss Z',
  //       ignore: 'pid,hostname',
  //       colorize: true
  //     }
  //   },
  //   serializers: {
  //     req(request) {
  //       return {
  //         method: request.method,
  //         url: request.url,
  //         headers: request.headers
  //       }
  //     },
  //     res(reply) {
  //       return {
  //         statusCode: reply.statusCode
  //       }
  //     }
  //   }
  // }
})

// 全局错误处理
server.setErrorHandler((error, request, reply) => {
  // 获取错误状态码，默认为500
  const statusCode = error.statusCode || 500
  console.error(error);
  
  // 根据错误类型返回不同的错误信息
  let errorMessage = '服务器内部错误'
  if (error.validation) {
    // 处理请求参数验证错误
    errorMessage = '请求参数验证失败：' + error.message
  } else if (error.code === 'UNAUTHORIZED') {
    // 处理未授权错误
    errorMessage = '未授权访问'
  } else if (error.code === 'FORBIDDEN') {
    // 处理禁止访问错误
    errorMessage = '禁止访问'
  } else if (error.code === 'NOT_FOUND') {
    // 处理资源未找到错误
    errorMessage = '请求的资源不存在'
  } else {
    // 其他错误使用错误对象的message或默认错误信息
    errorMessage = error.message || errorMessage
  }

  // 构建错误响应对象 - 只返回给前端必要的信息
  const errorResponse = {
    code: statusCode,
    msg: errorMessage,
    data: null,
    requestId: request.id
  }
  
  // 记录详细的错误日志到控制台
  // request.log.error({
  //   err: error,
  //   requestId: request.id,
  //   url: request.url,
  //   method: request.method,
  //   stack: error.stack,
  //   // 添加文件名和行号信息（如果存在）
  //   fileName: error.fileName || (error.stack ? error.stack.split('\n')[1]?.trim() : undefined),
  //   lineNumber: error.lineNumber,
  //   statusCode
  // })

  // 发送错误响应
  reply.status(statusCode).send(errorResponse)
})

// 配置跨域
server.register(cors, {
  origin: [
    'https://editor.appthen.com',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8000',
    'http://localhost:8000'
  ],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'X-CSRF-Token',
    'X-API-Key',
    'Access-Control-Allow-Private-Network',
    'env',
    'current_shop',
    'access-control-request-private-network'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204
})

// 添加请求日志中间件
server.addHook('onRequest', (request, reply, done) => {
  // console.log('Incoming request:', {
  //   method: request.method,
  //   url: request.url,
  //   headers: request.headers,
  //   origin: request.headers.origin
  // });
  done();
});

// 添加响应头处理中间件
server.addHook('onSend', (request, reply, payload, done) => {
  // 处理私有网络请求
  if (request.method === 'OPTIONS') {
    // 添加所有必要的 CORS 头
    reply.header('Access-Control-Allow-Origin', request.headers.origin || '*');
    reply.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    reply.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,Accept,Origin,X-CSRF-Token,X-API-Key,Access-Control-Allow-Private-Network,env,current_shop,access-control-request-private-network');
    reply.header('Access-Control-Allow-Credentials', 'true');
    reply.header('Access-Control-Max-Age', '86400');
    
    // 处理私有网络请求
    if (request.headers['access-control-request-private-network']) {
      reply.header('Access-Control-Allow-Private-Network', 'true');
    }
  }
  done();
});

// 注册应用插件
server.register(app)

// 启动服务器
const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000
    const host = process.env.HOST || '0.0.0.0'

    await server.listen({ port, host })
    console.log(`服务器运行在 http://${host}:${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()