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
        payList: [],
        cartList: []
      },
      mutations: {
        setPayList (state, payload) {
          state.payList = payload
        },
        setCartList (state, payload) {
          state.cartList = payload
        }
      }
    },
    address: {
      stric: true,
      namespaced: true,
      state: {
        addressObj: {
          isDefault: 0
        },
        addressList:[],
        selectedAddress: null
      },
      mutations: {
        set (state, payload) {
          state.addressObj = payload
        },
        setSelectedAddress(state, payload) {
          state.selectedAddress = payload
        },
        setAddressList(state, payload){
          state.addressList = payload
        }
      }
    }
  }
}
