<template>
  <div class="z-content">
    <header-nav :headerNavTitle="headerNavTitle" @on-back=""/>
    <div v-if="orderDetail.name"
         style="margin-top: 45px;padding: 8px; border-bottom: 1px solid #eeeeee;background-color: #ffffff">
      <div style="border-bottom: 1px solid #efeff4">
        <h6>收件人信息:</h6>
        <ul style="padding-left: 20px">
          <li style="font-size: 13px"><span>{{orderDetail.name}}</span><span style="color: #555555;padding-left: 10px;">{{orderDetail.mobile}}</span>
          </li>
          <li style="font-size: 15px;">{{orderDetail.address}}</li>
        </ul>
      </div>
      <div style="border-bottom: 1px solid #efeff4">
        <h6>商品信息:</h6>
        <good-list
          v-for="(item, index) in orderDetail.products"
          :key=index
          :type="'INCONFIRM'"
          :data="item">
        </good-list>
        <div style="text-align: right;font-size: 15px;">总计：{{orderDetail.amount}}</div>
      </div>
      <div style="border-bottom: 1px solid #efeff4">
        <h6>订单信息:</h6>
        <ul style="font-size: 13px;padding-left: 20px">
          <li>
            订单号：{{orderDetail.orderID}}
          </li>
          <li>
            订单总价：{{orderDetail.amount}}
          </li>
          <li>
            创建时间：{{orderDetail.time}}
          </li>
        </ul>
      </div>
    </div>
    <div class="address-edit-wrap">
      <popup-picker :title="title" :data="list" v-model="expressCompany" @on-show="onShow" @on-hide="onHide"
                    @on-change="onChange" placeholder="清"></popup-picker>
      <x-input
        title="填写快递单号:"
        :show-clear="true"
        :value="expressNo"
        required
        @on-change="changeExpressNo"
        placeholder="请填写"
      ></x-input>
    </div>
    <div class="address-edit-btn" @click="handleDelivery">确定提交</div>
  </div>
</template>

<script>
  import HeaderNav from "../../components/HeaderNav";
  import GoodList from '../../components/GoodList.vue'
  import {XInput, Confirm, PopupPicker} from "vux";
  import {delivery} from '../../api'

  export default {
    data() {
      return {
        headerNavTitle: '填写快递信息',
        expressNo: '',
        expressCompany: ['请选择'],
        title: '快递公司',
        list: [['请选择', '圆通速递', '申通快递', '中通速递','百世快递','韵达快递','顺丰速运','天天快递','EMS邮政速递','德邦快递','跨越速运','韵达快递']]
      }
    },
    computed: {
      orderDetail() {
        return this.$store.state.orderDetail.detail
      }
    },
    components: {
      HeaderNav,
      XInput,
      Confirm,
      PopupPicker,
      GoodList
    },
    methods: {
      onChange(val) {
        console.log('val change', val)
        console.log(this.expressCompany[0])
      },
      onHide(type) {
        console.log('on hide', type)
      },
      onShow() {
        console.log('on show')
      },
      changeExpressNo(val) {
        this.expressNo = val;
      },
      goBack() {
        this.$router.go(-1)
      },
      handleDelivery() {
        const token = window.sessionStorage.getItem('token')
        let orderID = this.orderDetail.orderID
        let expressNo = this.expressNo
        let expressCompany = this.expressCompany[0]
        if (orderID !== null) {
          if (expressCompany === '请选择') {
            this.$vux.alert.show({
              title: "提示",
              content: "请选择快递公司",
              buttonText: "知道了"
            })
          } else if (expressNo === '') {
            this.$vux.alert.show({
              title: "提示",
              content: "请填写快递单号",
              buttonText: "知道了"
            })
          } else {
            delivery(token, orderID, expressCompany, expressNo, data => {
              if (!data.errcode) {
                this.$vux.toast.show({
                  type: "success",
                  text: "发货成功",
                  isShowMask: true
                });
             /*   let orderList = this.orderList
                for (let i = 0; i < orderList.length; i++) {
                  if (orderList[i].orderID === orderID) {
                    orderList.splice(i, 1)
                    break
                  }
                }*/
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
      }
    }
  }
</script>

<style scoped>
  h6 {
    color: #ed7a5d
  }

  .address-edit-wrap {
    background-color: #fff;
    color: #404040;
    margin-top: 20px;
  }

  .address-edit-wrap .weui-label {
    color: #404040;
  }

  .address-edit-wrap textarea {
    font-size: 15px;
    color: #404040;
  }

  .address-edit-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 40px;
    line-height: 40px;
    display: block;
    width: 100%;
    background-color: #ed7a5d;
    color: #fff;
    text-align: center;
  }

  .set-default-wrap {
    padding: 10px 15px;
  }
</style>
