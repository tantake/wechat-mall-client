import * as types from '../mutation-types';
const state = {
  userInfo: {},
  checkedMenu: "index",
  orderNumber: {
    waitPay: 0,
    waitReceipt: 0
  }
};

const getters = {
  userInfo: state => state.userInfo,
  checkedMenu: state => state.checkedMenu,
  orderNumber: state => state.orderNumber,
};

const actions = {
  setUserInfo({ commit }, payload) {
    commit(types.SET_USER_INFO, payload);
  },
  setCheckedMenu({ commit }, payload) {
    commit(types.SET_CHECKED_MENU, payload);
  },
  setOrderNumber({ commit }, payload) {
    commit(types.SET_ORDER_NUMBER, payload);
  },
};

const mutations = {
  [types.SET_USER_INFO](state, payload) {
    state.userInfo = payload;
  },
  [types.SET_CHECKED_MENU](state, payload) {
    state.checkedMenu = payload;
  },
  [types.SET_ORDER_NUMBER](state, payload) {
    state.orderNumber = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
