"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://192.168.5.38:8080/MicroDis"' /* Lisa */
  BASE_API: '"http://192.168.0.130:8080/MicroDis"' /* Lisa */
  // BASE_API: '"http://192.168.0.125:8080/MicroDis"'/* 何庆 */
  // BASE_API: '"http://192.168.0.162:8080/MicroDis"'/* 磊哥 */
  // BASE_API: '"http://127.0.0.1:7001/api"'
  // BASE_API: '"http://temp.foxsun.cn/MicroDis/wechat"'
});
