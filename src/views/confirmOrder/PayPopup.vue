<template>
  <div class="pay-popup-wrap">
    <div
      class="pay-popup-head"
      v-show="type==='address'">
      收货地址选择
      <router-link
        class="pp-head-right-tip"
        :to="{
					name: 'myAddress'
				}">管理
      </router-link>
    </div>
    <scroller
      height="350px"
      lock-x
      ref="scroller">
      <div
        class="pay-popup-body"
        v-show="type==='address'">
        <checker
          v-model="selectData"
          default-item-class="pp-address-item-detault"
          selected-item-class="pp-address-item-selected">
          <checker-item
            v-for="(item, index) in popupData"
            :key = "index"
            :value="item">
            <div class="">
              <span>{{item.name}}</span>
              <span>{{item.mobile}}</span>
              <div>
								<span
                  class="z-text-color-main"
                  v-if="index===0">
									默认地址:
								</span>
                {{item.province}}{{item.city}}{{item.district}}{{item.detail}}
              </div>
            </div>
          </checker-item>
        </checker>
      </div>
    </scroller>
  </div>
</template>

<script>
  import {Scroller, Checker, CheckerItem} from 'vux'

  export default {
    props: ['popupData', 'type'],
    components: {
      Scroller,
      Checker,
      CheckerItem
    },
    data(){
      return {
        selectData: null
      }
    },
    watch: {
      'selectData'(newVal, oldVal) {
         this.$store.commit('address/setSelectedAddress', newVal)
      }
    }
  }
</script>

<style>
  .pay-popup-wrap{
    background-color: #fff;
    padding-bottom: 2px;
  }
  .pay-popup-wrap .pay-popup-head{
    position: relative;
    height: 40px;
    margin-bottom: 8px;
    border-bottom: 1px solid #f8f8f8;
    line-height: 40px;
    font-size: 14px;
    color: #404040;
    text-align: center;
  }
  .pay-popup-head .pp-head-right-tip{
    position: absolute;
    right: 8px;
    font-size: 14px;
    color: #404040;
  }
  .pay-popup-wrap .pay-popup-body{
    padding-left: 24px;
    padding-right: 24px;
  }
  .pay-popup-wrap .pay-popup-body .pp-coupon-item-detault{
    display: block;
    width: 100%;
    height: 40px;
    padding-left: 14px;
    padding-right: 14px;
    line-height: 40px;
    border-radius: 3px;
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #f6f6f6;
    background-color: #fff;
    font-size: 12px;
  }
  .pay-popup-wrap .pay-popup-body .pp-address-item-detault{
    display: block;
    width: 100%;
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 8px;
    padding-bottom: 8px;
    line-height: 1.6;
    border-radius: 3px;
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #f6f6f6;
    background-color: #fff;
    font-size: 12px;
  }
  .pp-address-item-detault span{
    padding-right: 8px;
  }
  .pay-popup-wrap .pay-popup-body .pp-coupon-item-selected,
  .pay-popup-wrap .pay-popup-body .pp-address-item-selected{
    background: #ffffff url(/static/img/active.png) no-repeat right bottom;
    border-color: #ed7a5d;
  }
  .pay-popup-foot{
    height: 40px;
    width: 100%;
    padding: 2px 8px;
  }
</style>
