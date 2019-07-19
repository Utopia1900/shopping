<template>
  <div class="z-page">
    <div class="mine-head-wrap">
      <img :src="userInfo.headImgUrl" />
      <div class="mine-info" style="float:left; width:70%">
        <span class="name">{{userInfo.nickname}}</span>
        <div>
          <div>
            <span style="font-size:11px;">
              购买的订单总额
            </span>
            <span style="padding-left:10px;font-size:16px;">{{userInfo.amount}}</span>
          </div>
          <div>
            <span style="font-size:11px;">
              订单总数
            </span>
            <span style="padding-left:10px;font-size:16px;">{{userInfo.orderNum}}</span>
          </div>
        </div>
      </div>
      <div>
        <span class="zui-icon zui-icon-setting" @click="routeToPersonalInfo"></span>
      </div>
    </div>

    <group>
      <div class="mine-order-wrap">
        <cell class="mine-order-all" title="我购买的"></cell>
        <flexbox :gutter="0">
          <flexbox-item>
            <router-link
              class="mine-order-item"
              :to="{
							name: 'purchaseOrder',
							query: {tag: purchaseTag.all.tag}
						}"
            >
              <!--<badge class="badge" text=""></badge>-->
              <span :class="purchaseTag.all.icon"></span>
              <div>{{purchaseTag.all.text}}</div>
            </router-link>
          </flexbox-item>
          <flexbox-item>
            <router-link
              class="mine-order-item"
              :to="{
							name: 'purchaseOrder',
							query: {tag: purchaseTag.send.tag}
						}"
            >
              <span :class="purchaseTag.send.icon"></span>
              <div>{{purchaseTag.send.text}}</div>
            </router-link>
          </flexbox-item>
          <flexbox-item>
            <router-link
              class="mine-order-item"
              :to="{
							name: 'purchaseOrder',
							query: {tag: purchaseTag.get.tag}
						}"
            >
              <span :class="purchaseTag.get.icon"></span>
              <div>{{purchaseTag.get.text}}</div>
            </router-link>
          </flexbox-item>
          <!-- <flexbox-item>
            <router-link
              class="mine-order-item"
              :to="{
							name: 'purchaseOrder',
							query: {tag: purchaseTag.comment.tag}
						}"
            >
              <span :class="purchaseTag.comment.icon"></span>
              <div>{{purchaseTag.comment.text}}</div>
            </router-link>
          </flexbox-item>-->
        </flexbox>
      </div>
    </group>

    <group>
      <div class="mine-order-wrap">
        <cell class="mine-order-all" title="我售出的"></cell>
        <flexbox :gutter="0">
          <flexbox-item style="color: red">
            <router-link
              class="mine-order-item"
              :to="{
							name: 'soldOrder',
							query: {tag: soldTag.all.tag}
						}"
            >
              <span :class="soldTag.all.icon" style="color:green"></span>
              <div>{{soldTag.all.text}}</div>
            </router-link>
          </flexbox-item>

          <flexbox-item>
            <router-link
              class="mine-order-item"
              :to="{
							name: 'soldOrder',
							query: {tag: soldTag.send.tag}
						}"
            >
              <span :class="soldTag.send.icon" style="color:green"></span>
              <div>{{soldTag.send.text}}</div>
            </router-link>
          </flexbox-item>

          <flexbox-item>
            <router-link
              class="mine-order-item"
              :to="{
							name: 'soldOrder',
							query: {tag: soldTag.get.tag}
						}"
            >
              <span :class="soldTag.get.icon" style="color:green"></span>
              <div>{{soldTag.get.text}}</div>
            </router-link>
          </flexbox-item>
          <!-- <flexbox-item>
            <router-link
              class="mine-order-item"
              :to="{
							name: 'soldOrder',
							query: {tag: soldTag.comment.tag}
						}"
            >
              <span :class="soldTag.comment.icon"></span>
              <div>{{soldTag.comment.text}}</div>
            </router-link>
          </flexbox-item>-->
        </flexbox>
      </div>
    </group>
    <group>
      <cell class="z-cell-item" :title="'收货地址'" :link="{
					name: 'myAddress'
				}"></cell>
      <cell class="z-cell-item" :title="'我的下级'" :link="{
					name: 'myLower'
				}"></cell>
      <div class="z-cell-item" @click="handleGetAgency('get')">
        <p style="text-indent: 15px; color: #000;">级别说明</p>
      </div>
    </group>
    <x-dialog v-model="showAgency" class="dialog-demo">
      <div style="padding:15px;text-align: left">
        <ul v-for="(item, index) in agencyList" :key="index">
          <div>
            <h4>{{item.name}}:</h4>
            <p style="font-size: 14px;">{{item.desc}}</p>
          </div>
        </ul>
      </div>
      <div @click="showAgency=false" style="padding: 8px; color: rgba(128,127,132,0.89)">
        <span class="vux-close">关闭</span>
      </div>
    </x-dialog>
  </div>
