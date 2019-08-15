import * as types from '../mutation-types';
const state = {
  buyGoodsList: [],
  cartNumber: 0,
};

const getters = {
  buyGoodsList: state => state.buyGoodsList,
  cartNumber: state => state.cartNumber,
};

const actions = {
  setBuyGoodsList({ commit }, payload) {
    commit(types.SET_BUY_GOODS_LIST, payload);
  },
  setCartNumber({ commit }, payload) {
    commit(types.SET_CART_NUMBER, payload);
  },
};

const mutations = {
  [types.SET_BUY_GOODS_LIST](state, payload) {
    state.buyGoodsList = payload;
  },
  [types.SET_CART_NUMBER](state, payload) {
    state.cartNumber = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
