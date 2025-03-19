import type { FastifyRequest, FastifyReply } from 'fastify';
import type { WebSocket } from 'ws';
import type { MultipartFile } from '@fastify/multipart';

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
    query: FastifyRequest['query'];
    body: Record<string, any>;
    params: FastifyRequest['params'];
    method: FastifyRequest['method'];
    webSocket?: WebSocket;
    request: FastifyRequest;
    response: FastifyReply;
    __function_name?: string;
    requestId?: string;
    url?: string;
    user: Record<string, any>;
}
export interface FunctionResult {
    data?: unknown;
    error?: Error;
    time_usage: number;
}