</template>
<script>
require("./mine.less");
import { Badge, Cell, Group, Flexbox, FlexboxItem, XDialog } from "vux";
import {
  querySummary,
  handleGetPurchaseOrder,
  handleGetSoldOrder,
  getAgencyLevel,
  getPersonalInfo
} from "../../api";

export default {
  components: {
    Badge,
    Group,
    Cell,
    FlexboxItem,
    Flexbox,
    XDialog
  },
  data() {
    return {
      showAgency: false,
      purchaseTag: {
        all: {
          tag: "all",
          text: "全部订单",
          icon: "zui-icon zui-icon-order"
        },
        send: {
          tag: "needSend",
          text: "待发货",
          icon: "zui-icon zui-icon-shipped"
        },
        get: {
          tag: "needGet",
          text: "待收货",
          icon: "zui-icon zui-icon-the-receipt"
        },
        comment: {
          tag: "needComment",
          text: "待评价",
          icon: "zui-icon zui-icon-comment"
        }
      },
      soldTag: {
        all: {
          tag: "all",
          text: "全部订单",
          icon: "zui-icon zui-icon-order"
        },
        send: {
          tag: "needSend",
          text: "待发货",
          icon: "zui-icon zui-icon-shipped"
        },
        get: {
          tag: "needGet",
          text: "待收货",
          icon: "zui-icon zui-icon-the-receipt"
        },
        comment: {
          tag: "needComment",
          text: "待评价",
          icon: "zui-icon zui-icon-comment"
        }
      },
      agencyList: []
    };
  },
  computed:{
    userInfo(){
      return this.$store.state.summary.row
    }
  },
  methods: {
    getToken() {
      let token = this.$cookie.get("token");
      if (token) {
        window.sessionStorage.setItem("token", token);
      }
    },
    querySummary() {
      let token = window.sessionStorage.getItem("token");
      if (token) {
        querySummary(token, data => {
          if (!data.errcode) {
            this.userInfo = data;
          } else {
            this.$vux.alert.show({
              title: "提示",
              content: data.errmsg,
              buttonText: "知道了"
            });
          }
        });
      }
    },
    handleGetAgency(type) {
      let token = window.sessionStorage.getItem("token");
      if (token) {
        getAgencyLevel(token, data => {
          if (!data.errcode) {
            if (type === "sessionStorage") {
              window.sessionStorage.setItem(
                "agencyLevel",
                JSON.stringify(data)
              );
            } else if (type === "get") {
              this.agencyList = data;
              this.showAgency = true;
            }
          } else {
            this.$vux.alert.show({
              title: "提示",
              content: data.errmsg,
              buttonText: "知道了"
            });
          }
        });
      }
    },
    routeToPersonalInfo(){
      getPersonalInfo(this)
      this.$router.push('/mine/personalInfo')
    }
  },
  created() {
    this.getToken();
    // this.querySummary();
    this.handleGetAgency("sessionStorage");
  },
  beforeRouteLeave (to, from, next) {
    let timer = this.$store.state.summary.timer
    if(timer){
      window.clearInterval(timer)
      this.$store.commit('summary/setTimer', null)
    }
    next()
  },
  watch: {
    $route(to, from) {
      if (to.name === "purchaseOrder") {
        if (from.name !== "orderDetail") {
          this.$store.commit("order/initPurchaseOrder");
          if (to.query.tag === "all") {
            handleGetPurchaseOrder(this, null, 1);
          } else if (to.query.tag === "needSend") {
            handleGetPurchaseOrder(this, "1", 1);
          } else if (to.query.tag === "needGet") {
            handleGetPurchaseOrder(this, "2", 1);
          } else if (to.query.tag === "needComment") {
            handleGetPurchaseOrder(this, "3", 1);
          }
        }
      } else if (to.name === "soldOrder") {
        if (from.name !== "orderDetail") {
          this.$store.commit("order/initSoldOrder");
          if (to.query.tag === "all") {
            handleGetSoldOrder(this, null, 1);
          } else if (to.query.tag === "needSend") {
            handleGetSoldOrder(this, "1", 1);
          } else if (to.query.tag === "needGet") {
            handleGetSoldOrder(this, "2", 1);
          } else if (to.query.tag === "needComment") {
            handleGetSoldOrder(this, "3", 1);
          }
        }
      }
    }
  }
};
</script>
<style>
.vux-flexbox .vux-flexbox-item span {
  color: #ed7a5d;
}
</style>
