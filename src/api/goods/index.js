import api from '../http'
import urls from './urls'

const header = {}

export default {
  // 请求商品列表
  goodsList(params) {
    return api.get(urls.goodsList, params, header)
  },
  // 请求商品详情
  goodsDetail(params) {
    return api.get(urls.goodsDetail, params, header)
  },
  joinCar(params) {
    return api.post(urls.joinCar, params, header)
  },
  cartList(params) {
    return api.get(urls.cartList, params, header)
  },
  cartNumber(params) {
    return api.get(urls.cartNumber, params, header)
  },
  deleteCart(params) {
    return api.post(urls.deleteCart, params, header)
  },
}