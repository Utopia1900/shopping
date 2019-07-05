<template>
  <div class="z-page">
    <div class="mine-head-wrap">
      <img :src="userInfo.logo"/>
      <div class="mine-info">
        <span class="name">{{userInfo.name}}</span>
        <span class="hello">, hello</span>
      </div>
    </div>

    <group>
      <div class="mine-order-wrap">
        <cell
          class="mine-order-all"
          title="我购买的"
        >
        </cell>
        <flexbox :gutter="0">
          <flexbox-item>
            <router-link
              class="mine-order-item"
              :to="{
							name: 'purchaseOrder',
							query: {tag: purchaseTag.all.tag}
						}">
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
						}">
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
						}">
              <span :class="purchaseTag.get.icon"></span>
              <div>{{purchaseTag.get.text}}</div>
            </router-link>
          </flexbox-item>
          <flexbox-item>
            <router-link
              class="mine-order-item"
              :to="{
							name: 'purchaseOrder',
							query: {tag: purchaseTag.comment.tag}
						}">
              <span :class="purchaseTag.comment.icon"></span>
              <div>{{purchaseTag.comment.text}}</div>
            </router-link>
          </flexbox-item>
        </flexbox>
      </div>
    </group>

    <group>
      <div class="mine-order-wrap">
        <cell
          class="mine-order-all"
          title="我售出的"
        >
        </cell>
        <flexbox :gutter="0">
          <flexbox-item style="color: red">
            <router-link
              class="mine-order-item"
              :to="{
							name: 'soldOrder',
							query: {tag: soldTag.all.tag}
						}">
              <span :class="soldTag.all.icon" style="color:#ed7a5d"></span>
              <div>{{soldTag.all.text}}</div>
            </router-link>
          </flexbox-item>

          <flexbox-item>
            <router-link
              class="mine-order-item"
              :to="{
							name: 'soldOrder',
							query: {tag: soldTag.send.tag}
						}">
              <span :class="soldTag.send.icon"></span>
              <div>{{soldTag.send.text}}</div>
            </router-link>
          </flexbox-item>

          <flexbox-item>
            <router-link
              class="mine-order-item"
              :to="{
							name: 'soldOrder',
							query: {tag: soldTag.get.tag}
						}">
              <span :class="soldTag.get.icon"></span>
              <div>{{soldTag.get.text}}</div>
            </router-link>
          </flexbox-item>
          <flexbox-item>
            <router-link
              class="mine-order-item"
              :to="{
							name: 'soldOrder',
							query: {tag: soldTag.comment.tag}
						}">
              <span :class="soldTag.comment.icon"></span>
              <div>{{soldTag.comment.text}}</div>
            </router-link>
          </flexbox-item>
        </flexbox>
      </div>
    </group>
    <group>
      <cell
        class="z-cell-item"
        :title="'收货地址'"
        :link="{
					name: 'myAddress'
				}">
      </cell>
      <cell
        class="z-cell-item"
        :title="'我的推广'"
        :link="{
					name: 'myLower'
				}">
      </cell>
    </group>
  </div>
</template>
<script>
  require('./mine.less')
  import {Badge, Cell, Group, Flexbox, FlexboxItem} from 'vux'
  import {querySummary, handleGetPurchaseOrder, handleGetSoldOrder} from "../../api";

  export default {
    components: {
      Badge,
      Group,
      Cell,
      FlexboxItem,
      Flexbox
    },
    data() {
      return {
        userInfo: [],
        purchaseTag: {
          all: {
            tag: 'all',
            text: '全部订单',
            icon: 'zui-icon zui-icon-order'
          },
          send: {
            tag: 'needSend',
            text: '待发货',
            icon: 'zui-icon zui-icon-shipped'
          },
          get: {
            tag: 'needGet',
            text: '待收货',
            icon: 'zui-icon zui-icon-the-receipt'
          },
          comment: {
            tag: 'needComment',
            text: '待评价',
            icon: 'zui-icon zui-icon-comment'
          },
        },
        soldTag: {
          all: {
            tag: 'all',
            text: '全部订单',
            icon: 'zui-icon zui-icon-order'
          },
          send: {
            tag: 'needSend',
            text: '待发货',
            icon: 'zui-icon zui-icon-shipped'
          },
          get: {
            tag: 'needGet',
            text: '待买家确认',
            icon: 'zui-icon zui-icon-the-receipt'
          },
          comment: {
            tag: 'needComment',
            text: '待评价',
            icon: 'zui-icon zui-icon-comment'
          },
        }
      }
    },
    methods: {
      getToken() {
        let token = this.$cookie.get('token')
        if (token) {
          window.sessionStorage.setItem('token', token)
        }
      },
      querySummary() {
        let token = window.sessionStorage.getItem('token')
        if(token){
          querySummary(token, data=>{
            if(!data.errcode){
              this.userInfo = data
            } else {
              this.$vux.alert.show({
                title: "提示",
                content: data.errmsg,
                buttonText: "知道了"
              });
            }
          })
        }
      },
    },
    created() {
      this.getToken()
      this.querySummary()
    },
    watch:{
      $route(to, from) {
        if(to.name === 'purchaseOrder') {
          if(to.query.tag === 'all') {
            handleGetPurchaseOrder(this, null, 1)
          } else if(to.query.tag === 'needSend') {
            handleGetPurchaseOrder(this, '1', 1)
          } else if(to.query.tag === 'needGet') {
            handleGetPurchaseOrder(this, '2', 1)
          } else if(to.query.tag === 'needComment'){
            handleGetPurchaseOrder(this, '3', 1)
          }
        } else if(to.name === 'soldOrder'){
          if(to.query.tag === 'all') {
            handleGetSoldOrder(this, null, 1)
          } else if(to.query.tag === 'needSend') {
            handleGetSoldOrder(this, '1', 1)
          } else if(to.query.tag === 'needGet') {
            handleGetSoldOrder(this, '2', 1)
          } else if(to.query.tag === 'needComment'){
            handleGetSoldOrder(this, '3', 1)
          }
        }
      }
    }
  }
</script>
<style>
  .vux-flexbox .vux-flexbox-item span {
    color: #ed7a5d;
  }
</style>
