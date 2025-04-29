import type { FastifyRequest, FastifyReply } from 'fastify';
import type { WebSocket } from 'ws';
import type { MultipartFile } from '@fastify/multipart';
import { RouteGenericInterface, RawServerDefault } from 'fastify';
import { IncomingMessage } from 'http';

export interface IFunctionData {
    name: string;
    code: string;
    compiledCode: string;
}
export interface FunctionContext {
    files?: {
        [fieldname: string]: MultipartFile[];
    } | MultipartFile[] | undefined;
    headers: Record<string, any>;
    query: Record<string, any>;
    body: Record<string, any>;
    params: Record<string, any>;
    method: FastifyRequest['method'];
    webSocket?: WebSocket;
    request: FastifyRequest;
    response: FastifyReply;
    __function_name?: string;
    requestId?: string;
    url?: string;
    user: Record<string, any>;
    userId?: string;
    cookies?: Record<string, string>;
    signedCookies?: Record<string, string>;
    path?: string;
    route?: {
        path: string;
        method: string;
    };
    [key: string]: any;
}
export interface FunctionResult {
    data?: unknown;
    error?: Error;
    time_usage: number;
}

declare module 'fastify' {
    interface FastifyRequest<
        RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
        RawServer extends RawServerDefault = RawServerDefault,
        RawRequest extends IncomingMessage = IncomingMessage,
    > {
        functionContext: FunctionContext;
        user?: any;
    }

    interface FastifyReply {
        setCookie(name: string, value: string, options?: any): void;
        clearCookie(name: string, options?: any): void;
    }
}

declare module '@@/types/fastify' {
  export interface FunctionContext {
    body: any;
    query: any;
    params: any;
    headers: any;
    user?: {
      id: string;
      username: string;
      roleList: string[];
      [key: string]: any;
    };
  }
}