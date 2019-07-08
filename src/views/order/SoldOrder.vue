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
              <div class="z-cell-item z-text-right">
              <span v-if="order.status === '0' || order.status === '1'">待发货</span>
              <span v-if="order.status === '2'">已发货</span>
              <span v-if="order.status === '3'">买家已收货未评价</span>
              <span v-if="order.status === '4'">已评价</span>
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
              <span
                v-if="order.status === '0' || order.status === '1'"
                class="state-btn" @click="goToDelivery(order)">
							发货
						</span>
              <!-- <router-link
                 :to="{
                 name: 'commentPost',
               }"
                 v-if="order.status === 'needComment'"
                 class="state-btn">
                 评价
               </router-link>-->
            </div>
          </div>
        </shop-card>
      </div>
    </view-box>
  </div>
</template>

<script>
  import {ViewBox, Tab, TabItem} from 'vux'
  import HeaderNav from '../../components/HeaderNav'
  import EmptyView from '../../components/EmptyView'
  import ShopCard from '../../components/ShopCard.vue'
  import GoodList from '../../components/GoodList.vue'
  import {handleGetSoldOrder, delivery} from '../../api'

  export default {
    name: "SoldOrder",
    components: {
      ViewBox,
      Tab,
      TabItem,
      HeaderNav,
      EmptyView,
      ShopCard,
      GoodList
    },
    data() {
      return {
        headerNavTitle: '我售出的',
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
            text: '待买家确认',
            type: '2',
          },
          {
            tag: 'needComment',
            text: '待评价',
            type: '3',
          }
        ],
        index: 0
      }
    },
    computed: {
      computedTag() {
        return this.$route.query.tag
      },
      orderList() {
        return this.$store.state.order.soldOrderList
      }
    },
    methods: {
      tabHandler(type) {
        handleGetSoldOrder(this, type, 1)
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
      goToDelivery(order){
        this.$store.commit("orderDetail/set", order);
        this.$router.push('/delivery')
      }
    },
    created() {
      let routeName = this.$route.name
      let routeQuery = this.$route.query.tag
      if (routeName === 'soldOrder') {
        if (routeQuery === 'all') {
          handleGetSoldOrder(this, null, 1)
        } else if (routeQuery === 'needSend') {
          handleGetSoldOrder(this, '1', 1)
        } else if (routeQuery === 'needGet') {
          handleGetSoldOrder(this, '2', 1)
        } else if (routeQuery === 'needGet') {
          handleGetSoldOrder(this, '3', 1)
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
</style>
