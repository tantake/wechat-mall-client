const baseUrl = process.env.BASE_API;
export default {
  generateOrders: baseUrl + "/ReturnOrderId",
  getOrderInfo: baseUrl + "/getOrderInfo",
  getOrderNumber: baseUrl + "/getOrderCountGroupStatus",
  getOrderById: baseUrl + "/getOrderCountGroupStatus",
};
