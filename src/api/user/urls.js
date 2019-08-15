const baseUrl = process.env.BASE_API;
export default {
  getUser: baseUrl + "/wechat/authorize",
  login: baseUrl + "/loginAgent",
};
