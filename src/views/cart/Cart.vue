<template>
  <div>
    <div class="z-head life-index-head">
      <!--<div class="logo">
      <img :src="shop.logo" alt="">
      </div>-->
      <span class="title">购物车</span>
      <div class="cart-edit" v-show="cartList.length !==0">
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
        >
          <div slot="right-menu">
            <swipeout-button type="warn" @click.native="delBySwipe(item.productID)">删除</swipeout-button>
          </div>
          <div slot="content">
            <cart-card @on-selected-good="selectGood(item)" :data="item"></cart-card>
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
            <span @click="handleDelete">刪除</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "./cart.less";
import EmptyView from "../../components/EmptyView.vue";
import CartCard from "../../components/CartCard.vue";
import { Icon, Swipeout, SwipeoutItem, SwipeoutButton } from "vux";
import { handleGetCart, delCartProduct,handleGetAddress} from "../../api";

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
      num: 1,
      selectAll: false,
      toggle: {
        isDefault: true
      },
      products: [],
      amount: 0
    };
  },
  computed: {
    selectList() {
      return this.cartList.filter(item => {
        return item.selected;
      });
    },
    cartList() {
      return this.$store.state.cart.cartList;
    }
  },
  methods: {
    confirmOrder() {
      let selectList = this.selectList;
      if (selectList.length != 0) {
        this.$store.commit('cart/setPayType', 'fromCart')
        this.$store.commit("cart/setPayList", this.selectList)
        handleGetAddress(this)
        this.$router.push("/cart/confirmOrder");
      } else {
        this.$vux.toast.show({
          type: "warn",
          text: "您还没有选择商品哦",
          isShowMask: true
        });
      }
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
    selectGood(item) {
      // this.$store.commit('cart/setSelectAll', false)
      item.selected = !item.selected;
      if (item.selected && this.selectList.length == this.cartList.length) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },
    toggleEditCart() {
      this.toggle.isDefault = !this.toggle.isDefault
    },
    delBySwipe(productID) {
      const token = window.sessionStorage.getItem('token')
      const productIDs = [productID]
      delCartProduct(token, productIDs, data => {
        if (!data.errcode) {
          this.$vux.toast.show({
            type: "success",
            text: "删除成功",
            isShowMask: true
          });
          let cartList = this.cartList;
          for (var a = 0; a < cartList.length; a++) {
            for (var b = 0; b < productIDs.length; b++) {
              if (cartList[a].productID === productIDs[b]) {
                cartList.splice(a, 1);
              }
            }
          }
        } else {
          this.$vux.alert.show({
            title: "提示",
            content: data.errmsg,
            buttonText: "知道了"
          })
        }
      })
    },
    handleDelete() {
      let selectList = this.selectList;
      if (selectList.length == 0) {
        this.$vux.toast.show({
          type: "warn",
          text: "您还没有选择商品哦",
          isShowMask: true
        })
      } else {
        var productIDs = []
        let token = window.sessionStorage.getItem("token")
        for (var i = 0; i < selectList.length; i++) {
          productIDs.push(selectList[i].productID)
        }
        if (token) {
          delCartProduct(token, productIDs, data => {
            if (!data.errcode) {
              this.$vux.toast.show({
                type: "success",
                text: "删除成功",
                isShowMask: true
              });
              let cartList = this.cartList;
              for (var a = 0; a < cartList.length; a++) {
                for (var b = 0; b < productIDs.length; b++) {
                  if (cartList[a].productID === productIDs[b]) {
                    cartList.splice(a, 1);
                  }
                }
              }
            } else {
              this.$vux.alert.show({
                title: "提示",
                content: data.errmsg,
                buttonText: "知道了"
              })
            }
          })
        }
      }
    },
    getCart() {
      handleGetCart(this)
    }
  },
  watch: {
    selectList: {
      handler: function(newVal) {
        let tmp = newVal
        let that = this
        var amount = 0
        for (var i = 0; i < newVal.length; i++) {
          amount += newVal[i].num * Number(newVal[i].price)
        }
        that.amount = amount.toFixed(2);
      },
      deep: true
    }
  },
  created() {
    this.getCart()
  }
};
</script>
