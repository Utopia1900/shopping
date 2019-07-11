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
    },
    goodDetail: {
      stric: true,
      namespaced: true,
      state: {
        detail: {}
      },
      mutations: {
        set(state, payload) {
          state.detail = payload
        }
      }
    },
    cart: {
      stric: true,
      namespaced: true,
      state: {
        payList: [],
        cartList: [],
        payType: 'fromCart'
      },
      mutations: {
        setPayList(state, payload) {
          state.payList = payload
        },
        setCartList(state, payload) {
          state.cartList = payload
        },
        setPayType(state, payload){
          state.payType = payload
        }
      }
    },
    address: {
      stric: true,
      namespaced: true,
      state: {
        addressObj: {},
        addressList: [],
        selectedAddress: null,
        defIndex: 0
      },
      mutations: {
        set(state, payload) {
          state.addressObj = payload
        },
        setSelectedAddress(state, payload) {
          state.selectedAddress = payload
        },
        setAddressList(state, payload) {
          state.addressList = payload
        },
        setDefIndex(state, payload) {
          state.defIndex = payload
        }
      }
    },
    order: {
      stric: true,
      namespaced: true,
      state: {
        purchaseOrderList: [],
        soldOrderList: [],
        hasMore: false,
        scroll: null,
        type: null
      },
      mutations: {
        initPurchaseOrder(state) {
          state.purchaseOrderList = []
        },
        initSoldOrder(state) {
          state.soldOrderList = []
        },
        setPurchaseOrder(state, payload) {
          state.purchaseOrderList = state.purchaseOrderList.concat(payload)
        },
        setSoldOrder(state, payload) {
          state.soldOrderList = state.soldOrderList.concat(payload)
        },
        setHasMore(state, payload){
          state.hasMore = payload 
        },
        setScroll(state, payload){
          state.scroll = payload
        },
        setType(state, payload) {
          state.type = payload
        }
      }
    },
    orderDetail: {
      stric: true,
      namespaced: true,
      state: {
        detail: {}
      },
      mutations: {
        set(state, payload) {
          state.detail = payload
        }
      }
    },
    lower: {
      stric: true,
      namespaced: true,
      state: {
        list: []
      },
      mutations: {
        init(state) {
          state.list = []
        },
        set(state, payload) {
          state.list = state.list.concat(payload)
        }
      }
    },
    summary: {
      stric: true,
      namespaced: true,
      state: {
        row: {},
        timer: null
      },
      mutations: {
        set(state, payload) {
          state.row = payload
        },
        setTimer(state, payload) {
          state.timer = payload
        }
      }
    },
  }
}
