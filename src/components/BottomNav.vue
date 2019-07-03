<template>
  <tabbar style="position: fixed" v-show="show">
    <tabbar-item
      v-for="item in bottomBar"
      :link="item.link"
      :key = "item.index"
      :selected="item.index == index"
      @on-item-click="activeItem(item.index)"
    >
			<span
        slot="icon"
        class="zui-icon"
        :class="item.iconCls">
			</span>
      <span
        slot="label">
				{{item.name}}
			</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'

  export default {
    name: 'BottomNav',
    components: {
      Tabbar,
      TabbarItem
    },
    data () {
      return {
        show: true,
        bottomBar: [
          {
            name: '产品购买',
            iconCls: 'zui-icon-INDEX_1',
            link: '/',
            index: 0,
          },
          {
            name: '购物车',
            iconCls: 'zui-icon-SHOPPING-CART-EMPTY',
            link: 'cart',
            index: 1,
          },
          {
            name: '个人中心',
            iconCls: 'zui-icon-MINE_1',
            link: 'mine',
            index: 2
          }
        ]
      }
    },
    computed: {
      index: function () {
        return this.$store.state.bottomNav.index
      }
    },
    methods: {
      activeItem (index) {
        this.$store.commit('bottomNav/set', index)
      }
    },
    watch:{
      $route(to, from){
        const toFullPath = to.path.split('/')
        const toIndex = toFullPath.length - 1
        const toPath = toFullPath[toIndex]
        if(toPath === 'mine') {
          this.$store.commit('bottomNav/set', 2)
        }
        if(toPath === 'cart') {
          this.$store.commit('bottomNav/set', 1)
        }
        if(toPath === '') {
          this.$store.commit('bottomNav/set', 0)
        }

        if(toPath === 'myQrcode'){
          this.show = false
        } else {
          this.show = true
        }
      }
    }
  }
</script>

<style>
  .weui-tabbar__icon {
    height: 24px;
    width: 24px;
  }

  .weui-tabbar__label {
    margin-top: 3px;
    margin-bottom: 3px;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .weui-tabbar__item {
    text-decoration: none;
    height: 55px;
  }

  .weui-tabbar__icon img {
    height: 24px;
    width: 24px;
  }
</style>
