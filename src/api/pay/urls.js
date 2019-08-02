const baseUrl = process.env.BASE_API;
export default {
  getConfig: baseUrl + "/pay",
  getPay: baseUrl + "/pay"
};
