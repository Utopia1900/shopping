<template>
  <div>
    <header-nav :headerNavTitle="'确认订单'"/>
    <div class="good-pay-bottombar">
      <div class="sum-price">总计: <span style="color:#ed7a5d">￥{{totalAmount}}</span></div>
      <div class="pill-submit-btn">
        <span class="btn">提交订单</span>
      </div>
    </div>

    <view-box>
      <div
        style="margin-top: 45px;"
        class="good-pay-address"
        @click="selectAddress('address')">
        <address-card
          v-if="defaultAddress.length > 0"
          :link="true"
          :tool="false"
          :data="defaultAddress[0]">
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
            :key = "index"
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
      height="300px"
      @on-hide="log('hide')"
      @on-show="log('show')"
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
  import {payPill, userAddress} from '../../data/data.js'
  import AddressCard from '../../components/AddressCard.vue'
  import GoodList from '../../components/GoodList.vue'
  import PayPopup from './PayPopup.vue'
  import HeaderNav from '../../components/HeaderNav'
  import {Cell, ViewBox, Popup, Scroller, Checklist,XInput} from 'vux'

  export default{
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
        popupData: [],
        paySumAmount: 0,
        showPopup: false,
        popupType: '',
        userAddress: userAddress,
        payPill: payPill
      }
    },
    computed: {
      defaultAddress(){
        return this.userAddress.filter(i => i.isDefault === 1)
      },
      payList() {
        return this.$store.state.cart.payList
      },
      totalAmount () {
        let payList = this.$store.state.cart.payList
        let amount = 0
        for (var i =0; i<payList.length; i++) {
            amount += payList[i].num * Number(payList[i].price)
        }
        return amount.toFixed(2)
      },
      totalNum () {
        let payList = this.$store.state.cart.payList
        let num = 0;
        for (var i =0; i<payList.length; i++) {
            num += payList[i].num
        }
        return num
      }
    },
    methods: {
      selectAddress(type){
        this.popupType = type
        this.showPopup = !this.showPopup
        this.popupData = this.userAddress
      },
      selectCoupon(type,id) {
        this.popupType = type
        this.showPopup = !this.showPopup
        this.payPill.forEach(i => {
          if(i.id === id){
            console.log(i.coupon)
            this.popupData = i.coupon
          }
        })
      },
      resetScroller() {
        // this.$nextTick(() => {
        // 	this.$refs.scroller.reset()
        // })
      },
      log(str) {
        console.log(str)
      },
      change (val) {
        console.log('change', val)
      }
    }
  }
</script>
