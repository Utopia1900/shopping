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
      <ending-line :showLoading="goodsList.length!==0"></ending-line>
    </view-box>

  </div>
</template>
<script>
import('./index.less')
import EndingLine from '../../components/EndingLine'
import GoodList from '../../components/GoodList'
import {ViewBox} from 'vux'
import {queryProduct} from '../../api'
export default {
  name:'Index',
  data () {
    return{
      goodsList: [
        {"id":1,"name":"面膜","imgUrl":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=71967853,872167714&fm=26&gp=0.jpg","headImgUrl":"http://www.stemtherapy.cn/pics/2.jpg","detailUrl":"http://www.stemtherapy.cn/pics/3.jpg","retailPrice":"288.00","price":"225.00","inventory":31},
        {"id":2,"name":"修复精华液","imgUrl":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=71967853,872167714&fm=26&gp=0.jpg","headImgUrl":"http://www.stemtherapy.cn/pics/pr_2.jpg","detailUrl":"http://www.stemtherapy.cn/pics/pr_3.jpg","retailPrice":"300.00","price":"240.00","inventory":0}]
      ,
      shop: {
        title: '产品购买',
      }
    }
  },
  components:{
    EndingLine,
    ViewBox,
    GoodList
  },
  methods: {
    getToken () {
      const token = this.$cookie.get('token')
      if (token) {
        window.sessionStorage.setItem('token', token)
      }
    },
    handleQueryProduct () {
      let token = window.sessionStorage.getItem('token')
      let that = this
      if (token) {
        queryProduct(token, data => {
          if(!data.errcode) {
            that.goodsList = data
          } else{

          }
        })
      }
    }
  },
  created () {
    this.getToken()
    this.handleQueryProduct()
  }
}
</script>
