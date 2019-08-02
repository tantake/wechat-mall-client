const baseUrl = process.env.BASE_API;
export default {
  goodsList: baseUrl + "/getGoodsByCatPage",
  goodsDetail: baseUrl + "/getGoodsById"
};
