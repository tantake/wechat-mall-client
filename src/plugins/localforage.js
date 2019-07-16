import localForage from "localforage";

const _localForage = localForage.createInstance({
  name: "wechatMall"
});

const vueLocalForage = {
  install(Vue, options) {
    Vue.$db = _localForage;
    window.$db = _localForage;
    window.localForage = localForage;
    Object.defineProperties(Vue.prototype, {
      db: {
        get() {
          return _localForage;
        }
      },
      $db: {
        get() {
          return _localForage;
        }
      }
    });
  }
};
export default vueLocalForage;