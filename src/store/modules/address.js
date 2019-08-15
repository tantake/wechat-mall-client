import * as types from '../mutation-types';
const state = {
  backUrl: "",
  shippingAddressId: "",
};

const getters = {
  backUrl: state => state.backUrl,
  shippingAddressId: state => state.shippingAddressId,
};

const actions = {
  setBackUrl({ commit }, payload) {
    commit(types.SET_BACK_URL, payload);
  },
  setShippingAddressId({ commit }, payload) {
    commit(types.SET_SHIPPING_ADDRESS_ID, payload);
  },
};

const mutations = {
  [types.SET_BACK_URL](state, payload) {
    state.backUrl = payload;
  },
  [types.SET_SHIPPING_ADDRESS_ID](state, payload) {
    state.shippingAddressId = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
