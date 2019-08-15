import api from '../http'
import urls from './urls'

const header = {}

export default {
  // 生成订单
  generateOrders(params) {
    return api.post(urls.generateOrders, params, header)
  },
  // 订单列表
  getOrderInfo(params) {
    return api.post(urls.getOrderInfo, params, header)
  },
  // 订单数量（待付款、待收货）
  getOrderNumber(params) {
    return api.get(urls.getOrderNumber, params, header)
  },
  // 根据ID查询订单详情
  getOrderById(params) {
    return api.get(urls.getOrderById, params, header)
  },
}