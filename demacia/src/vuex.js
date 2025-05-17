import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null
  },
  getters: {
    user: (state) => state.user
  },
  actions: {
    setUser (context, user) {
      context.commit('setUser', user)
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  }
})
