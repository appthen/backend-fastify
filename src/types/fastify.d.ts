import { FastifyRequest, FastifyReply, RouteGenericInterface, RawServerDefault, FastifySchema, FastifyTypeProviderDefault } from 'fastify';
import { IncomingMessage, Server } from 'http';

type FunctionContext = {
  userId?: string;
  [key: string]: any;
};

declare module 'fastify' {
  interface FastifyRequest<
    RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
    RawServer extends RawServerDefault = RawServerDefault,
    RawRequest extends IncomingMessage = IncomingMessage,
  > {
    functionContext: FunctionContext;
    user?: any;
    cookies?: Record<string, string>;
    signedCookies?: Record<string, string>;
    route?: {
      path: string;
      method: string;
    };
  }

  interface FastifyReply {
    setCookie(name: string, value: string, options?: any): void;
    clearCookie(name: string, options?: any): void;
  }
}

export interface FunctionContext {
  request: FastifyRequest;
  response: FastifyReply;
  method: string;
  params: Record<string, string>;
  query: Record<string, any>;
  body: any;
  headers: Record<string, string | string[]>;
  user: any;
} 