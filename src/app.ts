import 'dotenv/config';
import { join } from "path";
import AutoLoad from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import initHook from "./functions/__init__";
import { FunctionContext } from "./types/fastify";
import view from "@fastify/view";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // 使用 TypeBox 类型提供者
  fastify.withTypeProvider<TypeBoxTypeProvider>();

  // 注册视图引擎
  await fastify.register(view, {
    engine: {
      ejs: ejs
    },
    root: join(__dirname, "views")
  });

  // 加载插件
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // 加载路由
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });

  // 应用启动后执行初始化钩子
  const ctx: FunctionContext = {
    request: null as any,
    response: null as any,
    method: "GET",
    params: {},
    query: {},
    body: {},
    headers: {},
    user: {},
  };
  await initHook(ctx);
};

export default app;
