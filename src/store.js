export default {
  modules: {
    bottomNav: {
      strict: true,
      namespaced: true,
      state: {
        index: 0
      },
      mutations: {
        set(state, payload) {
          state.index = payload
        }
      }
    }
  }
}
