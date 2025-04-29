#!/bin/bash

# 设置错误处理
set -e

# 加载环境变量（如果 .env 文件存在）
if [ -f .env ]; then
  echo "从 .env 文件加载环境变量..."
  export $(cat .env | grep -v '^#' | xargs)
fi

# 构建项目
echo "Building project..."
npm run build

# 定义信号处理函数
cleanup() {
    echo "收到终止信号，正在关闭应用..."
    if [ ! -z "$PID" ]; then
        kill -TERM "$PID" 2>/dev/null
    fi
}

# 注册信号处理
trap cleanup TERM INT

# 启动应用
echo "正在启动应用..."
node dist/server.js &
PID=$!

# 等待应用结束
wait $PID
EXIT_STATUS=$?

# 根据退出状态码决定是否重启
if [ $EXIT_STATUS -eq 143 ]; then  # SIGTERM 导致的退出
    echo "应用正常终止，准备重启..."
    exec $0  # 重新执行当前脚本
else
    echo "应用异常退出，退出码: $EXIT_STATUS"
    exit $EXIT_STATUS
fi 