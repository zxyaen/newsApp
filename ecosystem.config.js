module.exports = {
  apps: [{
    name: 'newsDApp',
    script: 'ng serve',
    watch: 'true',
    cwd: './src',
    ignore_watch: [
      "node_modules",
      "logs"
    ],
    "error_file": "./logs/app-err.log",         // 错误日志文件
    "out_file": "./logs/app-out.log",           // 正常日志文件
    "merge_logs": true,                         // 设置追加日志而不是新建日志
    "log_date_format": "YYYY-MM-DD HH:mm:ss",   // 指定日志文件的时间格式
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
