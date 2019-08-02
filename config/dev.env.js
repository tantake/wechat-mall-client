'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://192.168.0.125:8080/MicroDis"'
  // BASE_API: '"http://192.168.0.162:8080/MicroDis"'
  // BASE_API: '"http://127.0.0.1:7001/api"'
  BASE_API: '"http://token.foxsun.cn/MicroDis/wechat"'
})
