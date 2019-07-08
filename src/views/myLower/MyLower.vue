<template>
  <div>
    <header-nav :headerNavTitle="headerNavTitle" @on-back="goBack"/>
    <div>
      <empty-view
        v-if="lowerList.length === 0"
        :iconCls="'zui-icon-IMGCARD'"
        :text="'暂无下级！'">
      </empty-view>
      <div v-else>

      </div>
    </div>
  </div>
</template>

<script>
  import HeaderNav from '../../components/HeaderNav'
  import EmptyView from '../../components/EmptyView'
  import {queryLower} from '../../api'

  export default {
    name: "MyLower",
    data() {
      return {
        headerNavTitle: '我的推广',
        lowerList: []
      }
    },
    components: {
      HeaderNav,
      EmptyView
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      getMyLower(page) {
        const token = window.sessionStorage.getItem('token')
        if (token) {
          queryLower(token, page, data => {
            if (!data.errcode) {
              this.lowerList = data
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
    created(){
      this.getMyLower(1)
    }
  }
</script>

<style scoped>

</style>
