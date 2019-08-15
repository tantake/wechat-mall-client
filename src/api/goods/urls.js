const baseUrl = process.env.BASE_API;
export default {
  goodsList: baseUrl + "/getGoodsByCatPage",
  goodsDetail: baseUrl + "/getGoodsById",
  joinCar: baseUrl + "/insertUserCart",
  cartList: baseUrl + "/getCartListInfo",
  cartNumber: baseUrl + "/getCartCount",
  deleteCart: baseUrl + "/delCartInfo",
};
