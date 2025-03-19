import { FastifyRequest, FastifyReply } from 'fastify';
import { FunctionContext } from '../types/fastify';

export function createContext(
  request: FastifyRequest,
  reply: FastifyReply
): FunctionContext {
  // 创建 Express 兼容的 request 对象
  const expressRequest = {
    ...request,
    path: request.url.split('?')[0], // 获取不带查询参数的路径
    url: request.url,
    method: request.method,
    params: request.params,
    query: request.query,
    body: request.body,
    headers: request.headers,
    user: request.user || {},
    // 添加常用的 request 方法
    get: (name: string) => request.headers[name.toLowerCase()],
    header: (name: string) => request.headers[name.toLowerCase()],
    accepts: (type: string) => {
      const accept = request.headers.accept || '';
      return accept.includes(type);
    },
    is: (type: string) => {
      const contentType = request.headers['content-type'] || '';
      return contentType.includes(type);
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
    route: request.route || {},
    originalUrl: request.url,
    baseUrl: request.url.split('?')[0],
    accepted: [],
    acceptsEncodings: [],
    acceptsCharsets: [],
    acceptsLanguages: [],
    param: (name: string) => request.params[name],
    isAuthenticated: () => !!request.user,
    isUnauthenticated: () => !request.user,
  };

  // 创建 Express 兼容的 response 对象
  const expressResponse = {
    ...reply,
    // 添加常用的 response 方法
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
    redirect: (statusOrUrl: string | number, url?: string) => {
      if (typeof statusOrUrl === 'number') {
        reply.redirect(url || '/', statusOrUrl);
      } else {
        reply.redirect(statusOrUrl);
      }
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
    cookie: (name: string, value: any, options?: any) => {
      reply.setCookie(name, value, options);
      return expressResponse;
    },
    clearCookie: (name: string, options?: any) => {
      reply.clearCookie(name, options);
      return expressResponse;
    },
  };

  return {
    request: expressRequest,
    response: expressResponse,
    method: request.method,
    params: request.params,
    query: request.query,
    body: request.body,
    headers: request.headers,
    user: request.user || {},
  };
} 