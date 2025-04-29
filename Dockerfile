# 使用 Node.js 18 作为基础镜像
FROM node:18-alpine

# 使用阿里云的 Alpine 镜像源
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

# 安装 pnpm 和其他必要工具
RUN corepack enable && corepack prepare pnpm@latest --activate && \
    apk add --no-cache python3 make g++ bash

# 设置 npm registry
ARG NPM_REGISTRY=https://registry.npmmirror.com
ENV NPM_CONFIG_REGISTRY=$NPM_REGISTRY

# 设置 pnpm 环境变量，跳过交互提示
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PNPM_STORE_DIR=/root/.local/share/pnpm/store/v10-docker
ENV CI=true

# 设置工作目录
WORKDIR /app

# 复制 package.json
COPY package*.json ./

# 确保启动脚本有执行权限
COPY start.sh ./
RUN chmod +x start.sh

# 预安装 rollup 的 musl 依赖
RUN pnpm install rollup @rollup/rollup-linux-x64-musl

# 启动命令（先安装依赖，然后执行 start.sh）
CMD pnpm install && ./start.sh 