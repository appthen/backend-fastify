const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const cluster = require('cluster');

/**
 * 发送重启信号给主进程
 */
async function sendRestartSignal() {
  try {
    // 读取 pid 文件获取主进程 ID
    const pidFile = path.join(process.cwd(), 'app.pid');
    if (!fs.existsSync(pidFile)) {
      throw new Error('找不到 PID 文件，请确保服务正在运行');
    }

    const pid = fs.readFileSync(pidFile, 'utf-8').trim();
    console.log(`找到主进程 PID: ${pid}`);

    // 发送 SIGUSR2 信号触发优雅重启
    process.kill(pid, 'SIGUSR2');
    console.log('已发送重启信号');
  } catch (error) {
    console.error('发送重启信号失败:', error);
    throw error;
  }
}

/**
 * 执行增量构建
 * @param {string[]} files 需要构建的文件列表
 */
async function buildIncremental(files) {
  return new Promise((resolve, reject) => {
    // 设置环境变量
    process.env.INCREMENTAL_FILES = JSON.stringify(files);
    
    console.log('开始增量构建...');
    console.log('需要构建的文件:', files);

    // 执行 rollup 构建
    const rollup = spawn('npx', ['rollup', '-c'], {
      stdio: 'inherit',
      env: process.env
    });

    rollup.on('close', (code) => {
      if (code === 0) {
        console.log('增量构建完成');
        resolve();
      } else {
        const error = new Error(`构建失败，退出码: ${code}`);
        console.error(error.message);
        reject(error);
      }
    });

    rollup.on('error', (error) => {
      console.error('构建过程出错:', error);
      reject(error);
    });
  });
}

/**
 * 更新代码并重启服务
 * @param {string[]} files 需要更新的文件列表
 */
async function updateAndRestart(files) {
  try {
    console.log('开始增量构建...');
    await buildIncremental(files);
    console.log('增量构建完成');

    console.log('准备重启服务...');
    await sendRestartSignal();
    console.log('重启信号已发送');
  } catch (error) {
    console.error('更新失败:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const files = process.argv.slice(2);
  if (files.length === 0) {
    console.error('请指定需要更新的文件');
    process.exit(1);
  }

  updateAndRestart(files).catch(error => {
    console.error('更新失败:', error);
    process.exit(1);
  });
} else {
  module.exports = updateAndRestart;
} 