import api from '../http'
import urls from './urls'

const header = {}

export default {
  // 获取用户信息
  getUser(params) {
    return api.get(urls.getUser, params, header)
  },
  // 请求商品列表
  productList(params) {
    return api.get(urls.productList, params, header)
  }
}