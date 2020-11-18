import { Auth } from 'aws-amplify';

export const auth = {
  namespaced: true,
  state: { user: null },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    /**
     * Login user
     * @param {*} username
     * @param {*} password
     */
    async login({ commit }, { username, password }) {
      try {
        await Auth.signIn({ username, password });
        const userInfo = await Auth.currentUserInfo(); // help to grab user Id
        commit('setUser', userInfo);
        return Promise.resolve('Success');
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },

    /**
     * Logout user
     * @param {*} commit
     */
    async logout({ commit }) {
      commit('setUser', null);
      return await Auth.signOut();
    },

    /**
     * Sign the user up
     * @param {*} _
     * @param {*} userInfo
     */
    async signUp(_, { username, password, email }) {
      try {
        await Auth.signUp({ username, password, attributes: { email } });
        return Promise.resolve('Success');
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /**
     * Confirm the authentication
     * @param {*} _
     * @param {*} userInfo
     */
    async confirmSignUp(_, { username, code }) {
      try {
        await Auth.confirmSignUp(username, code);
        return Promise.resolve('Success');
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },

    /**
     * Get user info if we are loggedIn
     * @param {*} commit
     */
    async authAction({ commit }) {
      const userInfo = await Auth.currentUserInfo();
      commit('setUser', userInfo);
    },
  },

  getters: {
    user: (state) => state.user,
  },
};
