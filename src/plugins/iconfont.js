import '../assets/iconfont/iconfont.js'
import Icon from "../components/IconFont";

const iconFont = {
  install(Vue, options) {
    Vue.component("icon-font", Icon);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(iconFont);
}

export default iconFont;
