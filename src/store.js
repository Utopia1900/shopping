export default {
  modules: {
    bottomNav: {
      strict: true,
      namespaced: true,
      state: {
        index: 0
      },
      mutations: {
        set (state, payload) {
          state.index = payload
        }
      }
    },
    goodDetail: {
      stric: true,
      namespaced: true,
      state: {
        detail: {}
      },
      mutations: {
        set (state, payload) {
          state.detail = payload
        }
      }
    }
  }
}
