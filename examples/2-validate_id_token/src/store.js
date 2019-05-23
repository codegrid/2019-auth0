import Vue from 'vue';
import Vuex from 'vuex';

import { getAuthResult, getAuthResultByRenewTokens, getUserProfile, login } from './services/auth0';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userProfile: null,
  },
  getters: {
    idToken(state) {
      return state.idToken;
    },
    isLoggedIn(state) {
      return state.idToken !== null;
    },
    userProfile(state) {
      if (state.idToken === null) {
        return null;
      }
      return getUserProfile(state.idToken);
    },
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    },
    removeIdToken(state) {
      state.idToken = null;
    },
  },
  actions: {
    login() {
      login();
    },
    logout({ commit }) {
      commit('removeIdToken');
    },
    async handleAuthentication({ commit }) {
      const authResult = await getAuthResult();
      commit('updateIdToken', authResult.idToken);
    },
    async renewToken({ commit }) {
      const authResult = await getAuthResultByRenewTokens();
      commit('updateIdToken', authResult.idToken);
    },
  },
});
