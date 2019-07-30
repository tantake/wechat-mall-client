const baseUrl = process.env.BASE_API;
export default {
  goodsList: baseUrl + "/goodsShortInfo",
  goodsDetail: baseUrl + "/getGoodsById"
};
