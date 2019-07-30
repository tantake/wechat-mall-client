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
    return api.post(urls.goodsDetail, params, header)
  }
}