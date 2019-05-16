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

      </div>
    </view-box>
  </div>
</template>

<script>
  import {ViewBox, Tab, TabItem} from 'vux'
  import HeaderNav from '../../components/HeaderNav';
  import EmptyView from '../../components/EmptyView'
  import {querySoldOrder} from '../../api'

  export default {
    name: "SoldOrder",
    components: {
      ViewBox,
      Tab,
      TabItem,
      HeaderNav,
      EmptyView
    },
    data() {
      return {
        orderList: [],
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
            type: 1,
          },
          {
            tag: 'needGet',
            text: '待买家确认',
            type: 2,
          }
        ],
        index: 0
      }
    },
    computed: {
      computedTag() {
        return this.$route.query.tag
      }
    },
    methods: {
      tabHandler(type) {
        let _this = this
        let token = window.sessionStorage.getItem('token')
        if (token) {
          querySoldOrder(token, type, 1, data => {
            if (!data.errcode) {
              _this.orderList = data.orderList
            } else {

            }
          })
        }
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style>
  .order-list-head .vux-tab-container {
    top: 40px;
    position: fixed;
  }
</style>
