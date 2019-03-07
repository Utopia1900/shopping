<template>
  <div class="z-page">
    <div class="mine-head-wrap">
      <img :src="userInfo.logo"/>
      <div class="mine-info">
        <span class="name">{{userInfo.name}}</span>
        <span class="hello">, hello</span>
      </div>
    </div>
    <div class="mine-order-wrap">
      <cell
        class="mine-order-all"
        :title="orderTag.all.text"
        :value="'查看全部'"
        :link="{
					name: 'orderList',
					query: {tag:orderTag.all.tag}
				}">
      </cell>
    </div>

    <group >
      <cell
        class="z-cell-item"
        :title="'收货地址'"
        :link="{
					name: 'myAddress'
				}">
      </cell>
    </group>
  </div>
</template>
<script>
  require('./mine.less')
  import {userInfo} from '../../data/data.js'

  import { Badge, Cell, Group, Flexbox, FlexboxItem } from 'vux'
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
        userInfo: userInfo,
        orderTag: {
          all: {
            tag: 'all',
            text: '我的订单',
            icon: ''
          },
          pay: {
            tag: 'pay',
            text: '待付款',
            icon: 'zui-icon zui-icon-payment'
          },
          send: {
            tag: 'send',
            text: '待发货',
            icon: 'zui-icon zui-icon-shipped'
          },
          get: {
            tag: 'get',
            text: '待收货',
            icon: 'zui-icon zui-icon-the-receipt'
          },
          comment: {
            tag: 'comment',
            text: '待评价',
            icon: 'zui-icon zui-icon-comment'
          },
          sole: {
            tag: 'sole',
            text: '售后/退款',
            icon: 'zui-icon zui-icon-KEFU'
          }
        }
      }
    }
  }
</script>
