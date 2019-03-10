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
            @click="toggerSpeciPopup(1)">
            加入购物车
          </div>
          <div
            class="buynow"
            @click="toggerSpeciPopup(2)">
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
                    :title="'数量'"
                    :value="1"
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
                v-show="btnType === 0">
                <div class="left">加入购物车</div>
                <div class="right">立即购买</div>
              </div>
              <div
                class="btn"
                v-show="btnType === 1">
                加入购物车
              </div>
              <router-link
                class="btn"
                @click.native="handleBuy"
                v-show="btnType === 2"
                :to="{
							name: 'goodPay'
						}">
                立即购买
              </router-link>
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
        headerNavTitle: 'GoodsDetail',
        btnType: '',
        show: false
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
    created() {

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
      toggerSpeciPopup(type) {
        switch(type){
          case 0:
            this.btnType = 0
            this.show = !this.show
            break;
          case 1:
            this.btnType = 1
            this.show = !this.show
            break;
          case 2:
            this.btnType = 2
            this.show = !this.show
            break
        }
      },
      goToCart() {
        this.$store.commit('bottomNav/set', 1);
        this.$router.push('/cart');
      },
      handleBuy() {
        console.log(1111)
        this.show = false
      }
    }
  }
</script>
