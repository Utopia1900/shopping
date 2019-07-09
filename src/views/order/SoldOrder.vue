<template>
  <div>
    <header-nav :headerNavTitle="headerNavTitle" @on-back="goBack" />
    <view-box>
      <tab class="order-list-head" :line-width="2" actice-color="Efc378c" v-model="index">
        <tab-item
          v-for="(item, index) in list"
          :key="index"
          @click.native="tabHandler(item.type)"
          :selected="computedTag === item.tag"
        >{{item.text}}</tab-item>
      </tab>

      <empty-view v-if="orderList.length === 0" :iconCls="'zui-icon-IMGCARD'" :text="'暂无相关订单！'"></empty-view>
      <div class="order-list-wrap" v-else>
        <scroller
          refreshText="下拉刷新"
          noDataText="没有更多数据"
          :on-refresh="initData"
          style="margin-top: 80px;"
        >
          <shop-card v-for="(order, index) in orderList" :key="index" :shop="order">
            <div slot="body">
              <good-list
                v-for="(item, index) in order.products"
                :key="index"
                :type="'INCONFIRM'"
                :data="item"
              ></good-list>
            </div>
            <div slot="head">
              <div class="z-cell-item z-text-right" style="color:#ed7a5d">
                <span v-if="order.status === '0' || order.status === '1'">待发货</span>
                <span v-if="order.status === '2'">已发货</span>
                <span v-if="order.status === '3'">已收货</span>
                <span v-if="order.status === '4'">已评价</span>
              </div>
            </div>
            <div slot="foot" class="shop-card-foot">
              <div class="z-cell-item z-text-right">
                <span>共{{getTotalNum(order.products)}}件</span>
                合计￥
                <strong>{{order.amount}}</strong>
              </div>
            </div>
            <div slot="foot" class="shop-card-foot">
              <div class="z-cell-item z-text-right">
                <span class="state-plain-btn" @click="getOrderDetail(order)">查看详情</span>
                <span
                  v-if="order.status === '0' || order.status === '1'"
                  class="state-btn"
                  @click="goToDelivery(order)"
                >发货</span>
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
          <div
            @click="infinite"
            v-if="hasMore"
            style="text-align: center;color: #818085;padding-bottom: 30px;"
          >点击加载</div>
          <div v-else style="text-align: center;color: #818085">--没有更多--</div>
        </scroller>
      </div>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, Tab, TabItem } from "vux";
import HeaderNav from "../../components/HeaderNav";
import EmptyView from "../../components/EmptyView";
import ShopCard from "../../components/ShopCard.vue";
import GoodList from "../../components/GoodList.vue";
import { handleGetSoldOrder, delivery } from "../../api";

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
      headerNavTitle: "我售出的",
      list: [
        {
          tag: "all",
          text: "全部订单",
          type: null
        },
        {
          tag: "needSend",
          text: "待发货",
          type: "1"
        },
        {
          tag: "needGet",
          text: "待收货",
          type: "2"
        }
        // {
        //   tag: 'needComment',
        //   text: '待评价',
        //   type: '3',
        // }
      ],
      index: 0,
      type: null,
      page: 1
    };
  },
  computed: {
    computedTag() {
      return this.$route.query.tag;
    },
    orderList() {
      return this.$store.state.order.soldOrderList;
    },
    hasMore() {
      return this.$store.state.order.hasMore;
    }
  },
  methods: {
    tabHandler(type) {
      this.page = 1;
      this.type = type;
      this.$store.commit("order/initSoldOrder");
      var tag;
      if (type === null) {
        tag = "all";
      } else if (type === "1") {
        tag = "needSend";
      } else if (type === "2") {
        tag = "needGet";
      } else if (type === "3") {
        tag = "needComment";
      }
      this.$router.replace("/soldOrder?tag=" + tag);
    },
    goBack() {
      this.$router.go(-1);
    },
    getTotalNum(args) {
      if (args.length !== 0) {
        let num = 0;
        for (let i = 0; i < args.length; i++) {
          num += args[i].num;
        }
        return num;
      }
    },
    getOrderDetail(item) {
      this.$store.commit("orderDetail/set", item);
      this.$router.push("/orderDetail");
    },
    goToDelivery(order) {
      this.$store.commit("orderDetail/set", order);
      this.$router.push("/delivery");
    },
    initData() {
      this.page = 1;
      this.$store.commit("order/initSoldOrder");
      handleGetSoldOrder(this, this.type, this.page);
    },
    infinite() {
      this.page++;
      if (this.hasMore) {
        handleGetSoldOrder(this, this.type, this.page);
      }
    }
  }
};
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
