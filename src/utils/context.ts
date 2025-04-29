import { FastifyRequest, FastifyReply } from 'fastify';
import { FunctionContext } from '../types/fastify';
import cloud from '@@/utils/cloud';

export async function createContext(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<FunctionContext> {
  // 创建 Express 兼容的 request 对象
  const authentication = request.headers['authorization'] || request.headers['Authorization'];
  let user = {};
  if (authentication && typeof authentication === 'string') {
    try {
      const parsed = cloud.parseToken(authentication.replace('Bearer ', ''));
      if (parsed) {
        user = parsed;
      }
    } catch(e) {}
  }

  // 获取上传的文件
  let files = [];
  try {
    if (request && (request as any).files) {
      try {
        // 使用 saveRequestFiles 方法处理文件
        files = await (request as any).saveRequestFiles();
        
        // 添加文件路径映射
        files = files.map(file => ({
          ...file,
          path: file.filepath || file.path // 兼容两种路径属性
        }));
        
      } catch (iteratorError) {
        console.error('文件处理错误:', iteratorError);
        console.error('错误堆栈:', iteratorError.stack);
        throw iteratorError;
      }
    }
  } catch (error) {
    console.error('文件处理错误:', error);
    console.error('错误堆栈:', error.stack);
    files = [];
  }
  
  const expressRequest = {
    ...request,
    path: request.url.split('?')[0],
    url: request.url,
    method: request.method,
    params: request.params,
    query: request.query,
    body: request.body,
    headers: request.headers,
    get: (name: string) => request.headers[name.toLowerCase()],
    header: (name: string) => request.headers[name.toLowerCase()],
    accepts: (type: string) => {
      const accept = request.headers.accept || '';
      return accept.includes(type);
    },
    is: (types: string | string[]) => {
      const contentType = request.headers['content-type'] || '';
      if (Array.isArray(types)) {
        return types.some(type => contentType.includes(type));
      }
      return contentType.includes(types);
    },
    protocol: request.protocol,
    secure: request.protocol === 'https',
    ip: request.ip,
    ips: request.ips || [],
    subdomains: request.hostname.split('.').slice(0, -2),
    hostname: request.hostname,
    host: request.hostname,
    fresh: false,
    stale: true,
    xhr: request.headers['x-requested-with'] === 'XMLHttpRequest',
    cookies: request.cookies || {},
    signedCookies: request.signedCookies || {},
    secret: undefined,
    app: request.server,
    route: request.route || { path: '', method: '' },
    originalUrl: request.url,
    baseUrl: request.url.split('?')[0],
    accepted: [],
    acceptsEncodings: [],
    acceptsCharsets: [],
    acceptsLanguages: [],
    param: (name: string) => request.params[name],
    isAuthenticated: () => !!request.user,
    isUnauthenticated: () => !request.user,
  } as unknown as FastifyRequest;

  // 创建 Express 兼容的 response 对象
  const expressResponse = {
    ...reply,
    status: (code: number) => {
      reply.status(code);
      return expressResponse;
    },
    send: (body: any) => {
      reply.send(body);
      return expressResponse;
    },
    json: (body: any) => {
      reply.send(body);
      return expressResponse;
    },
    jsonp: (body: any) => {
      reply.send(body);
      return expressResponse;
    },
    sendStatus: (code: number) => {
      reply.status(code).send();
      return expressResponse;
    },
    sendFile: (path: string) => {
      reply.send(path);
      return expressResponse;
    },
    download: (path: string, filename?: string) => {
      reply.header('Content-Disposition', `attachment; filename="${filename || path.split('/').pop()}"`);
      reply.send(path);
      return expressResponse;
    },
    redirect: (url: string, statusCode?: number) => {
      reply.redirect(url, statusCode || 302);
      return expressResponse;
    },
    render: (view: string, options?: any) => {
      reply.view(view, options);
      return expressResponse;
    },
    locals: (reply.raw as any).locals || {},
    charset: (reply.raw as any).charset || 'utf-8',
    headersSent: (reply.raw as any).headersSent || false,
    app: reply.server,
    req: expressRequest,
    get: (name: string) => reply.getHeader(name),
    set: (name: string, value: any) => {
      reply.header(name, value);
      return expressResponse;
    },
    append: (name: string, value: any) => {
      reply.header(name, value);
      return expressResponse;
    },
    cookie: (name: string, value: string, options?: any) => {
      reply.setCookie(name, value, options);
      return expressResponse;
    },
    clearCookie: (name: string, options?: any) => {
      reply.clearCookie(name, options);
      return expressResponse;
    },
  } as FastifyReply;
  // fix some bug
  const query = {};
  Object.keys(request.query).forEach(k => {
    query[k] = Array.isArray(request.query[k]) ? request.query[k][0] : request.query[k];
  });
  return {
    request: expressRequest,
    response: expressResponse,
    method: request.method,
    params: request.params,
    query,
    body: request.body,
    headers: request.headers,
    user: user || {},
    files: files,
  };
} 