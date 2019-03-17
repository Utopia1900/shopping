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
    },
    cart: {
      stric: true,
      namespaced: true,
      state: {
        payList: []
      },
      mutations: {
        setPayList (state, payload) {
          state.payList = payload
        }
      }
    },
    address: {
      stric: true,
      namespaced: true,
      state: {
        addressObj: {}
      },
      mutations: {
        set (state, payload) {
          state.addressObj = payload
        }
      }
    }
  }
}
