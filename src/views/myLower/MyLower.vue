<template>
  <div>
    <header-nav :headerNavTitle="headerNavTitle" @on-back="goBack"/>
  </div>
</template>

<script>
  import HeaderNav from '../../components/HeaderNav'
  export default {
    name: "MyLower",
    data(){
      return {
        headerNavTitle: '我的推广'
      }
    },
    components: {
      HeaderNav
    },
    methods: {
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
