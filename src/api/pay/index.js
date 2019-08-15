import api from '../http'
import urls from './urls'

const header = {}

export default {
  // 获取验证信息
  getConfig(params) {
    return api.post(urls.getConfig, params, header)
  },
  // 获取支付参数
  pay(params) {
    return api.post(urls.pay, params, header)
  }
}