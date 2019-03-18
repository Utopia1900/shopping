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
            <cart-card @on-selected-good="selectGood(index, item.productID, item)" :data="item"></cart-card>
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
          <div class="sum">
            合计:&nbsp;&nbsp;
            <span style="color: #ed7a5d">￥{{amount}}</span>
          </div>
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
import { queryCart, delCartProduct } from "../../api";

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
      toggle: {
        isDefault: true
      },
      products: [],
      amount: 0,
      show: false
    };
  },
  computed: {
    selectList() {
      return this.cartList.filter(item => {
        return item.selected;
      });
    }
  },
  methods: {
    confirmOrder() {
      let selectList = this.selectList;
      if (selectList.length != 0) {
        this.$store.commit("cart/setPayList", this.selectList);
        this.$router.push("/cart/confirmOrder");
      } else {
        this.$vux.toast.show({
          type: "warn",
          text: "您还没有选择商品哦",
          isShowMask: true
        });
      }
    },
    handleEvents(type) {
      console.log("event: ", type);
    },
    selectAllHandler() {
      this.selectAll = !this.selectAll;
      let cartList = this.cartList;
      for (var i = 0; i < cartList.length; i++) {
        if (this.selectAll) {
          cartList[i].selected = true;
        } else {
          cartList[i].selected = false;
        }
      }
    },
    selectGood(index, productID, item) {
      // this.$store.commit('cart/setSelectAll', false)
      item.selected = !item.selected;
      if (item.selected && this.selectList.length == this.cartList.length) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
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
        var productIDs = [];
        let that = this;
        let token = window.sessionStorage.getItem("token");
        for (var i = 0; i < selectList.length; i++) {
          productIDs.push(selectList[i].productID);
        }
        if (token != null) {
          delCartProduct(token, productIDs, data => {
            if (!data.errcode) {
              that.$vux.toast.show({
                type: "success",
                text: "删除成功",
                isShowMask: true
              });
              let cartList = that.cartList;
              for (var a = 0; a < cartList.length; a++) {
                for (var b = 0; b < productIDs.length; b++) {
                  if (cartList[a].productID == productIDs[b]) {
                    cartList.splice(a, 1);
                  }
                }
              }
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
  watch: {
    selectList: {
      handler: function(newVal) {
        let tmp = newVal;
        let that = this;
        var amount = 0;
        for (var i = 0; i < newVal.length; i++) {
          amount += newVal[i].num * Number(newVal[i].price);
        }
        that.amount = amount.toFixed(2);
      },
      deep: true
    }
  },
  created() {
    let tmp = [];
    for (var i = 0; i < commentPost.length; i++) {
      commentPost[i].selected = false;
      tmp.push(commentPost[i]);
    }
    this.cartList = tmp;
  }
};
</script>
