<template>
  <div>
    <header-nav :headerNavTitle="'确认订单'" @on-back="goBack"/>
    <div class="good-pay-bottombar">
      <div class="sum-price">总计: <span style="color:#ed7a5d">￥{{totalAmount}}</span></div>
      <div class="pill-submit-btn" @click="handleCreateOrder">
        <span class="btn">提交订单</span>
      </div>
    </div>

    <view-box>
      <div
        style="margin-top: 45px;"
        class="good-pay-address"
        @click="handleSetAddress('address')">
        <address-card
          v-if="selectedAddress"
          :link="true"
          :tool="false"
          :data="selectedAddress">
        </address-card>
        <div
          v-else
          class="gp-address-empty">
          请选择收货地址
          <span
            class="zui-icon zui-icon-arrow">
					</span>
        </div>
      </div>
      <div
        class="shop-card-body">
        <good-list
          v-for="(item, index) in payList"
          :key="index"
          :type="'INCONFIRM'"
          :data="item">
        </good-list>
      </div>
      <div
        v-show="payList.length!=0"
        class="shop-card-foot">
        <div class="z-cell-item z-text-right" style="padding-right: 10px;">
          <span>共{{totalNum}}件</span>
          合计￥<span style="color:#ed7a5d">{{totalAmount}}</span>
        </div>
      </div>

    </view-box>

    <popup
      v-model="showPopup"
      height="400px"
      @on-first-show="resetScroller">
      <pay-popup
        :type="popupType"
        :popupData="popupData">
      </pay-popup>
    </popup>
  </div>
</template>
<script>
  import './confirmOrder.less'
  import AddressCard from '../../components/AddressCard.vue'
  import GoodList from '../../components/GoodList.vue'
  import PayPopup from './PayPopup.vue'
  import HeaderNav from '../../components/HeaderNav'
  import {Cell, ViewBox, Popup, Scroller, Checklist, XInput} from 'vux'
  import {handleGetAddress, createOrder, handleGetPurchaseOrder} from '../../api'

  export default {
    components: {
      AddressCard,
      GoodList,
      Cell,
      ViewBox,
      Popup,
      Scroller,
      Checklist,
      XInput,
      PayPopup,
      HeaderNav
    },
    data() {
      return {
        // popupData: [],
        paySumAmount: 0,
        showPopup: false,
        popupType: '',
        userAddress: [],
        payPill: []
      }
    },
    computed: {
      selectedAddress() {
        let selectedAddress = this.$store.state.address.selectedAddress
        let addressList = this.$store.state.address.addressList
        if (addressList.length !== 0 && selectedAddress === null) {
          return addressList[0]
        } else {
          return selectedAddress
        }
      },
      payList() {
        return this.$store.state.cart.payList
      },
      totalAmount() {
        let payList = this.$store.state.cart.payList
        let amount = 0
        for (var i = 0; i < payList.length; i++) {
          amount += payList[i].num * Number(payList[i].price)
        }
        return amount.toFixed(2)
      },
      totalNum() {
        let payList = this.$store.state.cart.payList
        let num = 0;
        for (var i = 0; i < payList.length; i++) {
          num += payList[i].num
        }
        return num
      },
      products() {
        let payList = this.$store.state.cart.payList
        let products = [];
        for (let i = 0; i < payList.length; i++) {
          products.push({
            "productID": payList[i].productID,
            "price": parseFloat(payList[i].price),
            "num": payList[i].num
          })
        }
        return products
      },
      popupData() {
        return this.$store.state.address.addressList
      }
    },
    methods: {
      handleSetAddress(type) {
        this.popupType = type
        this.showPopup = !this.showPopup
        handleGetAddress(this)
      },
      handleCreateOrder() {
        let token = window.sessionStorage.getItem('token')
        let products = this.products
        let addressIndex = this.selectedAddress.index
        let amount = parseFloat(this.totalAmount)
        if (token !== null) {
          createOrder(token, products, amount, addressIndex, null, data => {
            if (!data.errcode) {
              this.$vux.toast.show({
                text: "提交成功"
              })
              handleGetPurchaseOrder(this, null, 1)
              this.$router.push('/purchaseOrder?tag=all')
            } else {
              this.$vux.alert.show({
                title: "提示",
                content: data.errmsg,
                buttonText: "知道了"
              })
            }
          })
        }
      },
      resetScroller() {
        // this.$nextTick(() => {
        // 	this.$refs.scroller.reset()
        // })
      },
      goBack() {
        this.$router.go(-1)
      },
      change(val) {
        console.log('change', val)
      }
    }
  }
</script>
