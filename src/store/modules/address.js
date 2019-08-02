import * as types from '../mutation-types';
const state = {
  backUrl: "",
  chooseAddress: {}
};

const getters = {
  backUrl: state => state.backUrl,
  chooseAddress: state => state.chooseAddress,
};

const actions = {
  setBackUrl({ commit }, payload) {
    commit(types.SET_BACK_URL, payload);
  },
  setChooseAddress({ commit }, payload) {
    commit(types.SET_CHOOSE_ADDRESS, payload);
  },
};

const mutations = {
  [types.SET_BACK_URL](state, payload) {
    state.backUrl = Number(payload.backUrl);
  },
  [types.SET_CHOOSE_ADDRESS](state, payload) {
    state.chooseAddress = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
