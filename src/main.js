// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "amfe-flexible/index.js";
import "normalize.css";
import "@/assets/css/global.less"
/* axios */
import api from "@/api/index";
/* mint-ui */
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
/* plugins */
import iconFont from "./plugins/iconfont";
import vueLocalForage from "./plugins/localforage";
import lodash from './plugins/lodash';
/* utils */
// import "./util/authorization";

Vue.use(api);
Vue.use(Mint);
Vue.use(iconFont);
Vue.use(vueLocalForage);
Vue.use(lodash);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
