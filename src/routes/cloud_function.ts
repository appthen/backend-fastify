import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { FunctionContext } from '@@/types/fastify';
import { createContext } from '../utils/context';

const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const beforeRequest = await import('../functions/__interceptor__') as any;
  // 添加全局预处理钩子
  fastify.addHook('preHandler', async (request, reply) => {

    // 放行 OPTIONS 请求
    if (request.method === 'OPTIONS') {
      return true;
    }
  
    // 统一处理通用参数
    const ctx: FunctionContext = createContext(request, reply);
    // 创建一个 Promise 来处理 next 的执行
    const nextPromise = new Promise((resolve) => {
      // 创建一个 next 函数，用于继续处理请求
      const next = async (context: FunctionContext) => {
        // 将 context 存储到 request 中，这样路由处理函数可以访问到
        (request as any).functionContext = context;
        resolve(true);
      };

      // 调用用户定义的拦截器
      (beforeRequest.main || beforeRequest.default)(ctx, next).then((result: any) => {
        // 如果拦截器返回了结果（不是 next 的返回值），说明请求被拦截了
        if (result !== undefined) {
          resolve(result);
        }
      });
    });

    // 等待 Promise 完成
    const result = await nextPromise;

    // 如果结果是 true，表示继续处理请求
    if (result === true) {
      return;
    }

    // 否则发送拦截结果
    reply.send(result);
  });

  
  // 数据模型
  fastify.post('/types/index', async (request, response) => {
    const handler = await import('../functions/types/index') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 数据模型
  fastify.get('/types/index', async (request, response) => {
    const handler = await import('../functions/types/index') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 数据模型
  fastify.put('/types/index', async (request, response) => {
    const handler = await import('../functions/types/index') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 数据模型
  fastify.delete('/types/index', async (request, response) => {
    const handler = await import('../functions/types/index') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });




  // normal-用于处理async-validator
  fastify.get('/system/aival', async (request, response) => {
    const handler = await import('../functions/system/aival') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-用于处理async-validator
  fastify.post('/system/aival', async (request, response) => {
    const handler = await import('../functions/system/aival') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-配置管理
  fastify.get('/system/config/list', async (request, response) => {
    const handler = await import('../functions/system/config/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-配置管理
  fastify.post('/system/config/list', async (request, response) => {
    const handler = await import('../functions/system/config/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-配置管理
  fastify.put('/system/config/list', async (request, response) => {
    const handler = await import('../functions/system/config/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-配置管理
  fastify.delete('/system/config/list', async (request, response) => {
    const handler = await import('../functions/system/config/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-字段管理
  fastify.get('/system/fields/list', async (request, response) => {
    const handler = await import('../functions/system/fields/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-字段管理
  fastify.post('/system/fields/list', async (request, response) => {
    const handler = await import('../functions/system/fields/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-字段管理
  fastify.put('/system/fields/list', async (request, response) => {
    const handler = await import('../functions/system/fields/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-字段管理
  fastify.delete('/system/fields/list', async (request, response) => {
    const handler = await import('../functions/system/fields/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-获取验证数据
  fastify.get('/system/fields/valdata', async (request, response) => {
    const handler = await import('../functions/system/fields/valdata') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-文件管理
  fastify.get('/system/file/list', async (request, response) => {
    const handler = await import('../functions/system/file/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-文件管理
  fastify.post('/system/file/list', async (request, response) => {
    const handler = await import('../functions/system/file/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-文件管理
  fastify.put('/system/file/list', async (request, response) => {
    const handler = await import('../functions/system/file/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-文件管理
  fastify.delete('/system/file/list', async (request, response) => {
    const handler = await import('../functions/system/file/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-上传文件
  fastify.post('/system/file/update', async (request, response) => {
    const handler = await import('../functions/system/file/update') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-系统登入
  fastify.get('/system/login', async (request, response) => {
    const handler = await import('../functions/system/login') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-系统登入
  fastify.post('/system/login', async (request, response) => {
    const handler = await import('../functions/system/login') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-admin后台管理专用
  fastify.get('/system/menu/admin', async (request, response) => {
    const handler = await import('../functions/system/menu/admin') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-admin后台管理专用
  fastify.post('/system/menu/admin', async (request, response) => {
    const handler = await import('../functions/system/menu/admin') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-admin后台管理专用
  fastify.put('/system/menu/admin', async (request, response) => {
    const handler = await import('../functions/system/menu/admin') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-admin后台管理专用
  fastify.delete('/system/menu/admin', async (request, response) => {
    const handler = await import('../functions/system/menu/admin') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-获取还未加入接口的函数
  fastify.get('/system/menu/laf', async (request, response) => {
    const handler = await import('../functions/system/menu/laf') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-获取还未加入接口的函数
  fastify.post('/system/menu/laf', async (request, response) => {
    const handler = await import('../functions/system/menu/laf') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-菜单获取
  fastify.get('/system/menu/list', async (request, response) => {
    const handler = await import('../functions/system/menu/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-菜单获取
  fastify.post('/system/menu/list', async (request, response) => {
    const handler = await import('../functions/system/menu/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-菜单获取
  fastify.put('/system/menu/list', async (request, response) => {
    const handler = await import('../functions/system/menu/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-菜单获取
  fastify.delete('/system/menu/list', async (request, response) => {
    const handler = await import('../functions/system/menu/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-路由
  fastify.get('/system/menu/route', async (request, response) => {
    const handler = await import('../functions/system/menu/route') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-角色树结构专用
  fastify.get('/system/menu/tree', async (request, response) => {
    const handler = await import('../functions/system/menu/tree') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-角色树结构专用
  fastify.delete('/system/menu/tree', async (request, response) => {
    const handler = await import('../functions/system/menu/tree') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-角色树结构专用
  fastify.put('/system/menu/tree', async (request, response) => {
    const handler = await import('../functions/system/menu/tree') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-角色树结构专用
  fastify.post('/system/menu/tree', async (request, response) => {
    const handler = await import('../functions/system/menu/tree') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-消息系统封装
  fastify.get('/system/message/handel', async (request, response) => {
    const handler = await import('../functions/system/message/handel') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-消息系统封装
  fastify.post('/system/message/handel', async (request, response) => {
    const handler = await import('../functions/system/message/handel') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-消息管理
  fastify.get('/system/message/list', async (request, response) => {
    const handler = await import('../functions/system/message/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-消息管理
  fastify.post('/system/message/list', async (request, response) => {
    const handler = await import('../functions/system/message/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-消息管理
  fastify.put('/system/message/list', async (request, response) => {
    const handler = await import('../functions/system/message/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-消息管理
  fastify.delete('/system/message/list', async (request, response) => {
    const handler = await import('../functions/system/message/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-刷新token
  fastify.get('/system/refresh_token', async (request, response) => {
    const handler = await import('../functions/system/refresh_token') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-角色相关
  fastify.get('/system/role/admin', async (request, response) => {
    const handler = await import('../functions/system/role/admin') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-角色相关
  fastify.post('/system/role/admin', async (request, response) => {
    const handler = await import('../functions/system/role/admin') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-角色相关
  fastify.put('/system/role/admin', async (request, response) => {
    const handler = await import('../functions/system/role/admin') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-角色相关
  fastify.delete('/system/role/admin', async (request, response) => {
    const handler = await import('../functions/system/role/admin') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-角色管理
  fastify.get('/system/role/list', async (request, response) => {
    const handler = await import('../functions/system/role/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-角色管理
  fastify.post('/system/role/list', async (request, response) => {
    const handler = await import('../functions/system/role/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-角色管理
  fastify.put('/system/role/list', async (request, response) => {
    const handler = await import('../functions/system/role/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-角色管理
  fastify.delete('/system/role/list', async (request, response) => {
    const handler = await import('../functions/system/role/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-用户管理
  fastify.get('/system/user/list', async (request, response) => {
    const handler = await import('../functions/system/user/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-用户管理
  fastify.post('/system/user/list', async (request, response) => {
    const handler = await import('../functions/system/user/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-用户管理
  fastify.put('/system/user/list', async (request, response) => {
    const handler = await import('../functions/system/user/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-用户管理
  fastify.delete('/system/user/list', async (request, response) => {
    const handler = await import('../functions/system/user/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-获取自己的信息
  fastify.get('/system/user/me', async (request, response) => {
    const handler = await import('../functions/system/user/me') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-获取自己的信息
  fastify.post('/system/user/me', async (request, response) => {
    const handler = await import('../functions/system/user/me') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-获取自己的信息
  fastify.put('/system/user/me', async (request, response) => {
    const handler = await import('../functions/system/user/me') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-修改密码
  fastify.post('/system/user/modfiypassword', async (request, response) => {
    const handler = await import('../functions/system/user/modfiypassword') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-默认数据
  fastify.get('/utils/defaults', async (request, response) => {
    const handler = await import('../functions/utils/defaults') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-默认数据
  fastify.post('/utils/defaults', async (request, response) => {
    const handler = await import('../functions/utils/defaults') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });



  // normal-laf控制器
  fastify.get('/utils/laf', async (request, response) => {
    const handler = await import('../functions/utils/laf') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-laf控制器
  fastify.post('/utils/laf', async (request, response) => {
    const handler = await import('../functions/utils/laf') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });



  // normal-部门管理
  fastify.get('/system/dept/list', async (request, response) => {
    const handler = await import('../functions/system/dept/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-部门管理
  fastify.post('/system/dept/list', async (request, response) => {
    const handler = await import('../functions/system/dept/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-部门管理
  fastify.put('/system/dept/list', async (request, response) => {
    const handler = await import('../functions/system/dept/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-部门管理
  fastify.delete('/system/dept/list', async (request, response) => {
    const handler = await import('../functions/system/dept/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-swagger接口
  fastify.get('/tools/swagger', async (request, response) => {
    const handler = await import('../functions/tools/swagger') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-swagger接口
  fastify.post('/tools/swagger', async (request, response) => {
    const handler = await import('../functions/tools/swagger') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 表列表
  fastify.get('/system/table/list', async (request, response) => {
    const handler = await import('../functions/system/table/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 表列表
  fastify.post('/system/table/list', async (request, response) => {
    const handler = await import('../functions/system/table/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 表列表
  fastify.put('/system/table/list', async (request, response) => {
    const handler = await import('../functions/system/table/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 表列表
  fastify.delete('/system/table/list', async (request, response) => {
    const handler = await import('../functions/system/table/list') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 无描述
  fastify.get('/mock/industry', async (request, response) => {
    const handler = await import('../functions/mock/industry') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 无描述
  fastify.post('/mock/industry', async (request, response) => {
    const handler = await import('../functions/mock/industry') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 无描述
  fastify.get('/mock/getBusinessOcr', async (request, response) => {
    const handler = await import('../functions/mock/getBusinessOcr') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 无描述
  fastify.post('/mock/getBusinessOcr', async (request, response) => {
    const handler = await import('../functions/mock/getBusinessOcr') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 无描述
  fastify.get('/mock/getCompanyWelfare', async (request, response) => {
    const handler = await import('../functions/mock/getCompanyWelfare') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 无描述
  fastify.post('/mock/getCompanyWelfare', async (request, response) => {
    const handler = await import('../functions/mock/getCompanyWelfare') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 无描述
  fastify.get('/mock/getPostsBySearch', async (request, response) => {
    const handler = await import('../functions/mock/getPostsBySearch') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 无描述
  fastify.post('/mock/getPostsBySearch', async (request, response) => {
    const handler = await import('../functions/mock/getPostsBySearch') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 无描述
  fastify.get('/mock/test', async (request, response) => {
    const handler = await import('../functions/mock/test') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 无描述
  fastify.post('/mock/test', async (request, response) => {
    const handler = await import('../functions/mock/test') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-重建缓存
  fastify.get('/system/config/buildcache', async (request, response) => {
    const handler = await import('../functions/system/config/buildcache') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-表关联管理
  fastify.get('/system/table/linkmanager', async (request, response) => {
    const handler = await import('../functions/system/table/linkmanager') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-接口标准类
  fastify.get('/utils/handerApiNormal', async (request, response) => {
    const handler = await import('../functions/utils/handerApiNormal') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // normal-接口标准类
  fastify.post('/utils/handerApiNormal', async (request, response) => {
    const handler = await import('../functions/utils/handerApiNormal') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });


  // 无描述
  fastify.get('/mock/getCitys', async (request, response) => {
    const handler = await import('../functions/mock/getCitys') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 无描述
  fastify.post('/mock/getCitys', async (request, response) => {
    const handler = await import('../functions/mock/getCitys') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 小程序-登录
  fastify.post('/user/login/mnpLogin', async (request, response) => {
    const handler = await import('../functions/user/login/mnpLogin') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 用户处理逻辑
  fastify.post('/user/user.service', async (request, response) => {
    const handler = await import('../functions/user/user.service') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 用户处理逻辑
  fastify.get('/user/user.service', async (request, response) => {
    const handler = await import('../functions/user/user.service') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 配置中心
  fastify.post('/system/config.service', async (request, response) => {
    const handler = await import('../functions/system/config.service') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 配置中心
  fastify.get('/system/config.service', async (request, response) => {
    const handler = await import('../functions/system/config.service') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 无描述
  fastify.get('/ai/completions', async (request, response) => {
    const handler = await import('../functions/ai/completions') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 无描述
  fastify.post('/ai/completions', async (request, response) => {
    const handler = await import('../functions/ai/completions') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取个人信息
  fastify.get('/user/user_info', async (request, response) => {
    const handler = await import('../functions/user/user_info') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 登录-获取验证码
  fastify.post('/user/login/sms_code', async (request, response) => {
    const handler = await import('../functions/user/login/sms_code') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 短信相关能力
  fastify.post('/utils/sms', async (request, response) => {
    const handler = await import('../functions/utils/sms') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 短信相关能力
  fastify.get('/utils/sms', async (request, response) => {
    const handler = await import('../functions/utils/sms') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 登录-手机号验证码
  fastify.post('/user/login/mobile', async (request, response) => {
    const handler = await import('../functions/user/login/mobile') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // OCR功能
  fastify.post('/hr/ocr', async (request, response) => {
    const handler = await import('../functions/hr/ocr') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 通用账户表接口服务
  fastify.post('/rest/general_account', async (request, response) => {
    const handler = await import('../functions/rest/general_account') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 通用账户表接口服务
  fastify.get('/rest/general_account', async (request, response) => {
    const handler = await import('../functions/rest/general_account') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 通用账户表接口服务
  fastify.put('/rest/general_account', async (request, response) => {
    const handler = await import('../functions/rest/general_account') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 通用账户表接口服务
  fastify.delete('/rest/general_account', async (request, response) => {
    const handler = await import('../functions/rest/general_account') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 微信支付封装
  fastify.post('/finance/utils/weixin', async (request, response) => {
    const handler = await import('../functions/finance/utils/weixin') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 微信支付封装
  fastify.get('/finance/utils/weixin', async (request, response) => {
    const handler = await import('../functions/finance/utils/weixin') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取企业
  fastify.post('/company/get-info', async (request, response) => {
    const handler = await import('../functions/company/get-info') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 收藏及取消收藏
  fastify.post('/favorite/put-favorite', async (request, response) => {
    const handler = await import('../functions/favorite/put-favorite') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 新增浏览记录
  fastify.post('/hunter/view-record', async (request, response) => {
    const handler = await import('../functions/hunter/view-record') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 上传简历
  fastify.post('/hunter/upload-jianli', async (request, response) => {
    const handler = await import('../functions/hunter/upload-jianli') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 测试函数2
  fastify.post('/test/test/test2', async (request, response) => {
    const handler = await import('../functions/test/test/test2') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 设置接口或菜单权限
  fastify.post('/system/menu/modify-permission', async (request, response) => {
    const handler = await import('../functions/system/menu/modify-permission') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 聊天会话表接口服务
  fastify.post('/rest/im_session', async (request, response) => {
    const handler = await import('../functions/rest/im_session') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 聊天会话表接口服务
  fastify.get('/rest/im_session', async (request, response) => {
    const handler = await import('../functions/rest/im_session') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 聊天会话表接口服务
  fastify.put('/rest/im_session', async (request, response) => {
    const handler = await import('../functions/rest/im_session') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 聊天会话表接口服务
  fastify.delete('/rest/im_session', async (request, response) => {
    const handler = await import('../functions/rest/im_session') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 消息表接口服务
  fastify.post('/rest/message', async (request, response) => {
    const handler = await import('../functions/rest/message') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 消息表接口服务
  fastify.get('/rest/message', async (request, response) => {
    const handler = await import('../functions/rest/message') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 消息表接口服务
  fastify.put('/rest/message', async (request, response) => {
    const handler = await import('../functions/rest/message') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 消息表接口服务
  fastify.delete('/rest/message', async (request, response) => {
    const handler = await import('../functions/rest/message') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商家表接口服务
  fastify.post('/rest/shop', async (request, response) => {
    const handler = await import('../functions/rest/shop') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商家表接口服务
  fastify.get('/rest/shop', async (request, response) => {
    const handler = await import('../functions/rest/shop') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商家表接口服务
  fastify.put('/rest/shop', async (request, response) => {
    const handler = await import('../functions/rest/shop') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商家表接口服务
  fastify.delete('/rest/shop', async (request, response) => {
    const handler = await import('../functions/rest/shop') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商家员工表接口服务
  fastify.post('/rest/shop_worker', async (request, response) => {
    const handler = await import('../functions/rest/shop_worker') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商家员工表接口服务
  fastify.get('/rest/shop_worker', async (request, response) => {
    const handler = await import('../functions/rest/shop_worker') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商家员工表接口服务
  fastify.put('/rest/shop_worker', async (request, response) => {
    const handler = await import('../functions/rest/shop_worker') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商家员工表接口服务
  fastify.delete('/rest/shop_worker', async (request, response) => {
    const handler = await import('../functions/rest/shop_worker') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 即时通讯网关
  fastify.get('/__websocket__', async (request, response) => {
    const handler = await import('../functions/__websocket__') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 即时通讯网关
  fastify.post('/__websocket__', async (request, response) => {
    const handler = await import('../functions/__websocket__') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 会话服务类
  fastify.get('/im/service/session', async (request, response) => {
    const handler = await import('../functions/im/service/session') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 会话服务类
  fastify.post('/im/service/session', async (request, response) => {
    const handler = await import('../functions/im/service/session') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 即时通讯类型
  fastify.get('/im/types/index', async (request, response) => {
    const handler = await import('../functions/im/types/index') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 即时通讯连接器
  fastify.post('/im/service/connect', async (request, response) => {
    const handler = await import('../functions/im/service/connect') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 即时通讯连接器
  fastify.get('/im/service/connect', async (request, response) => {
    const handler = await import('../functions/im/service/connect') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 即时通讯消息服务
  fastify.post('/im/service/message', async (request, response) => {
    const handler = await import('../functions/im/service/message') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 即时通讯消息服务
  fastify.get('/im/service/message', async (request, response) => {
    const handler = await import('../functions/im/service/message') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 即时通讯工具函数
  fastify.post('/im/utils/index', async (request, response) => {
    const handler = await import('../functions/im/utils/index') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 即时通讯工具函数
  fastify.get('/im/utils/index', async (request, response) => {
    const handler = await import('../functions/im/utils/index') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // redis能力封装
  fastify.post('/utils/redis', async (request, response) => {
    const handler = await import('../functions/utils/redis') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // redis能力封装
  fastify.get('/utils/redis', async (request, response) => {
    const handler = await import('../functions/utils/redis') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 查询用户
  fastify.get('/user/query/get-user', async (request, response) => {
    const handler = await import('../functions/user/query/get-user') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 查询用户
  fastify.post('/user/query/get-user', async (request, response) => {
    const handler = await import('../functions/user/query/get-user') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 订单业务参数类型
  fastify.post('/trade/types/dto', async (request, response) => {
    const handler = await import('../functions/trade/types/dto') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 创建或更新分组
  fastify.post('/mall/goods/put-group', async (request, response) => {
    const handler = await import('../functions/mall/goods/put-group') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 检测商户权限
  fastify.post('/shop/utils/checkAuth', async (request, response) => {
    const handler = await import('../functions/shop/utils/checkAuth') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取我可管理商户
  fastify.get('/shop/get-shop-roles', async (request, response) => {
    const handler = await import('../functions/shop/get-shop-roles') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 创建或更新商户
  fastify.post('/shop/put-shop', async (request, response) => {
    const handler = await import('../functions/shop/put-shop') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 删除分组标签
  fastify.post('/mall/goods/delete-group', async (request, response) => {
    const handler = await import('../functions/mall/goods/delete-group') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取商家商品分组
  fastify.get('/mall/goods/get-group', async (request, response) => {
    const handler = await import('../functions/mall/goods/get-group') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取商家商品分组
  fastify.post('/mall/goods/get-group', async (request, response) => {
    const handler = await import('../functions/mall/goods/get-group') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商家门店表接口服务
  fastify.post('/rest/shop_store', async (request, response) => {
    const handler = await import('../functions/rest/shop_store') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商家门店表接口服务
  fastify.get('/rest/shop_store', async (request, response) => {
    const handler = await import('../functions/rest/shop_store') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商家门店表接口服务
  fastify.put('/rest/shop_store', async (request, response) => {
    const handler = await import('../functions/rest/shop_store') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商家门店表接口服务
  fastify.delete('/rest/shop_store', async (request, response) => {
    const handler = await import('../functions/rest/shop_store') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 新增或编辑商品
  fastify.post('/mall/goods/put-goods', async (request, response) => {
    const handler = await import('../functions/mall/goods/put-goods') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商品表接口服务
  fastify.post('/rest/goods', async (request, response) => {
    const handler = await import('../functions/rest/goods') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商品表接口服务
  fastify.get('/rest/goods', async (request, response) => {
    const handler = await import('../functions/rest/goods') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商品表接口服务
  fastify.put('/rest/goods', async (request, response) => {
    const handler = await import('../functions/rest/goods') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商品表接口服务
  fastify.delete('/rest/goods', async (request, response) => {
    const handler = await import('../functions/rest/goods') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取商品列表
  fastify.post('/mall/goods/get-goods', async (request, response) => {
    const handler = await import('../functions/mall/goods/get-goods') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 新增或更新商户门店
  fastify.post('/shop/update-store', async (request, response) => {
    const handler = await import('../functions/shop/update-store') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取商家门店列表
  fastify.post('/shop/get-store', async (request, response) => {
    const handler = await import('../functions/shop/get-store') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取商家门店列表
  fastify.get('/shop/get-store', async (request, response) => {
    const handler = await import('../functions/shop/get-store') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 删除商家门店列表
  fastify.post('/shop/delete-store', async (request, response) => {
    const handler = await import('../functions/shop/delete-store') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取商品详情
  fastify.post('/mall/goods/good-detail', async (request, response) => {
    const handler = await import('../functions/mall/goods/good-detail') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取商品详情
  fastify.get('/mall/goods/good-detail', async (request, response) => {
    const handler = await import('../functions/mall/goods/good-detail') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 机器人消息处理器
  fastify.post('/im/webhook/private', async (request, response) => {
    const handler = await import('../functions/im/webhook/private') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });


  // 聊天智能体
  fastify.post('/im/webhook/agent', async (request, response) => {
    const handler = await import('../functions/im/webhook/agent') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });


  // 文字转语音
  fastify.post('/im/services/fish', async (request, response) => {
    const handler = await import('../functions/im/services/fish') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 文字转语音
  fastify.get('/im/services/fish', async (request, response) => {
    const handler = await import('../functions/im/services/fish') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 文字转语音
  fastify.post('/ai/tts/textToSpeech', async (request, response) => {
    const handler = await import('../functions/ai/tts/textToSpeech') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 请求FastGpt接口
  fastify.post('/ai/request/fastgpt', async (request, response) => {
    const handler = await import('../functions/ai/request/fastgpt') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 构建或创建订单
  fastify.post('/trade/build-or-create', async (request, response) => {
    const handler = await import('../functions/trade/build-or-create') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });


  // 新增或更新地址
  fastify.post('/shop/update-address', async (request, response) => {
    const handler = await import('../functions/shop/update-address') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 新增或更新地址
  fastify.get('/shop/update-address', async (request, response) => {
    const handler = await import('../functions/shop/update-address') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 订单发货/配送单表接口服务
  fastify.post('/rest/order_delivery/delivery_note', async (request, response) => {
    const handler = await import('../functions/rest/order_delivery/delivery_note') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 订单发货/配送单表接口服务
  fastify.get('/rest/order_delivery/delivery_note', async (request, response) => {
    const handler = await import('../functions/rest/order_delivery/delivery_note') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 订单发货/配送单表接口服务
  fastify.put('/rest/order_delivery/delivery_note', async (request, response) => {
    const handler = await import('../functions/rest/order_delivery/delivery_note') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 订单发货/配送单表接口服务
  fastify.delete('/rest/order_delivery/delivery_note', async (request, response) => {
    const handler = await import('../functions/rest/order_delivery/delivery_note') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 订单表接口服务
  fastify.post('/rest/trade', async (request, response) => {
    const handler = await import('../functions/rest/trade') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 订单表接口服务
  fastify.get('/rest/trade', async (request, response) => {
    const handler = await import('../functions/rest/trade') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 订单表接口服务
  fastify.put('/rest/trade', async (request, response) => {
    const handler = await import('../functions/rest/trade') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 订单表接口服务
  fastify.delete('/rest/trade', async (request, response) => {
    const handler = await import('../functions/rest/trade') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 订单明细表接口服务
  fastify.post('/rest/trade_order', async (request, response) => {
    const handler = await import('../functions/rest/trade_order') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 订单明细表接口服务
  fastify.get('/rest/trade_order', async (request, response) => {
    const handler = await import('../functions/rest/trade_order') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 订单明细表接口服务
  fastify.put('/rest/trade_order', async (request, response) => {
    const handler = await import('../functions/rest/trade_order') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 订单明细表接口服务
  fastify.delete('/rest/trade_order', async (request, response) => {
    const handler = await import('../functions/rest/trade_order') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 用户收货地址表接口服务
  fastify.post('/rest/users_address', async (request, response) => {
    const handler = await import('../functions/rest/users_address') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 用户收货地址表接口服务
  fastify.get('/rest/users_address', async (request, response) => {
    const handler = await import('../functions/rest/users_address') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 用户收货地址表接口服务
  fastify.put('/rest/users_address', async (request, response) => {
    const handler = await import('../functions/rest/users_address') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 用户收货地址表接口服务
  fastify.delete('/rest/users_address', async (request, response) => {
    const handler = await import('../functions/rest/users_address') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 创建订单
  fastify.post('/trade/service/create-trade', async (request, response) => {
    const handler = await import('../functions/trade/service/create-trade') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取用户地址
  fastify.post('/shop/get-user-address', async (request, response) => {
    const handler = await import('../functions/shop/get-user-address') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取用户地址
  fastify.get('/shop/get-user-address', async (request, response) => {
    const handler = await import('../functions/shop/get-user-address') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 删除用户地址
  fastify.post('/shop/delete-user-address', async (request, response) => {
    const handler = await import('../functions/shop/delete-user-address') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 删除用户地址
  fastify.get('/shop/delete-user-address', async (request, response) => {
    const handler = await import('../functions/shop/delete-user-address') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 下单逻辑测试
  fastify.post('/trade/test/create-trade', async (request, response) => {
    const handler = await import('../functions/trade/test/create-trade') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 文章表接口服务
  fastify.post('/rest/article', async (request, response) => {
    const handler = await import('../functions/rest/article') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 文章表接口服务
  fastify.get('/rest/article', async (request, response) => {
    const handler = await import('../functions/rest/article') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 文章表接口服务
  fastify.put('/rest/article', async (request, response) => {
    const handler = await import('../functions/rest/article') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 文章表接口服务
  fastify.delete('/rest/article', async (request, response) => {
    const handler = await import('../functions/rest/article') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 更新文章
  fastify.post('/shop/update-article', async (request, response) => {
    const handler = await import('../functions/shop/update-article') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 更新文章
  fastify.get('/shop/update-article', async (request, response) => {
    const handler = await import('../functions/shop/update-article') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取文章列表
  fastify.post('/shop/get-article', async (request, response) => {
    const handler = await import('../functions/shop/get-article') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取文章列表
  fastify.get('/shop/get-article', async (request, response) => {
    const handler = await import('../functions/shop/get-article') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 实名三要素
  fastify.get('/user/authentication', async (request, response) => {
    const handler = await import('../functions/user/authentication') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 实名三要素
  fastify.post('/user/authentication', async (request, response) => {
    const handler = await import('../functions/user/authentication') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 更新个人信息
  fastify.post('/user/update-userinfo', async (request, response) => {
    const handler = await import('../functions/user/update-userinfo') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 更新个人信息
  fastify.get('/user/update-userinfo', async (request, response) => {
    const handler = await import('../functions/user/update-userinfo') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 用户购物车表接口服务
  fastify.post('/rest/user_cart', async (request, response) => {
    const handler = await import('../functions/rest/user_cart') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 用户购物车表接口服务
  fastify.get('/rest/user_cart', async (request, response) => {
    const handler = await import('../functions/rest/user_cart') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 用户购物车表接口服务
  fastify.put('/rest/user_cart', async (request, response) => {
    const handler = await import('../functions/rest/user_cart') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 用户购物车表接口服务
  fastify.delete('/rest/user_cart', async (request, response) => {
    const handler = await import('../functions/rest/user_cart') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 文字转语音(硅基流动)
  fastify.post('/ai/tts/fish-tts', async (request, response) => {
    const handler = await import('../functions/ai/tts/fish-tts') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取购物车数据
  fastify.post('/cart/service/get-cart', async (request, response) => {
    const handler = await import('../functions/cart/service/get-cart') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 查询购物车能力
  fastify.post('/cart/utils/get-cart-data', async (request, response) => {
    const handler = await import('../functions/cart/utils/get-cart-data') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 创建租赁订单
  fastify.post('/trade/service/create-lease-trade', async (request, response) => {
    const handler = await import('../functions/trade/service/create-lease-trade') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 类目分组表接口服务
  fastify.post('/rest/group_tag', async (request, response) => {
    const handler = await import('../functions/rest/group_tag') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 类目分组表接口服务
  fastify.get('/rest/group_tag', async (request, response) => {
    const handler = await import('../functions/rest/group_tag') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 类目分组表接口服务
  fastify.put('/rest/group_tag', async (request, response) => {
    const handler = await import('../functions/rest/group_tag') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 类目分组表接口服务
  fastify.delete('/rest/group_tag', async (request, response) => {
    const handler = await import('../functions/rest/group_tag') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });


  // 微信客服消息
  fastify.post('/wechat/openapi/message', async (request, response) => {
    const handler = await import('../functions/wechat/openapi/message') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 微信客服消息
  fastify.get('/wechat/openapi/message', async (request, response) => {
    const handler = await import('../functions/wechat/openapi/message') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取订单详情
  fastify.get('/trade/service/detail', async (request, response) => {
    const handler = await import('../functions/trade/service/detail') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取用户端订单
  fastify.post('/trade/service/buyer-trades', async (request, response) => {
    const handler = await import('../functions/trade/service/buyer-trades') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });



  // 获取商家端订单
  fastify.post('/trade/service/ger-shop-trades', async (request, response) => {
    const handler = await import('../functions/trade/service/ger-shop-trades') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });


  // 支付配置表表接口服务
  fastify.post('/rest/pay_config', async (request, response) => {
    const handler = await import('../functions/rest/pay_config') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 支付配置表表接口服务
  fastify.get('/rest/pay_config', async (request, response) => {
    const handler = await import('../functions/rest/pay_config') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 支付配置表表接口服务
  fastify.put('/rest/pay_config', async (request, response) => {
    const handler = await import('../functions/rest/pay_config') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 支付配置表表接口服务
  fastify.delete('/rest/pay_config', async (request, response) => {
    const handler = await import('../functions/rest/pay_config') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 微信支付结果回调
  fastify.post('/finance/callback/wxpay', async (request, response) => {
    const handler = await import('../functions/finance/callback/wxpay') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 微信支付结果回调
  fastify.get('/finance/callback/wxpay', async (request, response) => {
    const handler = await import('../functions/finance/callback/wxpay') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });



  // 发起订单支付
  fastify.post('/trade/service/create-pay', async (request, response) => {
    const handler = await import('../functions/trade/service/create-pay') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取租户支付配置
  fastify.get('/finance/payment/get-pay-config', async (request, response) => {
    const handler = await import('../functions/finance/payment/get-pay-config') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 更新支付配置
  fastify.post('/finance/payment/put-pay-config', async (request, response) => {
    const handler = await import('../functions/finance/payment/put-pay-config') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });


  // 关闭订单
  fastify.post('/trade/service/close-trade', async (request, response) => {
    const handler = await import('../functions/trade/service/close-trade') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商家确认订单
  fastify.post('/trade/service/confirm-trade', async (request, response) => {
    const handler = await import('../functions/trade/service/confirm-trade') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商家订单发货
  fastify.post('/trade/service/post-trade', async (request, response) => {
    const handler = await import('../functions/trade/service/post-trade') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 商家准备订单
  fastify.post('/trade/service/make-trade', async (request, response) => {
    const handler = await import('../functions/trade/service/make-trade') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 买家取消订单
  fastify.post('/trade/services/cancel-trade', async (request, response) => {
    const handler = await import('../functions/trade/services/cancel-trade') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 检查订单支付结果
  fastify.post('/trade/service/check-trade-pay-result', async (request, response) => {
    const handler = await import('../functions/trade/service/check-trade-pay-result') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 用户删除/隐藏订单
  fastify.post('/trade/service/user-hide-trade', async (request, response) => {
    const handler = await import('../functions/trade/service/user-hide-trade') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取商家统计数据
  fastify.get('/shop/controller/get-dashboard', async (request, response) => {
    const handler = await import('../functions/shop/controller/get-dashboard') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取员工权限集合
  fastify.get('/shop/worker/get-permissions', async (request, response) => {
    const handler = await import('../functions/shop/worker/get-permissions') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 创建或更新员工
  fastify.post('/shop/worker/post', async (request, response) => {
    const handler = await import('../functions/shop/worker/post') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取员工列表
  fastify.post('/shop/worker/get-worker', async (request, response) => {
    const handler = await import('../functions/shop/worker/get-worker') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 删除员工
  fastify.post('/shop/worker/delete-worker', async (request, response) => {
    const handler = await import('../functions/shop/worker/delete-worker') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 订单确认签收
  fastify.post('/trade/service/sign-trade', async (request, response) => {
    const handler = await import('../functions/trade/service/sign-trade') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 改变订单租赁状态
  fastify.post('/trade/service/change-lease-status', async (request, response) => {
    const handler = await import('../functions/trade/service/change-lease-status') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });


  // 加购操作
  fastify.post('/mall/cart/add-cart', async (request, response) => {
    const handler = await import('../functions/mall/cart/add-cart') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });


  // 获取图表数据
  fastify.post('/test/chart', async (request, response) => {
    const handler = await import('../functions/test/chart') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取图表数据
  fastify.get('/test/chart', async (request, response) => {
    const handler = await import('../functions/test/chart') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 用户已支付回执
  fastify.post('/finace/payment-confirm-pay', async (request, response) => {
    const handler = await import('../functions/finace/payment-confirm-pay') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取购物车数据
  fastify.get('/mall/cart/get-cart', async (request, response) => {
    const handler = await import('../functions/mall/cart/get-cart') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 更新购物车记录
  fastify.post('/mall/cart/update-cart', async (request, response) => {
    const handler = await import('../functions/mall/cart/update-cart') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 删除购物车
  fastify.post('/mall/cart/delete-cart', async (request, response) => {
    const handler = await import('../functions/mall/cart/delete-cart') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });



  // 请求Dify接口
  fastify.post('/ai/request/dify', async (request, response) => {
    const handler = await import('../functions/ai/request/dify') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 通用OpenAI请求
  fastify.post('/ai/request/openai', async (request, response) => {
    const handler = await import('../functions/ai/request/openai') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 上传音色接口
  fastify.post('/ai/tts/upload-voice', async (request, response) => {
    const handler = await import('../functions/ai/tts/upload-voice') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // TTS音色表接口服务
  fastify.post('/rest/tts_voice', async (request, response) => {
    const handler = await import('../functions/rest/tts_voice') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // TTS音色表接口服务
  fastify.get('/rest/tts_voice', async (request, response) => {
    const handler = await import('../functions/rest/tts_voice') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // TTS音色表接口服务
  fastify.put('/rest/tts_voice', async (request, response) => {
    const handler = await import('../functions/rest/tts_voice') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // TTS音色表接口服务
  fastify.delete('/rest/tts_voice', async (request, response) => {
    const handler = await import('../functions/rest/tts_voice') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 创建微信小程序码
  fastify.post('/share/utils/create-share-qrcode', async (request, response) => {
    const handler = await import('../functions/share/utils/create-share-qrcode') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 创建微信小程序永久码
  fastify.post('/share/utils/create-unlimit-mini-qrcode', async (request, response) => {
    const handler = await import('../functions/share/utils/create-unlimit-mini-qrcode') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 分销商表接口服务
  fastify.post('/rest/share_distributor', async (request, response) => {
    const handler = await import('../functions/rest/share_distributor') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 分销商表接口服务
  fastify.get('/rest/share_distributor', async (request, response) => {
    const handler = await import('../functions/rest/share_distributor') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 分销商表接口服务
  fastify.put('/rest/share_distributor', async (request, response) => {
    const handler = await import('../functions/rest/share_distributor') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 分销商表接口服务
  fastify.delete('/rest/share_distributor', async (request, response) => {
    const handler = await import('../functions/rest/share_distributor') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 智能体虚拟人表接口服务
  fastify.post('/rest/agent_humans', async (request, response) => {
    const handler = await import('../functions/rest/agent_humans') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 智能体虚拟人表接口服务
  fastify.get('/rest/agent_humans', async (request, response) => {
    const handler = await import('../functions/rest/agent_humans') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 智能体虚拟人表接口服务
  fastify.put('/rest/agent_humans', async (request, response) => {
    const handler = await import('../functions/rest/agent_humans') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 智能体虚拟人表接口服务
  fastify.delete('/rest/agent_humans', async (request, response) => {
    const handler = await import('../functions/rest/agent_humans') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 构建虚拟人实例
  fastify.post('/ai/agent/put-agent-human', async (request, response) => {
    const handler = await import('../functions/ai/agent/put-agent-human') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取虚拟人实例
  fastify.get('/ai/agent/get-agent-human', async (request, response) => {
    const handler = await import('../functions/ai/agent/get-agent-human') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });


  // 批量创建推广码记录表接口服务
  fastify.post('/rest/promo_code_batch', async (request, response) => {
    const handler = await import('../functions/rest/promo_code_batch') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 批量创建推广码记录表接口服务
  fastify.get('/rest/promo_code_batch', async (request, response) => {
    const handler = await import('../functions/rest/promo_code_batch') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 批量创建推广码记录表接口服务
  fastify.put('/rest/promo_code_batch', async (request, response) => {
    const handler = await import('../functions/rest/promo_code_batch') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 批量创建推广码记录表接口服务
  fastify.delete('/rest/promo_code_batch', async (request, response) => {
    const handler = await import('../functions/rest/promo_code_batch') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 推广码表接口服务
  fastify.post('/rest/promo_code', async (request, response) => {
    const handler = await import('../functions/rest/promo_code') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 推广码表接口服务
  fastify.get('/rest/promo_code', async (request, response) => {
    const handler = await import('../functions/rest/promo_code') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 推广码表接口服务
  fastify.put('/rest/promo_code', async (request, response) => {
    const handler = await import('../functions/rest/promo_code') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 推广码表接口服务
  fastify.delete('/rest/promo_code', async (request, response) => {
    const handler = await import('../functions/rest/promo_code') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 批量创建推广码
  fastify.post('/share/batch-create-code', async (request, response) => {
    const handler = await import('../functions/share/batch-create-code') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });


  // 获取批量生码记录
  fastify.post('/share/get-batch-createcode-log', async (request, response) => {
    const handler = await import('../functions/share/get-batch-createcode-log') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 创建或更新分销商
  fastify.post('/share/distributor/post', async (request, response) => {
    const handler = await import('../functions/share/distributor/post') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 查询分销商
  fastify.post('/share/distributor/get-distributor', async (request, response) => {
    const handler = await import('../functions/share/distributor/get-distributor') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 绑定推广码
  fastify.post('/share/bind-promo-code', async (request, response) => {
    const handler = await import('../functions/share/bind-promo-code') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 处理推广码扫码
  fastify.post('/share/promo-code-scan', async (request, response) => {
    const handler = await import('../functions/share/promo-code-scan') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取推广码列表
  fastify.post('/share/get-promo-code', async (request, response) => {
    const handler = await import('../functions/share/get-promo-code') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 推广码批量下载回执
  fastify.post('/share/promo-code-downloaded', async (request, response) => {
    const handler = await import('../functions/share/promo-code-downloaded') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取商家信息详情
  fastify.get('/shop/get-shop-detail', async (request, response) => {
    const handler = await import('../functions/shop/get-shop-detail') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取指定商家信息
  fastify.get('/shop/controller/get-shop-info', async (request, response) => {
    const handler = await import('../functions/shop/controller/get-shop-info') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });


  // 获取微信H5配置
  fastify.post('/wechat/openapi/get-wx-sdk-config', async (request, response) => {
    const handler = await import('../functions/wechat/openapi/get-wx-sdk-config') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 根据位置获取地标列表
  fastify.post('/utils/map/getLocale', async (request, response) => {
    const handler = await import('../functions/utils/map/getLocale') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });


  // 公众号消息接收
  fastify.get('/wechat/openapi/receiver', async (request, response) => {
    const handler = await import('../functions/wechat/openapi/receiver') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 公众号消息接收
  fastify.post('/wechat/openapi/receiver', async (request, response) => {
    const handler = await import('../functions/wechat/openapi/receiver') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 公众号消息接收
  fastify.put('/wechat/openapi/receiver', async (request, response) => {
    const handler = await import('../functions/wechat/openapi/receiver') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 公众号消息接收
  fastify.patch('/wechat/openapi/receiver', async (request, response) => {
    const handler = await import('../functions/wechat/openapi/receiver') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 公众号消息接收
  fastify.delete('/wechat/openapi/receiver', async (request, response) => {
    const handler = await import('../functions/wechat/openapi/receiver') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });


  // 微信授权登录
  fastify.post('/user/login/loginByWechatAuth', async (request, response) => {
    const handler = await import('../functions/user/login/loginByWechatAuth') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 设置公众号菜单
  fastify.post('/wechat/openapi/set-menu', async (request, response) => {
    const handler = await import('../functions/wechat/openapi/set-menu') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });


  // 获取邀请用户
  fastify.post('/share/get-invite-users', async (request, response) => {
    const handler = await import('../functions/share/get-invite-users') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 绑定手机号
  fastify.post('/user/bind-phone', async (request, response) => {
    const handler = await import('../functions/user/bind-phone') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 获取推广中心统计
  fastify.get('/share/get-dashboard', async (request, response) => {
    const handler = await import('../functions/share/get-dashboard') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 佣金记录表接口服务
  fastify.post('/rest/commission_record', async (request, response) => {
    const handler = await import('../functions/rest/commission_record') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 佣金记录表接口服务
  fastify.get('/rest/commission_record', async (request, response) => {
    const handler = await import('../functions/rest/commission_record') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 佣金记录表接口服务
  fastify.put('/rest/commission_record', async (request, response) => {
    const handler = await import('../functions/rest/commission_record') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 佣金记录表接口服务
  fastify.delete('/rest/commission_record', async (request, response) => {
    const handler = await import('../functions/rest/commission_record') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 新增或更新分组
  fastify.post('/tag/put-tag', async (request, response) => {
    const handler = await import('../functions/tag/put-tag') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });

  // 新增或更新分组
  fastify.get('/tag/put-tag', async (request, response) => {
    const handler = await import('../functions/tag/put-tag') as any;
    try {
      const ctx = request.functionContext;
      const result = await handler.default?.(ctx);
      return result;
    } catch(e) {
      console.error(e);
      return {
        code: 500,
        message: '服务器内部错误，请稍后重试'
      };
    } 
  });
};

export default routes;