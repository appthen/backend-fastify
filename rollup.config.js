const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const json = require('@rollup/plugin-json');
const swc = require('@rollup/plugin-swc');
const alias = require('@rollup/plugin-alias');
const { defineConfig } = require('rollup');
const path = require('path');
const glob = require('glob');

// 获取需要编译的文件
function getInputFiles() {
  // 检查是否有增量编译的环境变量
  const incrementalFiles = process.env.INCREMENTAL_FILES;
  
  if (incrementalFiles) {
    try {
      // 解析增量编译的文件列表
      const files = JSON.parse(incrementalFiles);
      console.log('增量编译文件:', files);
      
      return files.reduce((acc, file) => {
        // 确保文件路径是相对于 src 的
        const relativePath = file.startsWith('src/') ? file : `src/${file}`;
        if (!relativePath.endsWith('.d.ts') && glob.sync(relativePath).length > 0) {
          const key = relativePath.replace('src/', '').replace('.ts', '');
          acc[key] = relativePath;
        }
        return acc;
      }, {});
    } catch (error) {
      console.error('解析增量编译文件列表失败:', error);
      return getAllInputFiles();
    }
  }
  
  return getAllInputFiles();
}

// 获取所有需要编译的文件
function getAllInputFiles() {
  return glob.sync('src/**/*.ts').reduce((acc, file) => {
    if (!file.endsWith('.d.ts')) {
      const key = file.replace('src/', '').replace('.ts', '');
      acc[key] = file;
    }
    return acc;
  }, {});
}

// 自定义插件：移除.d.ts的导入
const removeDtsImports = () => ({
  name: 'remove-dts-imports',
  transform(code) {
    // 移除所有.d.ts的导入语句
    return code.replace(/^\s*import\s+['"].*\.d\.ts['"]\s*;?\s*$/gm, '');
  }
});

const commonPlugins = [
  removeDtsImports(),
  alias({
    entries: [
      { find: '@', replacement: path.resolve(__dirname, 'src/functions') },
      { find: '@@', replacement: path.resolve(__dirname, 'src') }
    ]
  }),
  resolve({
    preferBuiltins: true,
    extensions: ['.ts', '.js', '.json', '.cjs'],
    mainFields: ['main'],
    modulesOnly: false,
    browser: false,
    // 强制使用 Node.js 解析策略
    exportConditions: ['node']
  }),
  commonjs({
    extensions: ['.js', '.cjs'],
    transformMixedEsModules: true,
    // 更严格的 CommonJS 转换
    strictRequires: true,
    // 处理所有依赖
    include: /node_modules/,
    // 默认导出处理
    requireReturnsDefault: 'auto'
  }),
  json(),
  swc({
    jsc: {
      target: 'es2020',
      parser: {
        syntax: 'typescript',
        tsx: false,
        decorators: true,
      },
      transform: {
        legacyDecorator: true,
        decoratorMetadata: true,
      },
    },
    sourceMaps: true,
    module: {
      type: 'commonjs',
      strict: true,
      strictMode: true,
      noInterop: false
    },
    minify: false
  })
];

module.exports = defineConfig({
  input: getInputFiles(),
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
    exports: 'named',
    // 更严格的模块互操作
    interop: 'compat',
    entryFileNames: '[name].js'
  },
  external: [
    /node_modules/,
    /\.d\.ts$/
  ],
  plugins: commonPlugins,
  watch: {
    clearScreen: false,
    buildDelay: 100
  },
  perf: true,
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false
  }
}); 