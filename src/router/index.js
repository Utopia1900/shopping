import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const Index = r => require.ensure([], () => r(require('@/views/index/Index')), 'Index')
const Cart = r => require.ensure([], () => r(require('@/views/cart/Cart')), 'Cart')
const Mine = r => require.ensure([], () => r(require('@/views/mine/Mine')), 'Mine')
const GoodsDetail = r => require.ensure([], () => r(require('@/views/goodsDetail/GoodsDetail')), 'GoodsDetail')
const MyAddress = r => require.ensure([], () => r(require('@/views/myAddress/MyAddress')), 'MyAddress')
const AddressEdit = r => require.ensure([], () => r(require('@/views/myAddress/AddressEdit')), 'AddressEdit')
const ConfirmOrder = r => require.ensure([], () => r(require('@/views/confirmOrder/ConfirmOrder')), 'ConfirmOrder')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/mine/address',
      name: 'myAddress',
      components: {
        'default': Mine,
        'subPage': MyAddress
      }
    },
    {
      path: '/mine/address/edit',
      name: 'addressEdit',
      components: {
        'default': Mine,
        'subPage': AddressEdit
      }
    },
    {
      path: '/index/goods/:id',
      name: 'goodsDetail',
      components: {
        'default': Index,
        'subPage': GoodsDetail
      }
    },
    {
      path: '/index/goods/confirmOrder',
      name: 'confirmOrder',
      components: {
        'default': Index,
        'subPage': ConfirmOrder
      }
    }
  ]
})
