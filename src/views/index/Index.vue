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
    name: 'Index',
    data() {
      return {
        goodsList: [],
        shop: {
          title: '产品购买',
        }
      }
    },
    components: {
      EndingLine,
      ViewBox,
      GoodList
    },
    methods: {
      getToken() {
        const token = this.$cookie.get('token')
        // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjMsInQiOjE1NjI1NTM2ODc3NjR9.3I7m5kCSDvleBo1aSv68tWG3RpMRvNSOaAurfFDySU8'
        if (token) {
          window.sessionStorage.setItem('token', token)
        }
      },
      handleQueryProduct() {
        let token = window.sessionStorage.getItem('token')
        if (token) {
          queryProduct(token, data => {
            if (!data.errcode) {
              this.goodsList = data
            } else {
              this.$vux.alert.show({
                title: "提示",
                content: data.errmsg,
                buttonText: "知道了"
              })
            }
          })
        }
      }
    },
    created() {
      this.getToken()
      this.handleQueryProduct()
    }
  }
</script>
