const baseUrl = process.env.BASE_API;
export default {
  getConfig: baseUrl + "/wechat/getConfig",
  pay: baseUrl + "/wechat/pay"
};
