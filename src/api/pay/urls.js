const baseUrl = process.env.BASE_API;
export default {
  getConfig: baseUrl + "/payConfig",
  getPay: baseUrl + "/pay"
};
