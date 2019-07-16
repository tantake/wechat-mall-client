let baseUrl = "/wechat-mall/api";

switch (process.env.NODE_ENV) {
  case "testing":
    baseUrl = "http://testserver.feleti.cn" + baseUrl; // 测试环境
    break;
  case "development":
    baseUrl = "http://127.0.0.1:3000" + baseUrl; // 开发环境
    break;
  case "production":
    baseUrl = "https://api.feleti.cn" + baseUrl; // 生产环境
    break;
}

export default baseUrl;
