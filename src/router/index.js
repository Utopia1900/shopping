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
const PurchaseOrder = r => require.ensure([], () => r(require('@/views/order/PurchaseOrder')), 'PurchaseOrder')
const SoldOrder = r => require.ensure([], () => r(require('@/views/order/SoldOrder')), 'SoldOrder')
const OrderDetail = r => require.ensure([], () => r(require('@/views/order/OrderDetail')), 'OrderDetail')
const Delivery = r => require.ensure([], () => r(require('@/views/order/Delivery')), 'Delivery')
const MyLower = r => require.ensure([], () => r(require('@/views/myLower/MyLower')), 'MyLower')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
        'default': MyAddress,
        'subPage': AddressEdit
      }
    },
    {
      path: '/goods/:id',
      name: 'goodsDetail',
      components: {
        'default': Index,
        'subPage': GoodsDetail
      }
    },
    {
      path: '/cart/confirmOrder',
      name: 'confirmOrder',
      components: {
        'default': Cart,
        'subPage': ConfirmOrder
      }
    },
    {
      path: '/purchaseOrder',
      name: 'purchaseOrder',
      components: {
        'default': Mine,
        'subPage': PurchaseOrder
      }
    },
    {
      path: '/soldOrder',
      name: 'soldOrder',
      components: {
        'default': Mine,
        'subPage': SoldOrder
      }
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      components: {
        'default': Mine,
        'subPage': OrderDetail
      }
    },
    {
      path: '/delivery',
      name: 'delivery',
      components: {
        'default': Mine,
        'subPage': Delivery
      }
    },
    {
      path: '/myLower',
      name: 'myLower',
      components: {
        'default': Mine,
        'subPage': MyLower
      }
    }
  ]
})
