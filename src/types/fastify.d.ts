declare module '@@/types/fastify' {
  export interface FunctionContext {
    body: Record<string, any>;
    query: Record<string, any>;
    params: Record<string, any>;
    headers: Record<string, any>;
    user?: {
      id: string;
      username: string;
      roleList: string[];
      [key: string]: any;
    };
  }
} 