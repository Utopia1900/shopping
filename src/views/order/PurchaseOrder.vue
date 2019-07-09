<template>
  <div>
    <header-nav :headerNavTitle="headerNavTitle" @on-back="goBack"/>
    <view-box>
      <tab
        class="order-list-head"
        :line-width="2"
        actice-color="Efc378c"
        v-model="index">
        <tab-item
          v-for="(item, index) in list"
          :key=index
          @click.native="tabHandler(item.type)"
          :selected="computedTag === item.tag">
          {{item.text}}
        </tab-item>
      </tab>

      <empty-view
        v-if="orderList.length === 0"
        :iconCls="'zui-icon-IMGCARD'"
        :text="'暂无相关订单！'">
      </empty-view>

      <div class="order-list-wrap" v-else>
        <scroller
          refreshText="下拉刷新"
          noDataText="没有更多数据"
          :on-refresh="initData"
          style="margin-top: 80px;margin-bottom: 50px;"
        >
        <shop-card
          v-for="(order, index) in orderList"
          :key=index
          :shop="order">
          <div slot="body">
            <good-list
              v-for="(item, index) in order.products"
              :key=index
              :type="'INCONFIRM'"
              :data="item">
            </good-list>
          </div>
          <div slot="head">
            <div class="z-cell-item z-text-right" style="border-bottom: 1px solid #f6f6f6">
              <span v-if="order.status === '1' || order.status === '0'">待发货</span>
              <span v-if="order.status === '2'">已发货</span>
              <span v-if="order.status === '3'">确认收货未评价</span>
              <span v-if="order.status === '4'">已评价</span>
              <!--<span
                v-if="order.status === 'needGet'"
                class="state-btn">
							确认收货
						</span>
              <router-link
                :to="{
								name: 'commentPost',
							}"
                v-if="order.status === 'needComment'"
                class="state-btn">
                评价
              </router-link>-->
            </div>
          </div>
          <div
            slot="foot"
            class="shop-card-foot">
            <div class="z-cell-item z-text-right">
              <span>共{{getTotalNum(order.products)}}件</span>
              合计￥<strong>{{order.amount}}</strong>
            </div>
          </div>
          <div slot="foot" class="shop-card-foot">
            <div class="z-cell-item z-text-right">
              <span class="state-plain-btn" @click="getOrderDetail(order)">查看详情</span>
              <span v-if="order.status === '2'" class="state-plain-btn"
                    style="background-color: #09bb07;color: #fff;border: none" @click="openConfirmModal(order.orderID)">确认收货</span>
            </div>
          </div>
        </shop-card>
          <div @click="infinite" v-if="hasMore" style="text-align: center;color: #818085; padding-bottom: 30px;">点击加载</div>
          <div v-else style="text-align: center;color: #818085;padding-top: 30px;">--没有更多--</div>
        </scroller>
      </div>
    </view-box>
    <confirm
      title="是否确认收货？"
      :value="show"
      confirm-text="确认"
      cancel-text="取消"
      @on-cancel="closeConfirmModal"
      @on-confirm="handleConfirmReceipt(orderID)"
    ></confirm>
  </div>
</template>

<script>
  import {ViewBox, Tab, TabItem, Confirm} from 'vux'
  import HeaderNav from '../../components/HeaderNav'
  import EmptyView from '../../components/EmptyView'
  import ShopCard from '../../components/ShopCard.vue'
  import GoodList from '../../components/GoodList.vue'
  import {handleGetPurchaseOrder, confirmReceipt} from '../../api'

  export default {
    name: 'PurchaseOrder',
    components: {
      ViewBox,
      Tab,
      TabItem,
      Confirm,
      HeaderNav,
      EmptyView,
      ShopCard,
      GoodList
    },
    data() {
      return {
        orderID: null,
        show: false,
        headerNavTitle: '我购买的',
        list: [
          {
            tag: 'all',
            text: '全部订单',
            type: null
          },
          {
            tag: 'needSend',
            text: '待发货',
            type: '1',
          },
          {
            tag: 'needGet',
            text: '待收货',
            type: '2'
          },
          {
            tag: 'needComment',
            text: '待评价',
            type: '3'
          }
        ],
        index: 0,
        type: null,
        page: 1,
        hasMore: false
      }
    },
    computed: {
      computedTag() {
        return this.$route.query.tag
      },
      orderList() {
        return this.$store.state.order.purchaseOrderList
      }
    },
    methods: {
      tabHandler(type) {
        this.page = 1
        this.type = type
        this.$store.commit('order/initPurchaseOrder');
        handleGetPurchaseOrder(this, type, 1)
      },
      goBack() {
        this.$router.go(-1)
      },
      getTotalNum(args) {
        if (args.length !== 0) {
          let num = 0;
          for (let i = 0; i < args.length; i++) {
            num += args[i].num
          }
          return num
        }
      },
      getOrderDetail(item) {
        this.$store.commit("orderDetail/set", item);
        this.$router.push('/orderDetail');
      },
      openConfirmModal(orderID) {
        this.show = true
        this.orderID = orderID
      },
      closeConfirmModal() {
        this.orderID = null
        this.show = false
      },
      handleConfirmReceipt(orderID) {
        const token = window.sessionStorage.getItem('token')
        if (token) {
          confirmReceipt(token, orderID, data => {
            if (!data.errcode) {
              this.$vux.toast.show({
                type: "success",
                text: "收货成功",
                isShowMask: true
              })
              let orderList = this.orderList
              for (let i = 0; i < orderList.length; i++) {
                if (orderList[i].orderID === orderID) {
                  orderList.splice(i, 1)
                  break
                }
              }
              this.show = false
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
      initData(){
        this.page = 1
        this.$store.commit('order/initPurchaseOrder');
        handleGetPurchaseOrder(this, this.type, this.page)
      },
      infinite(done){
        this.page ++
        if(this.hasMore) {
          handleGetPurchaseOrder(this, this.type, this.page)
          done()
        } else {
          done(true)
        }
      },

    },
    created() {
      let routeName = this.$route.name
      let routeQuery = this.$route.query.tag
      if (routeName === 'purchaseOrder') {
        if (routeQuery === 'all') {
          handleGetPurchaseOrder(this, null, 1)
        } else if (routeQuery === 'needSend') {
          handleGetPurchaseOrder(this, '1', 1)
        } else if (routeQuery === 'needGet') {
          handleGetPurchaseOrder(this, '2', 1)
        } else if (routeQuery === 'needComment') {
          handleGetPurchaseOrder(this, '3', 1)
        }
      }
    }
  }
</script>

<style>
  .order-list-head .vux-tab-container {
    top: 40px;
    position: fixed;
    z-index: 999;
  }

  .order-list-wrap {
    margin-top: 50px;
  }
  .load-more{
    position: fixed;
    bottom: 0;
    height: 40px;text-align: center;font-size: 13px;color: #9b9b9b;
  }
</style>
