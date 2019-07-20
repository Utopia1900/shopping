<template>
  <div class="catresult-catbar-wrap">
    <span @click="handleGoBack" class="catresult-catbar-back zui-icon zui-icon-back">
    </span>
    <div class="catresult-catbar-wrap-title">{{headerNavTitle}}</div>
  </div>
</template>

<script>
  export default {
    name: 'HeadNav',
    props:['headerNavTitle'],
    methods:{
      handleGoBack() {
        this.$emit('on-back')
      }
    }
  }
</script>

<style scoped>
  .catresult-catbar-wrap{
    background-color: #ed7a5d;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /* border-bottom: 1px solid #efeff4; */
    z-index: 98;
    color: #fff
  }
  .catresult-catbar-back{
    float: left;
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    padding-left: 4px;
    padding-right: 4px;
    z-index: 99;
    /* background-color: #fff; */
  }
  .catresult-catbar-item{
    background: #fff;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
    border-bottom: 2px solid #fff;
  }
  .catresult-catbar-item.catbar-item-active{
    color: #ed7a5d;
    border-bottom: 2px solid #ed7a5d;
  }
  .catresult-result-wrap{
    margin-top: 42px;
  }

  .catresult-catbar-wrap-title {
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
</style>
