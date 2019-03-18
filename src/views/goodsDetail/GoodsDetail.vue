<template>
  <div class="z-page">
    <div class="z-content">
      <header-nav :headerNavTitle="headerNavTitle"></header-nav>
      <view-box>
        <div class="good-detail-bottombar">
          <div class="cart">
            <span class="zui-icon zui-icon-SHOPPING-CART-EMPTY" @click="goToCart">

            </span>
          </div>
          <div
            class="addcart"
            @click="handleAddToCart(productDetail.id)">
            加入购物车
          </div>
          <div
            class="buynow"
            @click="toggerPopup">
            立即购买
          </div>
        </div>

        <swiper
          class="a"
          :aspect-ratio="1/1"
          dots-position="center">
          <swiper-item>
            <img :src="productDetail.imgUrl">
          </swiper-item>
        </swiper>

        <div class="good-detail-head">
          <div class="title z-ellipsis-2">{{productDetail.name}}</div>
          <div class="subtitle">
            <div class="params price">￥{{productDetail.price}}</div>
            <div class="params">库存{{productDetail.inventory}}件</div>
          </div>
        </div>

        <!-- <div class="good-detail-introduce">
          <div class="head">——— 详情 ———</div>
          <div class="content" v-html="productDetail.content"></div>
        </div> -->

        <!-- <div class="good-detail-comment">
          <div class="head">
            评价
            <span class="comment-num">({{productDetail.commentsLength}}人评价)</span>
            <router-link
              class="comment-all"
              :to="{
						  name: 'commentList'
					}">
              查看全部
            </router-link>
          </div>
          <comment-card
            :type="'part'"
            v-for="item in productDetail.commentsPart"
            :comment="item">
          </comment-card>
        </div> -->

        <popup
          v-model="show"
          @on-hide="log('hide')"
          @on-show="log('show')"
          @on-first-show="resetScroller">
          <div class="good-params-popup-wrap">
            <!-- <div class="head">
              <div class="img">
                <img src="/static/img/good-default.jpg" alt="">
              </div>
              <div class="title">
                <span class="price">￥{{productDetail.price}}</span>
                <span class="inventory">(库存{{productDetail.maxInventory}}件)</span>
              </div>
            </div> -->
            <scroller
              height="260px"
              lock-x
              ref="scroller">
              <div class="body">
                <div class="param-item">
                  <x-number
                    class="add-num"
                    :title="'购买数量'"
                    :value="num"
                    :min="1"
                    :step="1"
                    width="30px">
                  </x-number>
                </div>
              </div>
            </scroller>
            <div class="foot">
              <div
                class="btn"
                v-show="show">
                <div class="btn" @click="handleBuy">确定</div>
              </div>
            </div>
          </div>
        </popup>
      </view-box>
    </div>
  </div>
</template>
<script>
  import './goodsDetail.less'
  // import CommentCard from '../../components/commentCard.vue'
  import {Swiper,SwiperItem,Popup,Scroller,Toast,XNumber, ViewBox} from 'vux'
  import HeaderNav from '../../components/HeaderNav'
  import {addToCart} from '../../api'
  export default {
    components: {
      Popup,
      Scroller,
      Toast,
      Swiper,
      SwiperItem,
      // CommentCard,
      XNumber,
      ViewBox,
      HeaderNav
    },
    data() {
      return {
        headerNavTitle: '',
        btnType: '',
        show: false,
        num: 1
      }
    },
    computed: {
      scrollerHeight() {
        return 'cale(100%-130px)'
      },
      productDetail () {
        return this.$store.state.goodDetail.detail
      }
    },
    methods: {
      resetScroller() {
        this.$nextTick(() => {
          this.$refs.scroller.reset()
        })
      },
      log(str) {
        console.log(str)
      },
      toggerPopup() {
            this.show = !this.show
      },
      goToCart() {
        this.$store.commit('bottomNav/set', 1);
        this.$router.push('/cart');
      },
      handleAddToCart (productId) {
        console.log('add')
        let that = this
        let token = window.sessionStorage.getItem("token")
        if (token !=null) {
         addToCart(token, productId, data => {
           if (!data.errcode) {
              that.$vux.toast.show({
                type: "success",
                text: "添加成功",
                isShowMask: true
              })
           } else {
             that.$vux.alert.show({
                title: "提示",
                content: data.errmsg,
                buttonText: "知道了"
              })
           }
         }) 

        }
      },
      handleBuy() {
        console.log('handleBuy')
        this.$router.push('/cart/confirmOrder')
        this.show = false
      }
    }
  }
</script>
