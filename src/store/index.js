import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  plugins: [createPersistedState()],
  state: {
    token: null,
    cart: null,
    productsArr: [],
    previousRoute: null,
  },
  mutations: {
    SAVE_TOKEN(state, tokenFromServer) {
      state.token = tokenFromServer;
    },
    SAVE_CART(state, cartObj) {
      state.cart = cartObj;
    },
    SAVE_PRODUCTS_ARR(state, productObj) {
      state.productsArr = productObj;
    },
    SAVE_PREVIOUS_PATH(state, route) {
      state.previousRoute = route;
    },
  },
  actions: {
    saveToken({ commit }, tokenFromServer) {
      commit("SAVE_TOKEN", tokenFromServer);
    },
    saveCart({ commit }, cartObj) {
      commit("SAVE_CART", cartObj);
    },
    saveProductArr({ commit }, cartObj) {
      commit("SAVE_PRODUCTS_ARR", cartObj);
    },
    savePreviousPath({ commit }, route) {
      commit("SAVE_PREVIOUS_PATH", route);
    },
  },
});

export default store;
