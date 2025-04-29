const { buildSync } = require('esbuild');
const { join } = require('path');
require('dotenv').config();

console.log('开始构建...');

try {
  const result = buildSync({
    entryPoints: ['src/server.ts'],
    bundle: true,
    outdir: 'dist',
    platform: 'node',
    target: 'node18',
    format: 'cjs',
    sourcemap: true,
    external: [
      'dotenv',
      'crypto',
      'path',
      'fs',
      'http',
      'https',
      'url',
      'stream',
      'buffer',
      'util',
      'events',
      'os',
      'net',
      'tls',
      'zlib',
      'child_process',
      'process',
      'fastify-plugin',
      '@fastify/autoload',
      '@fastify/cors',
      '@fastify/multipart',
      '@fastify/static',
      '@fastify/swagger',
      '@fastify/swagger-ui',
      '@fastify/type-provider-typebox',
      '@fastify/view',
      '@fastify/sensible',
      '@fastify/cookie',
      'ejs',
      'qiniu',
      'mongodb',
      'axios',
      'jsonwebtoken',
      'lodash',
      'moment',
      'dayjs',
      'ws',
      'nodemailer',
      'pino',
      'pino-pretty'
    ],
    define: {
      'process.env.MONGODB_URI': JSON.stringify(process.env.MONGODB_URI),
      'process.env.MONGODB_DB_NAME': JSON.stringify(process.env.MONGODB_DB_NAME),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    },
    loader: {
      '.ts': 'ts',
      '.js': 'jsx'
    },
    plugins: [
      {
        name: 'external-modules',
        setup(build) {
          // 将所有 @fastify/* 模块标记为外部模块
          build.onResolve({ filter: /^@fastify\// }, args => {
            return { external: true, path: args.path }
          })
        }
      }
    ]
  });

  console.log('构建完成！');
  console.log('输出目录：', join(process.cwd(), 'dist'));
  console.log('构建结果：', result);
} catch (error) {
  console.error('构建失败：', error);
  process.exit(1);
} 