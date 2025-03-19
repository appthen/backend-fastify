import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { FunctionContext } from '@@/types/fastify';
import { createContext } from '../utils/context';

const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const beforeRequest = await import('../functions/__interceptor__') as any;
  // 添加全局预处理钩子
  fastify.addHook('preHandler', async (request, reply) => {

    // 放行 OPTIONS 请求
    if (request.method === 'OPTIONS') {
      return resolve(true);
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
      (beforeRequest.main || beforeRequest.default)(ctx, next).then((result) => {
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
};

export default routes;