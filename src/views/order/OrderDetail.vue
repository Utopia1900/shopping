<template>
  <div>
    <header-nav :headerNavTitle="headerNavTitle" @on-back="goBack" />
    <div style="margin-top: 45px;background-color: #ffffff;">
      <div style="padding: 10px;text-align: center">
        <h4 style="color: #ed7a5d">{{formatStatusText(orderDetail.status)}}</h4>
      </div>
      <div
        v-if="orderDetail.name"
        style="padding: 8px; border-bottom: 1px solid #eeeeee; display:flex; flex-direction:row"
      >
        <span
          class="zui-icon zui-icon-address"
          style="font-size: 30px;color:#ed7a5d;line-height:40px;"
        ></span>
        <ul style="padding-left: 10px">
          <li style="font-size: 15px">
            <span>{{orderDetail.name}}</span>
            <span style="color: #655555;padding-left: 10px;font-size:12px;">{{orderDetail.mobile}}</span>
          </li>
          <li style="font-size: 13px;">{{orderDetail.address}}</li>
        </ul>
      </div>
      <good-list
        v-for="(item, index) in orderDetail.products"
        :key="index"
        :type="'INCONFIRM'"
        :data="item"
      ></good-list>
    </div>
    <div style="margin-top: 5px;background-color: #ffffff;padding: 10px;">
      <ul style="font-size: 13px;">
        <li>订单号：{{orderDetail.orderID}}</li>
        <li>订单总价：{{orderDetail.amount}}</li>
        <li v-if="orderDetail.time">创建时间：{{formatDate(orderDetail.time)}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import HeaderNav from "../../components/HeaderNav";
import GoodList from "../../components/GoodList.vue";
import "../../utils/formatDate";

export default {
  data() {
    return {
      headerNavTitle: "订单详情"
    };
  },
  components: {
    HeaderNav,
    GoodList
  },
  computed: {
    orderDetail() {
      return this.$store.state.orderDetail.detail;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    formatStatusText(status) {
      if (status === "0" || status === "1") {
        return "待发货";
      } else if (status === "2") {
        return "已发货";
      } else if (status === "3") {
        return "已收货";
      } else if (status === "4") {
        return "已评价";
      }
    },
    formatDate(date) {
      let parseDate = Date.parse(date);
      let reqDate = new Date(parseDate).FormatDate("yyyy-MM-dd hh:mm:ss");
      return reqDate;
    }
  }
};
</script>

<style scoped>
</style>
