<template>
  <div>
    <div class="z-head life-index-head">
      <!--<div class="logo">
      <img :src="shop.logo" alt="">
      </div>-->
      <span class="title">购物车</span>
      <div class="cart-edit">
        <span class="right" @click="toggleEditCart">{{toggle.isDefault? '編輯':'完成'}}</span>
      </div>
    </div>
    <empty-view
      v-if="cartList.length === 0"
      :iconCls="'zui-icon-SHOPPING-CART-EMPTY'"
      :text="'您的购物车空空如也，赶紧去逛逛吧！'"
    ></empty-view>

    <div v-else style="margin-top: 45px;">
      <swipeout>
        <swipeout-item
          v-for="(item,index) in cartList"
          :key="index"
          transition-mode="follow"
          @on-close="handleEvents('on-close')"
          @on-open="handleEvents('on-open')"
        >
          <div slot="right-menu">
            <swipeout-button type="warn">删除</swipeout-button>
          </div>
          <div slot="content">
            <cart-card
              @on-selected-good="selectGood(index, item.productID, item)"
              :data="item"
            ></cart-card>
          </div>
        </swipeout-item>
      </swipeout>

      <div class="cart-bottom-bar">
        <div class="icon-wrap">
          <icon
            @click.native="selectAllHandler"
            class="icon"
            :type="selectAll ? 'success' : 'circle'"
          ></icon>全选
        </div>
        <div v-if="toggle.isDefault">
          <div class="sum">合计:</div>
          <div class="btn balance-btn" @click="confirmOrder">结算({{selectList.length}})</div>
        </div>
        <div v-else>
          <div class="btn delete-btn">
            <span @click="deleteCart">刪除</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "./cart.less";
import { commentPost } from "../../data/data.js";
import EmptyView from "../../components/EmptyView.vue";
import CartCard from "../../components/CartCard.vue";
import { Icon, Swipeout, SwipeoutItem, SwipeoutButton } from "vux";
import { queryCart } from "../../api";

export default {
  name: "Cart",
  components: {
    EmptyView,
    Icon,
    CartCard,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  data() {
    return {
      cartList: [],
      num: 1,
      selectAll: false,
      // cart: this.$store.state.cart.cartList,
      toggle: {
        isDefault: true
      },
      products: []
    };
  },
  computed: {
    // cartList() {
    //   return this.$store.state.cart.cartList;
    // },
    selectList() {
      return this.cartList.filter(item=>{
        return item.selected
      })
    }
  },
  methods: {
    confirmOrder() {
      this.$router.push("/index/goods/confirmOrder");
    },
    handleEvents(type) {
      console.log("event: ", type);
    },
    selectAllHandler() {
      this.selectAll = !this.selectAll
      let cartList = this.cartList
      for(var i=0; i<cartList.length; i++) {
        if (this.selectAll) {
          cartList[i].selected = true 
        } else {
          cartList[i].selected = false
        }
      }
    },
    selectGood(index, productID, item) {
      // this.$store.commit('cart/setSelectAll', false)
      item.selected = !item.selected
      // if (this.productIDs.includes(productID)) {
      //   this.productIDs.splice(this.productIDs.indexOf(productID), 1);
      //   // this.products.splice(this.products.indexOf({productID: item.productID, num: item.num}), 1)
      // } else {
      //   this.productIDs.push(productID);
      //   this.products.push({productID: item.productID, num: item.num})
      // }
      // console.log("selectList", this.selectList);
    },
    selectNum(val) {
       console.log('sss', val)
    },
    toggleEditCart() {
      this.toggle.isDefault = !this.toggle.isDefault;
    },
    deleteCart() {
      let selectList = this.selectList;
      if (selectList.length == 0) {
        this.$vux.toast.show({
          type: "warn",
          text: "您还没有选择商品哦",
          isShowMask: true
        });
      } else {
      }
    },
    handleGetCart() {
      let token = window.sessionStorage.getItem("token");
      let that = this;
      if (token != null) {
        queryCart(token, data => {
          if (!data.errcode) {
            that.cart = data;
          } else {
            that.$vux.alert.show({
              title: "提示",
              content: data.errmsg,
              buttonText: "知道了"
            });
          }
        });
      }
    }
  },
  created() {
    let tmp = []
    for(var i=0; i<commentPost.length; i++) {
      commentPost[i].selected = false
      tmp.push(commentPost[i])
    }
    console.log('tmp', tmp)
    this.cartList = tmp
  }
};
</script>
