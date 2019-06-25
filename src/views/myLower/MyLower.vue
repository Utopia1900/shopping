<template>
  <div>
    <header-nav :headerNavTitle="headerNavTitle" @on-back="goBack"/>
    <select-stars ref="select1"></select-stars>
    <select-stars></select-stars>
    <select-stars></select-stars>
    <select-stars></select-stars>
    <button @click="getSelectValue">click</button>
  </div>
</template>

<script>
  import HeaderNav from '../../components/HeaderNav'
  import SelectStars from '../../components/SelectStar'
  export default {
    name: "MyLower",
    data() {
      return {
        headerNavTitle: '我的推广'
      }
    },
    components: {
      HeaderNav,
      SelectStars
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      getSelectValue(){
        console.log(this.$refs.select1.currentIndex + 1);
      }
    }
  }
</script>

<style scoped>

</style>
