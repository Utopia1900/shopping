<template>
  <div>
    <div v-if="type === 'INGOODS'" class="good-list-wrap">
      <good-grid :data="data"></good-grid>
    </div>
    <div v-else-if="type === 'INCONFIRM'" class="good-list-wrap">
      <img class="good-list-img" :src="data.headImgUrl" alt="">
      <div class="good-list-info">
        <div class="title z-ellipsis-2">
          {{data.title}}
        </div>
        <div class="subInfo z-ellipsis-2">
				<span
          class="param"
          v-for="(item, index) in data.subInfo"
          :key = "index"
          >
					{{item}}
				</span>
        </div>
        <div class="price">
          ￥{{data.price}}
          <span
            class="num"
            v-if="data.num">
					x{{data.num}}
				</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import GoodGrid from '../components/GoodGrid.vue'
  export default {
    props: ['type', 'data'],
    components: {GoodGrid}
  }
</script>
<style>
  .good-list-wrap{
    overflow: hidden;
    padding: 8px;
    border-bottom: 1px solid #f8f8f8;
    background: #ffffff;
    margin-top: 45px;
  }
  .good-list-wrap:last-child{
    border-bottom: none;
  }
  .good-list-wrap .good-list-img{
    display: block;
    float: left;
    height: 100px;
    width: 100px;
  }
  .good-list-wrap .good-list-info{
    overflow: hidden;
    padding-left: 8px;
  }
  .good-list-wrap .good-list-info .title{
    font-size: 16px;
    line-height: 1.2;
    color: #404040;
    margin-bottom: 8px;
  }
  .good-list-wrap .good-list-info .subInfo{
    font-size: 12px;
    line-height: 1.3;
    color: #868686;
    margin-bottom: 4px;
  }
  .good-list-wrap .good-list-info .subInfo .param{
    padding-right: 4px;
  }
  .good-list-wrap .good-list-info .price{
    font-size: 16px;
    line-height: 1.3;
    color: #404040;
  }
  .good-list-wrap .good-list-info .price .num{
    float: right;
    font-size: 12px;
    color: #868686;
    line-height: 1.6;
  }
</style>
