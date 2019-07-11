<template>
  <div>
    <header-nav :headerNavTitle="headerNavTitle" @on-back="goBack" />
    <div>
      <empty-view v-if="lowerList.length === 0" :iconCls="'zui-icon-IMGCARD'" :text="'暂无下级！'"></empty-view>
      <div v-else>
        <scroller
          refreshText="下拉刷新"
          noDataText="没有更多数据"
          :on-refresh="initData"
          style="margin-top: 60px;margin-bottom: 50px;"
        >
          <div v-for="(item, index) in lowerList" :key="index">
            <div style="display: flex; flex-direction: row;background-color: #fff;padding: 8px;">
              <img :src="item.headImgUrl" alt="昵称" style="margin-left:20px;width: 50px;" />
              <div
                style="display: flex; flex-direction: column; margin-left: 15px;font-size: 15px;"
              >
                <span>{{item.nickname}}</span>
                <span style="font-size: 13px;text-indent: 15px;color: #666666">
                  当前级别:&nbsp;&nbsp;
                  <span style="color:#ED7A5D">{{formatLevel(item.curLevel)}}</span>
                </span>
                <span style="color: #666666;text-indent:15px;font-size:12px;">
                  购买订单总额:&nbsp;&nbsp;
                  <span style="color:#ED7A5D">{{item.orderAmount}}</span>
                  &nbsp;&nbsp;订单总数:&nbsp;&nbsp;
                  <span style="color:#ED7A5D;">{{item.orderNum}}</span>
                </span>
              </div>
            </div>
          </div>
          <div
            @click="infinite"
            v-if="hasMore"
            style="text-align: center;color: #818085; padding-bottom: 30px;"
          >点击加载</div>
          <div v-else style="text-align: center;color: #818085;padding-top: 30px;">--没有更多--</div>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "../../components/HeaderNav";
import EmptyView from "../../components/EmptyView";
import { handleQueryLower } from "../../api";

export default {
  name: "MyLower",
  data() {
    return {
      headerNavTitle: "我的下级",
      page: 1,
      hasMore: false
    };
  },
  components: {
    HeaderNav,
    EmptyView
  },
  computed: {
    lowerList() {
      return this.$store.state.lower.list;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getMyLower(page) {
      const token = window.sessionStorage.getItem("token");
      if (token) {
        queryLower(token, page, data => {
          if (!data.errcode) {
            this.lowerList = data;
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
    initData() {
      this.page = 1;
      this.$store.commit("lower/init");
      handleQueryLower(this, this.page);
    },
    infinite() {
      this.page++;
      if (this.hasMore) {
        handleGetPurchaseOrder(this, this.page);
      }
    },
    formatLevel(id) {
      let agencyLevel = window.sessionStorage.getItem("agencyLevel");
      if (agencyLevel) {
        let agency = JSON.parse(agencyLevel);
        for (let i = 0; i < agency.length; i++) {
          if (agency[i].id === id) {
            return agency[i].name;
          }
        }
      }
    }
  },
  created() {
    handleQueryLower(this, this.page);
  }
};
</script>

<style scoped>
</style>
