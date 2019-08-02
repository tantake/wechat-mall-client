import api from '../http'
import urls from './urls'

const header = {}

export default {
  /* 地址列表 */
  addressList(params) {
    return api.get(urls.addressList, params, header)
  },
  /* 删除地址 */
  deleteAddress(params) {
    return api.get(urls.deleteAddress, params, header)
  },
  /* 单个地址 */
  getAddressById(params) {
    return api.get(urls.getAddressById, params, header)
  },
  /* 更新地址 */
  updateAddress(params) {
    return api.post(urls.updateAddress, params, header)
  },
  /* 添加地址 */
  addAddress(params) {
    return api.post(urls.addAddress, params, header)
  },
}