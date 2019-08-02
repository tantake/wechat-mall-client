import * as types from '../mutation-types';
const state = {
  buyNowGoodsInfo: {
    goodsId: "",
    goodsName: "",
    goodsSubtitle: "",
    color: "",
    number: 0,
    price: 0,
  }
};

const getters = {
  buyNowGoodsInfo: state => state.buyNowGoodsInfo,
};

const actions = {
  setBuyNowGoodsInfo({ commit }, payload) {
    commit(types.SET_BUY_NOW_GOODS_INFO, payload);
  },
};

const mutations = {
  [types.SET_BUY_NOW_GOODS_INFO](state, payload) {
    state.buyNowGoodsInfo = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
