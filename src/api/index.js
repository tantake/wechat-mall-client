import api from './api'

const install = function(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true
  window.$api = api;
  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return api
      }
    }
  })
}

export default {
  install
}