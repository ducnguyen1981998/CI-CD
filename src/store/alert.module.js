const state = {
  type: null,
  message: null
};

const actions = {
  success({ commit }, message) {
    commit("success", message);
  },
  error({ commit }, message) {
    console.log(message);
    commit("error", message);
  },
  clear({ commit }) {
    commit("clear");
  }
};

const mutations = {
  success(state, message) {
    state.type = "md-primary";
    state.message = message;
  },
  error(state, message) {
    state.type = "md-accent";
    state.message = message;
  },
  clear(state) {
    state.type = null;
    state.message = null;
  }
};

export const alert = {
  namespaced: true,
  state,
  actions,
  mutations
};
