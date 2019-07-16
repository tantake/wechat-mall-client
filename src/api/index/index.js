import api from '../http'
import urls from './urls'

const header = {}

export default {
  // 请求首页banner
  banners(params) {
    console.log(urls.banners);
    return api.get(urls.banners, params, header)
  }
}