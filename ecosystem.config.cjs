module.exports = {
  apps: [
    {
      name: 'appthen-backend-dev',
      script: 'src/server.ts',
      watch: true,
      ignore_watch: ['node_modules', 'dist'],
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      interpreter: './node_modules/.bin/tsx',
      autorestart: true,
      max_memory_restart: '1G',
    },
    // {
    //   name: 'appthen-backend-prod',
    //   script: 'dist/server.js',
    //   instances: 'max',
    //   exec_mode: 'cluster',
    //   env: {
    //     NODE_ENV: 'production',
    //     PORT: 3000,
    //   },
    //   max_memory_restart: '1G',
    //   env_production: {
    //     NODE_ENV: 'production',
    //   },
    // },
  ],
}; 