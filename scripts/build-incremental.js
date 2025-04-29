const { spawn } = require('child_process');
const path = require('path');

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

// 如果直接运行此脚本
if (require.main === module) {
  const files = process.argv.slice(2);
  if (files.length === 0) {
    console.error('请指定需要构建的文件');
    process.exit(1);
  }

  buildIncremental(files).catch(error => {
    console.error('构建失败:', error);
    process.exit(1);
  });
} else {
  module.exports = buildIncremental;
} 