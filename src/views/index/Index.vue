<template>
  <div class="z-page">
    <div class="z-head life-index-head">
      <!--<div class="logo">
        <img :src="shop.logo" alt="">
      </div>-->
      <span class="title">{{shop.title}}</span>

    </div>
    <div>
    </div>
    <view-box class="z-content">
      <good-list
        :type="'INGOODS'"
        :data="goodsList">
      </good-list>
      <ending-line :showLoading="false"></ending-line>
    </view-box>

  </div>
</template>
<script>
import('./index.less')
import EndingLine from '../../components/EndingLine'
import GoodList from '../../components/GoodList'
import {ViewBox} from 'vux'
import {recommendGoods} from '../../data/data.js'
import {queryProduct} from '../../api'
export default {
  name:'Index',
  data () {
    return{
      goodsList: recommendGoods,
      shop: {
        title: 'jft_shop',
      }
    }
  },
  methods: {
    handleQueryProduct () {
      let token = window.sessionStorage.getItem('token')
      let that = this
      if (token != null) {
        queryProduct(token, data => {
          if(!data.errcode) {
            that.goodsList = data
          }
        })
      }
    }
  },
  components:{
    EndingLine,
    ViewBox,
    GoodList
  },
  created () {
    this.handleQueryProduct()
  }
}
</script>
