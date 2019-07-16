import Vue from "vue";
import Vuex from "vuex";
// import cart from "./modules/cart";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: { user }
});
