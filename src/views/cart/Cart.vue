<template>
  <div>
  <div class="z-head life-index-head">
    <!--<div class="logo">
      <img :src="shop.logo" alt="">
    </div>-->
    <span class="title">购物车</span>

  </div>
  <empty-view
    v-if="cart.length === 0"
    :iconCls="'zui-icon-SHOPPING-CART-EMPTY'"
    :text="'您的购物车空空如也，赶紧去逛逛吧！'">
  </empty-view>

  <div
    v-else
    style="margin-top: 45px;"
  >
    <swipeout>
      <swipeout-item
        v-for="(item,index) in cart"
        :key = item.productID
        transition-mode="follow"
        @on-close="handleEvents('on-close')"
        @on-open="handleEvents('on-open')">
        <div slot="right-menu">
          <swipeout-button
            type="warn"
          >
            删除
          </swipeout-button>
        </div>
        <div slot="content">
          <cart-card
            @on-selected-good="selectGood(index)"
            @on-selected-num="selectNum"
            :data="item">
          </cart-card>
        </div>
      </swipeout-item>
    </swipeout>

    <div class="cart-bottom-bar">
      <div class="icon-wrap">
        <icon
          @click.native="selectAllHandler"
          class="icon"
          :type="selectAll ? 'success' : 'circle'">
        </icon>
        全选
      </div>

      <div class="sum">合计:</div>
      <div class="btn" @click="confirmOrder">结算({{selectList.length}})</div>
    </div>
  </div>
  </div>
</template>
<script>
  import './cart.less'
  import {commentPost} from '../../data/data.js'
  import EmptyView from '../../components/EmptyView.vue'
  import CartCard from '../../components/CartCard.vue'
  import {Icon,Swipeout, SwipeoutItem,SwipeoutButton} from 'vux'
  import {queryCart} from '../../api'

  export default {
    name: 'Cart',
    components: {
      EmptyView,
      Icon,
      CartCard,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
    },
    data() {
      return {
        selectList: [],
        num: 1,
        selectAll: false,
        cart: []
      }
    },
    methods: {
      confirmOrder() {
        this.$router.push('/index/goods/confirmOrder')
      },
      handleEvents (type) {
        console.log('event: ', type)
      },
      selectAllHandler() {
        this.selectAll = !this.selectAll

      },
      selectGood(index){
        if(this.selectList.includes(index)){
          this.selectList.splice(this.selectList.indexOf(index),1)
        }else{
          this.selectList.push(index)
        }
        // console.log(this.selectList)
      },
      selectNum(){

      },
      handleGetCart () {
        let token = window.sessionStorage.getItem('token')
        let that = this
        if (token !=null) {
          queryCart(token, data => {
            if (!data.errcode) {
              that.cart = data
            } else {
              that.$vux.alert.show({
                title: '提示',
                content: data.errmsg,
                buttonText: '知道了'
              })
            }
          })
        }
      }
    }
  }
</script>
